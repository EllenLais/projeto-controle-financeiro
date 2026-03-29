# FinanceTracker

Aplicacao web moderna para controle financeiro pessoal com React, Vite, Firebase Auth, Firestore e Chart.js.

## Stack

- React + Vite
- Firebase Auth
- Cloud Firestore
- Chart.js
- Deploy na Vercel

## Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Copie `.env.example` para `.env` e preencha com as credenciais do seu projeto Firebase.

3. Inicie o projeto:

```bash
npm run dev
```

## Estrutura

- `src/components`: componentes visuais reutilizaveis
- `src/contexts`: estado global de autenticacao e tema
- `src/hooks`: hooks customizados
- `src/lib`: configuracoes externas
- `src/pages`: paginas da aplicacao
- `src/services`: acesso ao Firestore
- `src/utils`: formatacao e regras de negocio

## Firebase

- Ative Email/Password em Authentication
- Crie a colecao `transactions` no Firestore
- Publique as regras de `firestore.rules`

## Deploy

O arquivo `vercel.json` ja trata o fallback de rotas do React Router para deploy na Vercel.
