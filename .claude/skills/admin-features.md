# Skill: Admin Features

## Quando usar
Implementar qualquer funcionalidade do painel admin: gerenciar produtos, pedidos, usuários, categorias.

---

## Regras de Acesso

- Role `99` = admin — único com acesso ao painel
- Role `10` = cliente — redirecionar para `/` se tentar acessar `/admin/*`
- Admin **não pode alterar a própria role** (`PUT /users/:id/role`)
- Admin **não pode desativar a si mesmo**

---

## Upload de Imagens de Produto

Este é o fluxo mais crítico do admin. Deve ser feito em duas etapas:

```ts
// features/admin/hooks/useProductImageUpload.ts
import { useState } from 'react'
import { productApi } from '@/features/product/api/productApi'
import { toast } from 'sonner'

interface UploadedImage {
  url: string
  publicId: string
  isPrimary: boolean
}

export function useProductImageUpload(initialImages: UploadedImage[] = []) {
  const [images, setImages] = useState<UploadedImage[]>(initialImages)
  const [isUploading, setIsUploading] = useState(false)

  const upload = async (file: File) => {
    // Validação no cliente antes de enviar
    const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!ALLOWED.includes(file.type)) {
      toast.error('Formato inválido. Use JPG, PNG ou WebP.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Arquivo muito grande. Máximo 5 MB.')
      return
    }

    setIsUploading(true)
    try {
      const uploaded = await productApi.uploadImage(file)
      setImages(prev => [
        ...prev,
        { ...uploaded, isPrimary: prev.length === 0 },
      ])
    } catch {
      toast.error('Erro ao enviar imagem.')
    } finally {
      setIsUploading(false)
    }
  }

  const remove = async (publicId: string) => {
    try {
      await productApi.deleteImage(publicId)
      setImages(prev => {
        const filtered = prev.filter(img => img.publicId !== publicId)
        // Se a primária foi removida, marcar a próxima como primária
        if (filtered.length > 0 && !filtered.some(img => img.isPrimary)) {
          filtered[0]!.isPrimary = true
        }
        return filtered
      })
    } catch {
      toast.error('Erro ao remover imagem.')
    }
  }

  const setPrimary = (publicId: string) => {
    setImages(prev =>
      prev.map(img => ({ ...img, isPrimary: img.publicId === publicId }))
    )
  }

  return { images, upload, remove, setPrimary, isUploading }
}
```

> **Importante**: se o admin cancelar o formulário sem salvar o produto,
> chame `remove()` para cada imagem já enviada. Evita imagens orfãs no Cloudinary.

---

## Gerenciar Status de Pedido

```ts
// features/admin/hooks/useUpdateOrderStatus.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderApi } from '@/features/order/api/orderApi'
import { toast } from 'sonner'

const STATUS_FLOW: Record<OrderStatus, OrderStatus[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['preparing', 'cancelled'],
  preparing: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: [],
}

export function useUpdateOrderStatus(orderId: string) {
  const qc = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: ({ status, trackingCode }: { status: OrderStatus; trackingCode?: string }) =>
      orderApi.updateStatus(orderId, status, trackingCode),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] })
      toast.success('Status atualizado! E-mail enviado ao cliente.')
    },
    onError: () => toast.error('Erro ao atualizar status.'),
  })

  const canTransitionTo = (current: OrderStatus) => STATUS_FLOW[current] ?? []

  return { updateStatus: mutate, isPending, canTransitionTo }
}
```

> O backend envia e-mail automático quando o status muda para `shipped`, `delivered` ou `cancelled`.
> O e-mail só é enviado se o status **realmente mudou** — atualizar só `trackingCode` não dispara.

---

## Gerenciar Usuários (Admin)

```ts
// features/admin/api/adminUserApi.ts
export const adminUserApi = {
  getAll: () =>
    api.get<ApiResponse<{ users: User[] }>>('/users').then(r => r.data.data.users),

  updateRole: (userId: string, role: UserRole) =>
    api.put(`/users/${userId}/role`, { role }).then(r => r.data),

  deactivate: (userId: string) =>
    api.delete(`/users/${userId}`).then(r => r.data),
}

// features/admin/hooks/useAdminUsers.ts
export function useAdminUsers() {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: adminUserApi.getAll,
  })
}

export function useUpdateUserRole() {
  const qc = useQueryClient()
  const currentUser = useUser()

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: UserRole }) => {
      // Guard: admin não pode alterar própria role
      if (userId === currentUser?.id) throw new Error('Você não pode alterar sua própria role.')
      return adminUserApi.updateRole(userId, role)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'users'] })
      toast.success('Role atualizada!')
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}
```

---

## Painel de Produtos (Admin)

Diferença do endpoint admin vs público:
- `GET /product/admin` aceita `status=active|inactive` — mostra produtos inativos
- Mesmo filtros de ordenação e busca

```ts
export function useAdminProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['admin', 'products', filters],
    queryFn: () => productApi.getAllAdmin(filters),
    placeholderData: keepPreviousData,
  })
}
```

---

## Painel de Categorias (Admin)

```ts
export const categoryApi = {
  // Público
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get('/category', { params }).then(r => r.data.data),

  // Admin — inclui inativas
  getAllAdmin: (params?: { status?: 'active' | 'inactive'; search?: string }) =>
    api.get('/category/admin', { params }).then(r => r.data.data),

  create: (dto: { name: string; description?: string }) =>
    api.post('/category', dto).then(r => r.data.data),

  update: (id: string, dto: { name?: string; description?: string }) =>
    api.put(`/category/${id}`, dto).then(r => r.data.data),

  remove: (id: string) =>
    api.delete(`/category/${id}`),
}
```

---

## Reviews — Moderação

Admin pode deletar qualquer review. Cliente só a própria.

```ts
export function useDeleteReview(reviewId: string) {
  const qc = useQueryClient()
  const isAdmin = useIsAdmin()

  return useMutation({
    mutationFn: () => api.delete(`/review/${reviewId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reviews'] })
      toast.success(isAdmin ? 'Review removida!' : 'Sua review foi removida.')
    },
  })
}
```

---

## Checklist — Feature Admin

- [ ] Verificar role `99` antes de renderizar ações destrutivas
- [ ] Upload: limpar imagens no Cloudinary se cancelar formulário
- [ ] Status de pedido: mostrar só transições válidas (não deixar ir de `delivered` para `pending`)
- [ ] Admin não aparece na própria lista de "alterar role"
- [ ] Confirmar antes de desativar usuário (ação irreversível pela UI)
- [ ] Skeleton loading nas tabelas (evitar layout shift)
- [ ] Paginação nos endpoints que retornam listas grandes
