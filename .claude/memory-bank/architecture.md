# Arquitetura — NexuzStore Frontend

## Estrutura de pastas
```
src/
├── app/
│   ├── providers/        # QueryProvider, AuthBootstrap
│   ├── router/           # Rotas + ProtectedRoute + AdminRoute + PublicLayout
│   └── store/            # Stores Zustand (authStore.ts)
├── pages/                # Só composição — ZERO lógica de negócio
├── features/             # Lógica por domínio
│   ├── auth/             # login, logout, refresh, forgot/reset password
│   ├── user/             # perfil, troca de senha
│   ├── address/          # CRUD de endereços
│   ├── product/          # listagem, detalhe, filtros
│   ├── category/         # listagem + admin
│   ├── order/            # criação, listagem, rastreio
│   ├── payment/          # checkout Stripe, histórico
│   ├── review/           # avaliações de produto
│   ├── wishlist/         # favoritos
│   ├── upload/           # upload de imagens Cloudinary
│   └── admin/            # painéis admin
├── entities/             # Tipos TypeScript puros (User, Product, Order…)
├── shared/
│   ├── api/              # Instância Axios + interceptors (client.ts)
│   ├── components/       # Design system (Button, Input, Modal…)
│   ├── constants/        # ROUTES, STATUS_LABELS, SORT_OPTIONS
│   ├── hooks/            # useDebounce, usePagination, useCep
│   ├── lib/              # Helpers: formatPrice, formatDate, getErrorMessage
│   └── types/            # ApiResponse<T>, PaginatedResponse<T>
└── widgets/              # Header, Footer, CartDrawer, CookieConsent
```

## Responsabilidade de cada camada

**pages/** — APENAS:
- Composição de features e widgets
- Sem lógica, sem chamadas de API, sem estado

**features/[dominio]/** — contém:
- `[dominio]Api.ts` — funções que chamam a API (axios)
- `use[Dominio].ts` — custom hooks com TanStack Query
- Componentes específicos do domínio

**entities/** — APENAS:
- Interfaces TypeScript dos modelos de domínio
- Sem lógica

**shared/api/client.ts** — APENAS:
- Instância Axios configurada
- Interceptor de request: injeta token
- Interceptor de response: trata 401 (refresh flow)

## Fluxo de uma feature com dados
```
Page → Feature Component → useCustomHook (TanStack Query)
                               ↓
                           featureApi.ts (Axios)
                               ↓
                           Backend API
```

## Proteção de rotas
- `ProtectedRoute` → redireciona para `/login` se não autenticado
- `AdminRoute` → redireciona para `/` se role !== 99
- `PublicLayout` → layout para rotas públicas

## Estado Global (Zustand — authStore.ts)
```ts
{
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  setAuth: (user, accessToken, refreshToken) => void
  clearAuth: () => void
}
```

## Módulos de features existentes
`auth`, `user`, `address`, `product`, `category`, `order`, `payment`, `review`, `wishlist`, `upload`, `admin`
