# Skill: Testing

## Quando usar
Criar ou revisar qualquer teste: unitário de componente, hook, utilitário, ou integração.

---

## Setup

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: ['node_modules/', 'src/tests/', '**/*.d.ts', '**/*.config.*', 'src/app/router/'],
      thresholds: { lines: 80, functions: 80, branches: 75 },
    },
  },
  resolve: { alias: { '@': resolve(__dirname, './src') } },
})

// src/tests/setup.ts
import '@testing-library/jest-dom'
import { server } from './mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

## MSW — Mock da API

```ts
// src/tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

const BASE = 'http://localhost:8080/api'

export const handlers = [
  // Auth
  http.post(`${BASE}/login`, async ({ request }) => {
    const { email } = await request.json() as { email: string; password: string }
    if (email === 'test@nexuz.com') {
      return HttpResponse.json({
        success: true, message: 'Login realizado',
        data: { userId: '01HX', accessToken: 'mock-access', refreshToken: 'mock-refresh' },
      })
    }
    return HttpResponse.json(
      { success: false, message: 'Credenciais inválidas' },
      { status: 401 }
    )
  }),

  // Produtos
  http.get(`${BASE}/product`, () =>
    HttpResponse.json({
      data: {
        products: mockProducts,
        pagination: { page: 1, limit: 20, total: 2, pages: 1 },
      },
    })
  ),

  http.get(`${BASE}/product/:id`, ({ params }) =>
    HttpResponse.json({
      data: mockProducts.find(p => p.id === params.id) ?? null,
    })
  ),

  // Perfil
  http.get(`${BASE}/me`, () =>
    HttpResponse.json({ data: mockUser, success: true, message: 'ok' })
  ),
]

// src/tests/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'
export const server = setupServer(...handlers)
```

---

## Fixtures

```ts
// src/tests/fixtures/product.ts
import type { Product } from '@/entities/product'

export const mockProduct: Product = {
  id: '01HXYZ',
  name: 'Tênis X',
  description: 'Descrição do tênis',
  brand: 'Nike',
  gender: 'unisex',
  price: 499.90,
  salePrice: 399.90,
  stock: 20,
  images: [{ url: 'https://example.com/img.jpg', publicId: 'abc', isPrimary: true }],
  categoryId: '01CAT',
  averageRating: 4.5,
  reviewCount: 10,
  active: true,
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
}

export const mockProducts = [mockProduct]
```

---

## Wrapper com Providers

```ts
// src/tests/utils/renderWithProviders.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { render, type RenderOptions } from '@testing-library/react'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity },
      mutations: { retry: false },
    },
  })
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: RenderOptions & { initialEntries?: string[] }
) {
  const { initialEntries = ['/'], ...rest } = options ?? {}
  const queryClient = createTestQueryClient()

  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          {children}
        </MemoryRouter>
      </QueryClientProvider>
    ),
    ...rest,
  })
}
```

---

## Testando Componentes

```ts
// features/product/components/ProductCard/ProductCard.test.tsx
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/utils/renderWithProviders'
import { ProductCard } from './ProductCard'
import { mockProduct } from '@/tests/fixtures/product'

describe('ProductCard', () => {
  it('exibe nome e preço promocional', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Tênis X')).toBeInTheDocument()
    expect(screen.getByText(/399/)).toBeInTheDocument()        // salePrice
    expect(screen.getByText(/499/)).toBeInTheDocument()        // price original riscado
  })

  it('chama onAddToWishlist com id correto', async () => {
    const onAddToWishlist = vi.fn()
    renderWithProviders(<ProductCard product={mockProduct} onAddToWishlist={onAddToWishlist} />)

    await userEvent.click(screen.getByRole('button', { name: /favoritar/i }))

    expect(onAddToWishlist).toHaveBeenCalledOnce()
    expect(onAddToWishlist).toHaveBeenCalledWith(mockProduct.id)
  })

  it('não exibe preço riscado quando não há salePrice', () => {
    const product = { ...mockProduct, salePrice: null }
    renderWithProviders(<ProductCard product={product} />)

    // Só um preço visível
    expect(screen.getAllByText(/499/).length).toBe(1)
  })
})
```

---

## Testando Hooks

```ts
// shared/hooks/useCep.test.ts
import { renderHook } from '@testing-library/react'
import { server } from '@/tests/mocks/server'
import { http, HttpResponse } from 'msw'
import { useCep } from './useCep'

const BASE = 'http://localhost:8080/api'

describe('useCep', () => {
  it('preenche endereço ao buscar CEP válido', async () => {
    server.use(
      http.get(`${BASE}/cep/01310100`, () =>
        HttpResponse.json({
          data: {
            cep: '01310-100',
            street: 'Avenida Paulista',
            neighborhood: 'Bela Vista',
            city: 'São Paulo',
            state: 'SP',
            country: 'Brasil',
          },
        })
      )
    )

    const onSuccess = vi.fn()
    const { result } = renderHook(() => useCep())

    await result.current.lookup('01310100', onSuccess)

    expect(onSuccess).toHaveBeenCalledWith(
      expect.objectContaining({ street: 'Avenida Paulista', city: 'São Paulo' })
    )
  })

  it('exibe toast de erro quando CEP não encontrado', async () => {
    server.use(
      http.get(`${BASE}/cep/00000000`, () =>
        HttpResponse.json({ success: false, message: 'CEP não encontrado' }, { status: 404 })
      )
    )

    const onSuccess = vi.fn()
    const { result } = renderHook(() => useCep())

    await result.current.lookup('00000000', onSuccess)

    expect(onSuccess).not.toHaveBeenCalled()
  })
})
```

---

## Testando Formulários

```ts
describe('LoginForm', () => {
  it('não submete com campos vazios', async () => {
    const onLogin = vi.fn()
    renderWithProviders(<LoginForm />)

    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))

    expect(onLogin).not.toHaveBeenCalled()
    expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument()
  })

  it('submete com dados válidos', async () => {
    renderWithProviders(<LoginForm />)

    await userEvent.type(screen.getByLabelText(/e-mail/i), 'test@nexuz.com')
    await userEvent.type(screen.getByLabelText(/senha/i), 'senha123')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))

    // Verificar que a mutation foi chamada — via MSW o servidor responde
    expect(await screen.findByText(/bem-vindo/i)).toBeInTheDocument()
  })
})
```

---

## O que NÃO Testar

- Implementação interna de hooks (testar comportamento externo)
- Estilos CSS (use Storybook ou snapshot com cautela)
- Código de terceiros (Axios, React Query, Zustand)
- Lógica trivial sem branch (getters simples)

---

## Comandos

```bash
npm run test              # watch mode
npm run test -- --run     # one shot (CI)
npm run test:coverage     # com relatório de cobertura
```
