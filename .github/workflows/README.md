# GitHub Actions Deploy

Este diretório contém o workflow de deploy automático para Firebase.

## Regras

- push na branch `dev`: build com `.env.development` e deploy no projeto `controle-financeiro-dev-cb216`
- push na branch `main`: build com `.env.production` e deploy no projeto `controle-financeiro-prod`

## Secrets necessários

- `DEV_VITE_FIREBASE_API_KEY`
- `DEV_VITE_FIREBASE_AUTH_DOMAIN`
- `DEV_VITE_FIREBASE_PROJECT_ID`
- `DEV_VITE_FIREBASE_STORAGE_BUCKET`
- `DEV_VITE_FIREBASE_MESSAGING_SENDER_ID`
- `DEV_VITE_FIREBASE_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT_DEV`
- `PROD_VITE_FIREBASE_API_KEY`
- `PROD_VITE_FIREBASE_AUTH_DOMAIN`
- `PROD_VITE_FIREBASE_PROJECT_ID`
- `PROD_VITE_FIREBASE_STORAGE_BUCKET`
- `PROD_VITE_FIREBASE_MESSAGING_SENDER_ID`
- `PROD_VITE_FIREBASE_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT_PROD`

## Service account

Use um JSON de service account com permissao para deploy no Firebase de cada ambiente.
