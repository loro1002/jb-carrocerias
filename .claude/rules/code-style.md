# Regras de Código — SEMPRE SEGUIR

## TypeScript
- `strict: true` sempre — sem `any` (usar `unknown` + type guards)
- Nunca redefinir tipos que já existem em `entities/`
- Tipos de formulário derivados de `z.infer<typeof schema>` — nunca duplicar
- Retornos de função sempre tipados explicitamente nos módulos de API

## React
- Componentes sempre funcionais — sem class components
- **Named exports** — nunca `export default` em componentes (exceto pages quando o router exigir)
- Props com `interface` explícita, nunca inline
- Máximo ~150 linhas por componente — extrair se ultrapassar
- `memo()` apenas com evidência medida de problema de performance

## Hooks
- Lógica de negócio em custom hooks — componente só renderiza
- **Nunca** `useEffect` para buscar dados — usar TanStack Query
- **Nunca** `useState` para dados do servidor — usar TanStack Query
- Dependências do `useEffect` sempre completas (eslint-plugin-exhaustive-deps)

## Imports
- Alias `@/` para `src/` — usar em todos imports não-relativos
- Imports agrupados: externos → internos de `@/` → relativos

## Estado
- Zustand para estado global (auth, carrinho)
- TanStack Query para estado de servidor
- `useState` para UI ephemera (modal, tab, loading local)
- Sem prop drilling acima de 2 níveis

## Formulários
- React Hook Form + Zod **sempre**
- `resolver: zodResolver(schema)` obrigatório
- `formState.errors` para exibir erros — nunca validar manualmente

## Chamadas de API
- Sempre via funções em `featureApi.ts` — nunca direto no componente
- Sempre via hook TanStack Query — nunca direto no hook `useEffect`
- Parâmetros tipados com interfaces definidas em `entities/` ou `shared/types/`

## Nomenclatura
- camelCase: hooks, stores, api modules, utilitários
- PascalCase: componentes, interfaces, tipos, enums
- SCREAMING_SNAKE: constantes
- kebab-case: strings de rotas

## Qualidade
- Sem `console.log` em código commitado
- Errors sempre via `getErrorMessage(error)` de `shared/lib`
- Notificações com `sonner` (`toast.success`, `toast.error`)
- Loading e error states sempre tratados nos componentes
