# Hook: Post-Task (Frontend)

Ao finalizar qualquer tarefa, execute automaticamente:

## 1. Atualizar activeContext.md

Em `.claude/memory-bank/activeContext.md`:
- Registrar o que foi feito (1-3 linhas)
- Atualizar "Próximas tarefas" — remover concluído, adicionar novo pendente

## 2. Se resolveu um bug

Adicionar em `.claude/memory-bank/bugs.md`:
```
### [data de hoje] Título curto
**Problema:** o que acontecia
**Causa:** causa raiz
**Solução:** o que foi feito
**Arquivo(s):** caminho/arquivo.tsx
```

## 3. Se criou feature/módulo novo

Atualizar `.claude/memory-bank/architecture.md`:
- Adicionar na lista "Módulos de features existentes" se for módulo novo

## 4. Se criou rota nova na aplicação

Verificar se foi registrada em `src/app/router/index.tsx` com o wrapper correto (ProtectedRoute / AdminRoute).

## 5. Resumo final para o usuário
- O que foi criado/modificado
- Arquivos relevantes
- Próximos passos
