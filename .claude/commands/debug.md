# /debug — Analisar e resolver erro

Analise o seguinte erro e me ajude a resolver:

$ARGUMENTS

## Processo de investigação

1. **Identifique a camada** que está falhando:
   - Componente — prop errada, render condicional, evento
   - Hook — TanStack Query, Zustand, useEffect
   - API module — endpoint errado, params errados, tipo errado
   - Interceptor Axios — token não sendo injetado, refresh loop
   - Formulário — validação Zod, react-hook-form
   - Rota — ProtectedRoute/AdminRoute, redirect errado

2. **Leia o arquivo** relevante antes de sugerir qualquer coisa

3. **Explique a causa raiz** em 2-3 linhas

4. **Proponha e aplique o fix**

5. **Após corrigir**, adicione em `.claude/memory-bank/bugs.md`

## Dicas por erro comum

**401 Unauthorized** → Interceptor não está injetando token? `clearAuth()` chamado por engano? Refresh falhou?
**Token com "Bearer "** → Verificar `client.ts` — o backend não aceita prefixo Bearer
**Dados não atualizam após mutação** → Faltou `queryClient.invalidateQueries` no `onSuccess`
**Loop de redirect** → `ProtectedRoute` com condição errada? `AuthBootstrap` não terminou de carregar?
**Tipo TS "any" implícito** → Response da API não tipada em `featureApi.ts`
**Form não valida** → Schema Zod não conectado ao `resolver: zodResolver(schema)`
**Upload falha** → Campo do multipart deve ser `image` (definido no backend `uploadMiddleware`)
**Stripe não funciona** → `VITE_STRIPE_PUBLIC_KEY` definida no `.env`? `clientSecret` correto?
