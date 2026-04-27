# Skill: API Integration — NexuzStore

## Quando usar
Toda vez que for criar uma chamada ao backend: nova feature, novo endpoint, refatorar chamada existente.

---

## Tipos Base (`shared/types/api.ts`)

```ts
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface ApiError {
  success: false
  message: string
}

export interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export interface PaginatedResponse<T> {
  data: {
    [key: string]: T[]  // ex: products, categories, orders
    pagination: Pagination
  }
}

// IDs são ULID (26 chars) — nunca UUID
export type ULID = string
```

---

## Instância Axios (`shared/api/client.ts`)

```ts
import axios from 'axios'
import { useAuthStore } from '@/app/store/authStore'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // http://localhost:8080/api
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})

// Token sem "Bearer" — padrão do backend NexuzStore
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers.Authorization = token  // sem "Bearer "
  }
  return config
})

// 401 → tenta refresh, depois logout
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refreshToken = useAuthStore.getState().refreshToken
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/refresh`,
          { refreshToken }
        )
        useAuthStore.getState().setAccessToken(data.data.accessToken)
        original.headers.Authorization = data.data.accessToken
        return api(original)
      } catch {
        useAuthStore.getState().logout()
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)
```

---

## Módulos de API por Feature

### Auth (`features/auth/api/authApi.ts`)

```ts
import { api } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/types/api'

interface LoginDTO { email: string; password: string }
interface LoginData { userId: string; accessToken: string; refreshToken: string }
interface RefreshData { accessToken: string }

export const authApi = {
  login: (dto: LoginDTO) =>
    api.post<ApiResponse<LoginData>>('/login', dto).then(r => r.data.data),

  logout: () =>
    api.post('/logout'),

  refresh: (refreshToken: string) =>
    api.post<ApiResponse<RefreshData>>('/refresh', { refreshToken }).then(r => r.data.data),

  forgotPassword: (email: string) =>
    api.post('/forgot-password', { email }).then(r => r.data),

  resetPassword: (token: string, newPassword: string) =>
    api.post('/reset-password', { token, newPassword }).then(r => r.data),

  me: () =>
    api.get<ApiResponse<User>>('/me').then(r => r.data.data),
}
```

### Produtos (`features/product/api/productApi.ts`)

```ts
import { api } from '@/shared/api/client'

export interface ProductFilters {
  page?: number
  limit?: number
  categoryId?: string
  brand?: string
  gender?: 'female' | 'male' | 'unisex'
  search?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  sort?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating_desc'
  status?: 'active' | 'inactive'  // só admin
}

export const productApi = {
  getAll: (params?: ProductFilters) =>
    api.get('/product', { params }).then(r => r.data.data),

  getById: (id: string) =>
    api.get(`/product/${id}`).then(r => r.data.data),

  // Admin
  getAllAdmin: (params?: ProductFilters) =>
    api.get('/product/admin', { params }).then(r => r.data.data),

  create: (dto: CreateProductDTO) =>
    api.post('/product', dto).then(r => r.data.data),

  update: (id: string, dto: Partial<CreateProductDTO>) =>
    api.put(`/product/${id}`, dto).then(r => r.data.data),

  remove: (id: string) =>
    api.delete(`/product/${id}`),

  // Upload de imagem — multipart
  uploadImage: (file: File) => {
    const fd = new FormData()
    fd.append('image', file)
    return api.post<ApiResponse<{ url: string; publicId: string }>>(
      '/upload/image', fd,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    ).then(r => r.data.data)
  },

  deleteImage: (publicId: string) =>
    api.delete(`/upload/image?publicId=${encodeURIComponent(publicId)}`),
}
```

### Orders (`features/order/api/orderApi.ts`)

```ts
export const orderApi = {
  create: (dto: CreateOrderDTO) =>
    api.post('/order', dto).then(r => r.data.data),

  getMyOrders: () =>
    api.get('/order').then(r => r.data.data),

  getById: (id: string) =>
    api.get(`/order/${id}`).then(r => r.data.data),

  trackByCode: (code: string) =>
    api.get(`/order/tracking/${code}`).then(r => r.data.data),

  // Admin
  getAllAdmin: () =>
    api.get('/order/admin').then(r => r.data.data),

  updateStatus: (id: string, status: OrderStatus, trackingCode?: string) =>
    api.put(`/order/${id}`, { status, trackingCode }).then(r => r.data.data),
}
```

### CEP (`shared/api/cepApi.ts`)

```ts
export const cepApi = {
  lookup: (cep: string) =>
    api.get(`/cep/${cep.replace(/\D/g, '')}`).then(r => r.data.data),
}
```

---

## Hooks React Query

### Query

```ts
// features/product/api/useProducts.ts
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { productApi, type ProductFilters } from './productApi'

