# PetCare API - Estrutura Inicial

Estrutura inicial de uma API REST construída com JavaScript e Express, com autenticação JWT, conexão com MongoDB e documentação Swagger.

## Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Swagger UI

## Arquitetura de pastas

```text
src/
  app.js
  server.js
  config/
    database.js
  controllers/
    authController.js
    healthController.js
  docs/
    swagger.yaml
  middleware/
    authMiddleware.js
  models/
    User.js
  routes/
    authRoutes.js
    healthRoutes.js
    index.js
  services/
    authService.js
```

## Pré-requisitos

- Node.js 18+
- MongoDB (local ou remoto)

## Configuração

1. Instale as dependências:

```bash
npm install
```

1. Crie seu arquivo de ambiente:

```bash
cp .env.example .env
```

1. Atualize as variáveis de ambiente no `.env`:

- `PORT`
- `BASE_URL`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

## Scripts

- `npm start`: inicia a API de forma estática.
- `npm run dev`: inicia a API com reinício automático ao alterar arquivos.

## Endpoints iniciais

- `GET /` - status básico da API.
- `GET /api/health` - health check.
- `POST /api/register` - cadastro de usuário.
- `POST /api/auth/login` - autenticação e geração de JWT.
- `GET /api/protected` - rota protegida por JWT.
- `GET /api-docs` - documentação Swagger.

## Exemplo de autorização

Para rotas protegidas, envie o header:

```text
Authorization: Bearer <seu_token_jwt>
```

## Próximos passos recomendados

- Adicionar testes automatizados (unitários e integração).
- Configurar pipeline de CI com GitHub Actions.
- Ajustar estratégia de deploy para Vercel.

