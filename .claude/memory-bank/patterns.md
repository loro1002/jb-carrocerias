# Padrões e Convenções — NexuzStore Frontend

## TypeScript
- `strict: true` — sem `any`, usar `unknown` + type guards
- Interfaces com nome explícito para props: `interface ProductCardProps { ... }`
- Tipos de domínio derivados de `entities/` — não redefinir inline
- `z.infer<typeof schema>` para tipos de formulário — nunca duplicar

## Nomenclatura
| Tipo | Convenção | Exemplo |
|---|---|---|
| Componentes | PascalCase | `ProductCard.tsx` |
| Hooks | camelCase com `use` | `useProducts.ts` |
| Stores Zustand | camelCase | `authStore.ts` |
| API modules | camelCase | `productApi.ts` |
| Utilitários | camelCase | `formatPrice.ts` |
| Tipos/Interfaces | PascalCase | `Product`, `ApiResponse<T>` |
| Constantes | SCREAMING_SNAKE | `MAX_UPLOAD_SIZE` |
| Rotas (string) | kebab-case | `/reset-password` |

## Componentes React
- Sempre funcionais — sem class components
- Named exports — nunca `export default` em componentes
- Props com `interface` explícita — nunca `React.FC<{ prop: type }>`
- Máximo ~150 linhas — extrair se ultrapassar
- `memo()` apenas com evidência de problema de performance medido

## Estado
- **Zustand** → estado global (auth, carrinho)
- **TanStack Query** → estado de servidor (dados da API)
- **`useState`** → UI ephemera (modal aberto, tab ativa, loading local)
- Evitar prop drilling acima de 2 níveis — usar store ou context

## Formulários
- React Hook Form + Zod **sempre**
- Schema Zod na mesma feature, nunca inline no componente
- `register`, `handleSubmit`, `formState.errors` — nunca controlar manualmente

## Chamadas de API (featureApi.ts)
```ts
// src/features/product/productApi.ts
import { api } from '@/shared/api/client';
import type { Product } from '@/entities/product';
import type { ApiResponse } from '@/shared/types/api';

export async function getProducts(params?: ProductFilters): Promise<ApiResponse<{ products: Product[] }>> {
  const { data } = await api.get('/product', { params });
  return data;
}
```

## Hooks com TanStack Query
```ts
// src/features/product/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { getProducts } from './productApi';

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  });
}
```

## Tratamento de erro
- Usar `getErrorMessage(error)` de `shared/lib` — nunca acessar `error.message` diretamente
- Notificações com `sonner` (`toast.error`, `toast.success`)
- Nunca exibir stack trace para o usuário

## IDs do backend
- Formato ULID (26 chars), não UUID
- Nunca gerar no frontend — sempre vem do backend

## Paginação
Query params: `page`, `limit`
Resposta: `data.pagination.{ page, limit, total, pages }`
Hook `usePagination` disponível em `shared/hooks/`

## Upload de imagens (Admin)
Fluxo desacoplado:
1. `POST /upload/image` → recebe `{ url, publicId }`
2. Guardar no estado local
3. Ao salvar produto → passar `images: [{ url, publicId, isPrimary }]`
4. Se cancelar antes de salvar → `DELETE /upload/image?publicId=...`

## CEP
- `GET /cep/:cep` no onBlur do campo CEP
- Preencher `street`, `neighborhood`, `city`, `state`
- Deixar `number` e `complement` para o usuário
- Hook `useCep` disponível em `shared/hooks/`