export const productKeys = {
  all: ['products'] as const,
  list: (filters: ProductFilters) => ['products', 'list', filters] as const,
  detail: (id: string) => ['products', 'detail', id] as const,
}

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productApi.getAll(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productApi.getById(id),
    enabled: Boolean(id),
  })
}
```

### Mutation

```ts
// features/product/api/useProductMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productApi } from './productApi'
import { productKeys } from './useProducts'
import { toast } from 'sonner'

export function useCreateProduct() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.all })
      toast.success('Produto criado!')
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}

export function useDeleteProduct() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: productApi.remove,
    onSuccess: (_, id) => {
      qc.removeQueries({ queryKey: productKeys.detail(id) })
      qc.invalidateQueries({ queryKey: productKeys.all })
      toast.success('Produto removido!')
    },
  })
}
```

---

## Tratamento de Erros

```ts
// shared/lib/getErrorMessage.ts
import axios from 'axios'

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    // Backend retorna { success: false, message: "..." }
    return error.response?.data?.message ?? error.message
  }
  if (error instanceof Error) return error.message
  return 'Erro inesperado. Tente novamente.'
}
```

---

## Rate Limits — Tratar no Frontend

| Endpoint | Limite | Resposta |
|---|---|---|
| `POST /login` | 5 falhas / 15 min por IP | `429` |
| `POST /forgot-password` | 3 chamadas / 1h por IP | `429` |
| `GET /cep/:cep` | 30 / min por IP | `429` |

Headers `RateLimit-*` e `RateLimit-Reset` vêm na resposta. Use para mostrar
mensagem tipo _"Tente novamente em X minutos"_.

```ts
// Tratar 429 no catch
if (axios.isAxiosError(error) && error.response?.status === 429) {
  const resetAt = error.response.headers['ratelimit-reset']
  toast.error(`Muitas tentativas. Tente novamente às ${formatTime(resetAt)}`)
  return
}
```

---

## Checkout Stripe

```ts
// features/payment/api/paymentApi.ts
export const paymentApi = {
  checkout: (orderId: string, method: PaymentMethod) =>
    api.post('/payment/checkout', { orderId, method }).then(r => r.data.data),
  // Retorna: { clientSecret: string, ... }
}

// features/payment/hooks/useCheckout.ts
export function useCheckout() {
  const stripe = useStripe()
  const elements = useElements()

  const { mutateAsync: createPayment, isPending } = useMutation({
    mutationFn: ({ orderId, method }: { orderId: string; method: PaymentMethod }) =>
      paymentApi.checkout(orderId, method),
  })

  const checkout = async (orderId: string) => {
    const { clientSecret } = await createPayment({ orderId, method: 'credit_card' })

    const result = await stripe!.confirmPayment({
      elements: elements!,
      clientSecret,
      confirmParams: { return_url: `${window.location.origin}/order/success` },
    })

    if (result.error) toast.error(result.error.message)
  }

  return { checkout, isPending }
}
```

---

## QueryClient Config (`app/providers/QueryProvider.tsx`)

```ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, error) => {
        if (axios.isAxiosError(error)) {
          const s = error.response?.status
          if (s && [401, 403, 404, 429].includes(s)) return false
        }
        return count < 2
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2,
    },
    mutations: { retry: false },
  },
})
```
