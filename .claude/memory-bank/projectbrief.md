# Project Brief — NexuzStore (Frontend)

## O que é
Frontend React + TypeScript do e-commerce NexuzStore (loja de perfumes).
Backend já em produção: https://nexuzsestore-production.up.railway.app/api

## Stack
React 18 + TypeScript strict + Vite + Tailwind CSS v4
Zustand (estado global) + TanStack Query v5 (estado servidor) + React Hook Form + Zod

## URLs
```
Produção : https://nexuzsestore-production.up.railway.app/api
Local    : http://localhost:8080/api
```

## Roles
| Role | Valor | Acesso |
|---|---|---|
| Customer | 10 | Área pública + área do cliente |
| Admin | 99 | Tudo + `/admin/*` |

## Autenticação — CRÍTICO
Token sem prefixo Bearer:
```
Authorization: <accessToken>  ← sem "Bearer "
```
O Axios interceptor em `shared/api/client.ts` injeta isso automaticamente.
**Nunca adicionar o header manualmente.**

## Status atual
Projeto em desenvolvimento. Backend 100% concluído.

## Features implementadas
_(atualize conforme avança)_

## Pendentes
_(atualize conforme avança)_
