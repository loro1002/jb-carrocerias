# /new-feature — Criar nova feature completa

Crie uma nova feature para: $ARGUMENTS

## O que criar (nesta ordem)

### 1. Tipo de entidade (se for entidade nova)
`src/entities/<entidade>.ts`
```ts
export interface MinhaEntidade {
  id: string; // ULID
  // campos...
  createdAt: string;
  updatedAt: string;
}
```

### 2. Módulo de API
`src/features/<dominio>/<dominio>Api.ts`
- Funções que chamam a API via Axios (`api` de `shared/api/client`)
- Tipadas com retorno `Promise<ApiResponse<T>>` ou `Promise<PaginatedResponse<T>>`
- Sem lógica de estado, sem TanStack Query aqui

### 3. Custom Hook(s)
`src/features/<dominio>/use<Dominio>.ts`
- `useQuery` para GET
- `useMutation` para POST/PUT/DELETE
- `onSuccess` → invalidar cache e mostrar toast.success
- `onError` → `toast.error(getErrorMessage(error))`

### 4. Schema Zod (se tiver formulário)
`src/features/<dominio>/<dominio>Schema.ts`
```ts
import { z } from 'zod';
export const minhaEntidadeSchema = z.object({ ... });
export type MinhaEntidadeFormData = z.infer<typeof minhaEntidadeSchema>;
```

### 5. Componentes da feature
`src/features/<dominio>/components/<Componente>.tsx`
- Named export
- Interface de props explícita
- Lógica no hook, componente só renderiza

### 6. Página (se necessário)
`src/pages/<Pagina>.tsx`
- Só composição — importa feature, não tem lógica
- Registrar rota em `src/app/router/index.tsx`

## Regras obrigatórias
- Seguir `memory-bank/patterns.md`
- Seguir `rules/code-style.md`
- Nunca chamar API diretamente no componente
- Nunca usar `useState` para dados do servidor
- Verificar se a rota precisa de `ProtectedRoute` ou `AdminRoute`
