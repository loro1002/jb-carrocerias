# Padrão de Integração com a API — SEMPRE SEGUIR

## Tipos de resposta

```ts
// src/shared/types/api.ts

// Sucesso simples
interface ApiResponse<T> {
  statusCode: number;
  success: true;
  message: string;
  data: T;
}

// Sucesso paginado
interface PaginatedResponse<T> {
  statusCode: number;
  success: true;
  message: string;
  data: {
    [recurso: string]: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

// Erro
interface ApiError {
  success: false;
  message: string;
}
```

## Padrão de módulo de API
```ts
// src/features/produto/produtoApi.ts
import { api } from '@/shared/api/client';
import type { Product } from '@/entities/product';
import type { ApiResponse, PaginatedResponse } from '@/shared/types/api';

export async function getProducts(params?: ProductFilters) {
  const { data } = await api.get<PaginatedResponse<Product>>('/product', { params });
  return data;
}

export async function createProduct(body: CreateProductDto) {
  const { data } = await api.post<ApiResponse<Product>>('/product', body);
  return data;
}
```

## Padrão de mutation com feedback
```ts
const createProductMutation = useMutation({
  mutationFn: createProduct,
  onSuccess: (response) => {
    toast.success(response.message);
    queryClient.invalidateQueries({ queryKey: ['products'] });
  },
  onError: (error) => {
    toast.error(getErrorMessage(error));
  },
});
```

## Query keys padrão
```ts
['products']              // lista
['products', filters]     // lista com filtros
['product', id]           // item individual
['categories']
['orders']
['order', id]
['payments']
['reviews', productId]
['wishlist']
['me']                    // perfil do usuário logado
['addresses']
```

## IDs
- Formato ULID — string de 26 caracteres
- Nunca gerar no frontend — sempre vem do backend
- Usar como `string` em TypeScript — nunca `number`

## Autenticação
- Header injetado pelo interceptor: `Authorization: <accessToken>` (sem Bearer)
- Ao receber 401 → refresh automático via interceptor
- Nunca adicionar header manualmente
