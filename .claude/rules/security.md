# Regras de Segurança — NUNCA QUEBRAR

## Autenticação — CRÍTICO
- Token injetado **automaticamente** pelo interceptor em `shared/api/client.ts`
- **Nunca** adicionar o header `Authorization` manualmente em chamada de API
- Formato: `Authorization: <token>` — **SEM** prefixo `Bearer`
- Ao trocar senha ou resetar password → `clearAuth()` + redirect para `/login`
- Usuário desativado → qualquer 401 → `clearAuth()` + redirect para `/login`

## Refresh de token
Fluxo do interceptor quando recebe 401:
1. Chama `POST /refresh` com `refreshToken` do store
2. Se sucesso → `setAuth(...)` → retenta requisição original
3. Se falha → `clearAuth()` → redirect `/login`
**Nunca** implementar esse fluxo fora do interceptor Axios.

## Roles e proteção de rotas
- `ProtectedRoute` para rotas que exigem login
- `AdminRoute` para rotas que exigem `role === 99`
- **Nunca** checar role manualmente no componente para esconder rota inteira (usar `AdminRoute`)
- Esconder UI para não-admin (botões, menus) é OK checar `user.role === 99`

## Dados sensíveis
- **Nunca** logar `accessToken`, `refreshToken`, senha no console
- **Nunca** armazenar tokens em `localStorage` — usar apenas Zustand (memória)
- **Nunca** expor `refreshToken` em URL

## Upload de imagens
- Limite: 5 MB por arquivo
- Tipos aceitos: `jpg`, `jpeg`, `png`, `webp`
- Se o formulário for cancelado após upload → chamar `DELETE /upload/image?publicId=...`
- **Nunca** armazenar `publicId` em lugar visível para o usuário

## Stripe
- `VITE_STRIPE_PUBLIC_KEY` — nunca hardcoded, sempre via `import.meta.env`
- `clientSecret` — não exibir para o usuário, apenas passar para o Stripe.js
- Confirmar pagamento apenas via `stripe.confirmPayment()` — nunca manualmente

## Formulários
- Validação Zod antes de qualquer submit
- Campos de senha com `type="password"` sempre
- Nunca mostrar senha em campo de texto visível

## CORS e origens
- Axios configurado com `baseURL` via `import.meta.env.VITE_API_URL`
- **Nunca** hardcodar URL da API no código
