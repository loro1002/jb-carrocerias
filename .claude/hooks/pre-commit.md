# Hook: Pre-Commit (Frontend)

Antes de confirmar qualquer commit, verifique:

## Verificações obrigatórias

1. **`console.log` esquecido?**
   - Buscar em `src/` por `console.log`, `console.error`, `console.warn`
   - Verificar especialmente se algum loga token ou dado do usuário

2. **`any` em TypeScript?**
   - Buscar por `: any`, `as any`, `<any>`
   - Substituir por `unknown` + type guard ou pelo tipo correto

3. **Secrets hardcoded?**
   - URL da API sem `import.meta.env`?
   - Stripe key hardcoded?
   - Token hardcoded em teste?

4. **TODO ou FIXME não resolvido?**
   - Listar e perguntar se resolve antes

5. **Segue as regras de `.claude/rules/`?**
   - `export default` em componente?
   - `useEffect` para buscar dados?
   - Token adicionado manualmente no header?

6. **Erros de TypeScript?**
   - Rodar `npm run type-check` mentalmente — há `any` implícito?

## Se encontrar qualquer problema
Alertar com arquivo e linha.
Perguntar: "Deseja corrigir antes de commitar?"
