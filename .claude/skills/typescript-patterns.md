# Skill: TypeScript Patterns

## Quando usar
Definir tipos de domínio, tipos de API, stores Zustand, ou qualquer situação onde TypeScript
precisa de atenção especial.

---

## Entidades de Domínio (`entities/`)

```ts
// entities/user/index.ts
export interface User {
  id: string           // ULID — 26 chars
  name: string
  email: string
  phone: string
  role: UserRole
  active: boolean
  createdAt: string    // ISO 8601
  updatedAt: string
}

export type UserRole = 10 | 99  // 10 = cliente, 99 = admin

// entities/product/index.ts
export interface Product {
  id: string
  name: string
  description: string
  brand: string
  gender: Gender
  price: number
  salePrice: number | null   // null quando não há promoção
  stock: number
  images: ProductImage[]
  categoryId: string
  averageRating: number      // denormalizado
  reviewCount: number        // denormalizado
  active: boolean
  createdAt: string
  updatedAt: string
}

export type Gender = 'female' | 'male' | 'unisex'

export interface ProductImage {
  url: string
  publicId: string
  isPrimary: boolean
}

// entities/order/index.ts
export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  shippingAddress: Address
  shippingCost: number
  discount: number
  subtotal: number
  total: number
  status: OrderStatus
  trackingCode: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface OrderItem {
  id: string
  productId: string
  product: Pick<Product, 'id' | 'name' | 'images' | 'brand'>
  quantity: number
  unitPrice: number
  total: number
}

// entities/address/index.ts
export interface Address {
  id?: string
  label?: AddressLabel
  street: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
}

export type AddressLabel = 'home' | 'work' | 'apartment' | 'other'

// entities/review/index.ts
export interface Review {
  id: string
  userId: string
  productId: string
  rating: 1 | 2 | 3 | 4 | 5
  title: string
  comment: string
  createdAt: string
}
```

---

## DTOs (Data Transfer Objects)

```ts
// features/auth/types.ts
export interface LoginDTO {
  email: string
  password: string
}

export interface RegisterDTO {
  name: string
  email: string
  password: string
  phone: string
}

// features/product/types.ts
export interface CreateProductDTO {
  categoryId: string
  name: string
  description: string
  brand: string
  gender: Gender
  price: number
  salePrice?: number
  stock: number
  images: Array<{ url: string; publicId: string; isPrimary: boolean }>
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

// features/order/types.ts
export interface CreateOrderDTO {
  shippingAddress: Omit<Address, 'id' | 'label'>
  items: Array<{ productId: string; quantity: number }>
  shippingCost: number
  discount?: number
  notes?: string
}

// features/review/types.ts
export interface CreateReviewDTO {
  rating: 1 | 2 | 3 | 4 | 5
  title: string
  comment: string
}
```

---

## Zustand Store — Auth

```ts
// app/store/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/entities/user'

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}

interface AuthActions {
  setSession: (user: User, accessToken: string, refreshToken: string) => void
  setAccessToken: (token: string) => void
  updateUser: (updates: Partial<User>) => void
  logout: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setSession: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken, isAuthenticated: true }),

      setAccessToken: (accessToken) => set({ accessToken }),

      updateUser: (updates) =>
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      logout: () =>
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),
    }),
    {
      name: 'nexuzstore-auth',
      // Não persistir dados sensíveis além do necessário
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Selectors (evita re-render desnecessário)
export const useUser = () => useAuthStore(s => s.user)
export const useIsAdmin = () => useAuthStore(s => s.user?.role === 99)
export const useIsAuthenticated = () => useAuthStore(s => s.isAuthenticated)
```

---

## Zustand Store — Cart

```ts
// features/cart/store/cartStore.ts
interface CartItem {
  productId: string
  name: string
  price: number          // usar salePrice ?? price
  imageUrl: string
  quantity: number
  stock: number
}

interface CartState {
  items: CartItem[]
}

interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clear: () => void
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set(state => {
        const existing = state.items.find(i => i.productId === item.productId)
        if (existing) {
          return {
            items: state.items.map(i =>
              i.productId === item.productId
                ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) }
                : i
            ),
          }
        }
        return { items: [...state.items, { ...item, quantity: 1 }] }
      }),

      removeItem: (productId) =>
        set(state => ({ items: state.items.filter(i => i.productId !== productId) })),

      updateQuantity: (productId, quantity) =>
        set(state => ({
          items: state.items.map(i =>
            i.productId === productId
              ? { ...i, quantity: Math.min(Math.max(1, quantity), i.stock) }
              : i
          ),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: 'nexuzstore-cart' }
  )
)

// Selectors derivados
export const useCartTotal = () =>
  useCartStore(s => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0))

export const useCartCount = () =>
  useCartStore(s => s.items.reduce((sum, i) => sum + i.quantity, 0))
```

---

## Type Guards

```ts
// shared/lib/typeGuards.ts
import axios from 'axios'

export function isAxios401(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 401
}

export function isAxios429(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 429
}

export function isOrderStatus(value: string): value is OrderStatus {
  return ['pending', 'paid', 'preparing', 'shipped', 'delivered', 'cancelled'].includes(value)
}
```

---

## Constantes Tipadas

```ts
// shared/constants/index.ts

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Aguardando pagamento',
  paid: 'Pago',
  preparing: 'Em preparação',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
}

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Mais recentes' },
  { value: 'price_asc', label: 'Menor preço' },
  { value: 'price_desc', label: 'Maior preço' },
  { value: 'rating_desc', label: 'Melhor avaliados' },
  { value: 'name_asc', label: 'A-Z' },
] as const

export const GENDER_LABEL: Record<Gender, string> = {
  female: 'Feminino',
  male: 'Masculino',
  unisex: 'Unissex',
}

export const ADDRESS_LABEL: Record<AddressLabel, string> = {
  home: 'Casa',
  work: 'Trabalho',
  apartment: 'Apartamento',
  other: 'Outro',
}

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  credit_card: 'Cartão de crédito',
  debit_card: 'Cartão de débito',
  pix: 'Pix',
  boleto: 'Boleto',
}

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  products: '/products',
  product: (id: string) => `/products/${id}`,
  cart: '/cart',
  checkout: '/checkout',
  orders: '/orders',
  order: (id: string) => `/orders/${id}`,
  tracking: (code: string) => `/tracking/${code}`,
  profile: '/profile',
  wishlist: '/wishlist',
  admin: {
    root: '/admin',
    products: '/admin/products',
    orders: '/admin/orders',
    users: '/admin/users',
  },
} as const
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
    "skipLibCheck": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```
