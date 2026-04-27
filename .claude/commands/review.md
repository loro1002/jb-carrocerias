# /review — Revisar código antes de commitar

Leia os arquivos modificados e faça uma revisão completa verificando:

## Arquitetura
1. Page tem lógica de negócio? (não deveria — só composição)
2. Chamada de API direta no componente em vez de usar custom hook?
3. Estado de servidor em `useState` em vez de TanStack Query?
4. Lógica complexa no componente em vez de custom hook?

## TypeScript
5. Tem `any`? (usar `unknown` + type guard)
6. Tipo de props com `interface` explícita?
7. Tipo de formulário derivado de `z.infer<>` ou definido manualmente?
8. ID de entidade tratado como `string` (correto — ULID)?

## React
9. Componente com mais de ~150 linhas? (considerar extrair)
10. `export default` em componente? (deve ser named export)
11. `memo()` sem motivo de performance medido?
12. `useEffect` sendo usado para buscar dados? (usar TanStack Query)

## Segurança / Auth
13. Token sendo adicionado manualmente em algum lugar além do interceptor?
14. Role do usuário checada no componente sem usar `AdminRoute`?
15. Dado sensível sendo logado no console?

## Qualidade
16. `console.log` esquecido?
17. Erro sendo acessado direto como `error.message` em vez de `getErrorMessage(error)`?
18. Notificação de sucesso/erro faltando após operação?
19. Loading state sendo tratado?

## Relatório
Para cada problema:
- **Arquivo**: caminho completo
- **Linha**: número
- **Problema**: descrição
- **Fix**: o que fazer
