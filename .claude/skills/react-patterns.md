# Skill: React Patterns

## Quando usar
Criar, refatorar ou revisar qualquer componente React do projeto.

---

## Anatomia Padrão de Componente

```ts
// features/product/components/ProductCard/ProductCard.tsx

import type { Product } from '@/entities/product'
import { formatPrice } from '@/shared/lib/formatPrice'

interface ProductCardProps {
  product: Product
  onAddToWishlist?: (id: string) => void
}

export function ProductCard({ product, onAddToWishlist }: ProductCardProps) {
  const displayPrice = product.salePrice ?? product.price

  return (
    <article className="...">
      <img src={product.images[0]?.url} alt={product.name} loading="lazy" />
      <h3>{product.name}</h3>
      <span>{formatPrice(displayPrice)}</span>
      {product.salePrice && (
        <span className="line-through">{formatPrice(product.price)}</span>
      )}
      {onAddToWishlist && (
        <button onClick={() => onAddToWishlist(product.id)}>♡</button>
      )}
    </article>
  )
}
```

**Regras:**
- Named export (nunca `export default` em componentes)
- Interface de props explícita — sem `any`
- Props opcionais com `?` e callback com `?.()` no uso
- `salePrice ?? price` — o backend pode retornar `salePrice` nulo

---

## Container + Presenter

Separe dados de apresentação. O container busca; o presenter renderiza.

```ts
// Container
export function ProductListContainer({ filters }: { filters: ProductFilters }) {
  const { data, isLoading, isError } = useProducts(filters)

  if (isLoading) return <ProductListSkeleton />
  if (isError) return <ErrorState />

  return <ProductList products={data?.products ?? []} pagination={data?.pagination} />
}

// Presenter — puro, testável, sem dependência de hooks de API
interface ProductListProps {
  products: Product[]
  pagination?: Pagination
}

export function ProductList({ products, pagination }: ProductListProps) {
  if (products.length === 0) return <EmptyState message="Nenhum produto encontrado" />

  return (
    <>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => <li key={p.id}><ProductCard product={p} /></li>)}
      </ul>
      {pagination && <Pagination {...pagination} />}
    </>
  )
}
```

---

## Custom Hook — Extraia Lógica

```ts
// features/product/hooks/useProductFilters.ts
export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: ProductFilters = {
    page: Number(searchParams.get('page') ?? 1),
    search: searchParams.get('search') ?? undefined,
    categoryId: searchParams.get('category') ?? undefined,
    gender: (searchParams.get('gender') as Gender) ?? undefined,
    sort: (searchParams.get('sort') as SortOption) ?? 'newest',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
  }

  const setFilter = (key: string, value: string | undefined) => {
    setSearchParams(prev => {
      if (value) prev.set(key, value)
      else prev.delete(key)
      prev.delete('page')  // volta para página 1 ao filtrar
      return prev
    })
  }

  return { filters, setFilter }
}
```

---

## Formulário com RHF + Zod

```ts
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const { mutate: login, isPending } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  return (
    <form onSubmit={handleSubmit((data) => login(data))}>
      <input {...register('email')} type="email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register('password')} type="password" />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
```

---

## Rotas Protegidas

```ts
// app/router/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/app/store/authStore'

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export function AdminRoute() {
  const user = useAuthStore(s => s.user)
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 99) return <Navigate to="/" replace />
  return <Outlet />
}
```

```ts
// app/router/router.tsx
const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },

  {
    element: <ProtectedRoute />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/products/:id', element: <ProductDetailPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/orders', element: <OrdersPage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },

  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'products', element: <AdminProductsPage /> },
      { path: 'orders', element: <AdminOrdersPage /> },
      { path: 'users', element: <AdminUsersPage /> },
    ],
  },

  { path: '/tracking/:code', element: <TrackingPage /> },
  { path: '*', element: <NotFoundPage /> },
])
```

---

## Hook: useCep

```ts
// shared/hooks/useCep.ts
import { useState } from 'react'
import { cepApi } from '@/shared/api/cepApi'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { toast } from 'sonner'

export function useCep() {
  const [isLoading, setIsLoading] = useState(false)

  const lookup = async (cep: string, onSuccess: (address: CepAddress) => void) => {
    const cleaned = cep.replace(/\D/g, '')
    if (cleaned.length !== 8) return

    setIsLoading(true)
    try {
      const address = await cepApi.lookup(cleaned)
      onSuccess(address)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  return { lookup, isLoading }
}

// Uso no formulário de endereço:
const { lookup, isLoading: cepLoading } = useCep()

<input
  {...register('zipCode')}
  onBlur={e => lookup(e.target.value, (addr) => {
    setValue('street', addr.street)
    setValue('neighborhood', addr.neighborhood)
    setValue('city', addr.city)
    setValue('state', addr.state)
  })}
/>
```

---

## Estados de Carregamento

Use esqueletos, não spinners genéricos:

```ts
// Consistência em toda a app
type AsyncUI<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty' }
  | { status: 'success'; data: T }

// Em componentes — não replicar lógica de loading:
function ProductPage() {
  const { data, isLoading, isError, error } = useProduct(id)

  if (isLoading) return <ProductDetailSkeleton />
  if (isError) return <ErrorState message={getErrorMessage(error)} />
  if (!data) return <NotFound />

  return <ProductDetail product={data} />
}
```

---

## Anti-Padrões — Evitar

```ts
// ❌ useEffect para derivar estado
useEffect(() => {
  setDisplayPrice(product.salePrice ?? product.price)
}, [product])

// ✅ Calcular direto
const displayPrice = product.salePrice ?? product.price

// ❌ Chamar API direto no componente
useEffect(() => {
  fetch('/api/products').then(...)
}, [])

// ✅ Sempre via React Query hook

// ❌ Prop drilling de user por 3+ componentes
<Layout user={user}><Header user={user}><Avatar user={user} /></Header></Layout>

// ✅ Zustand store
const user = useAuthStore(s => s.user)

// ❌ Token no header manualmente
axios.get('/api/me', { headers: { Authorization: `Bearer ${token}` } })

// ✅ O interceptor já injeta — e sem "Bearer" (padrão do backend)
api.get('/me')
```

---

## Checklist antes do PR

- [ ] Componente < 150 linhas?
- [ ] Sem `any` no TypeScript?
- [ ] Lógica de negócio em hook, não no JSX?
- [ ] Estados de loading/error/empty tratados?
- [ ] `salePrice ?? price` onde exibir preço?
- [ ] Token nunca adicionado manualmente (interceptor cuida)?
- [ ] Sem `console.log` esquecido?
- [ ] Acessibilidade básica: `alt`, `aria-label`, `role` onde necessário?
