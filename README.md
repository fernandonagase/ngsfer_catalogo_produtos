# 📦 Catálogo de Produtos

Sistema completo para gerenciamento de catálogo de produtos com arquitetura multi-tenant, desenvolvido com tecnologias modernas para alta performance e escalabilidade.

## 🚀 Tecnologias Utilizadas

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para APIs REST
- **Prisma ORM** - Object-Relational Mapping para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Docker Compose** - Containerização do banco de dados
- **Swagger** - Documentação automática da API
- **Jest** - Framework de testes

### Frontend

- **Vue.js 3** - Framework JavaScript progressivo
- **Quasar Framework** - Framework Vue.js com componentes Material Design
- **Quasar SSR** - Server-Side Rendering para melhor SEO e performance
- **Pinia** - Gerenciamento de estado para Vue.js
- **Vue Router** - Roteamento SPA
- **Axios** - Cliente HTTP para consumo de APIs
- **ESLint + Prettier** - Linting e formatação de código

### DevOps & Ferramentas

- **pnpm** - Gerenciador de pacotes performático
- **Nodemon** - Auto-reload para desenvolvimento
- **Docker** - Containerização

## 🏗️ Arquitetura do Projeto

O projeto é organizado em uma arquitetura **multi-aplicação** com separação clara de responsabilidades:

```
ngsfer-catalogo-produtos/
│
├── app_server/          # API Principal - Catálogo de Produtos
│   ├── src/
│   │   ├── controllers/  # Controladores da API
│   │   ├── models/      # Modelos de dados
│   │   ├── repositories/# Camada de acesso a dados
│   │   ├── services/    # Lógica de negócio
│   │   ├── routes/      # Rotas da API (v1, v2, v3)
│   │   └── resources/   # Transformadores de dados
│   ├── prisma/         # Schema e migrations do banco
│   └── compose.yaml    # Docker Compose para PostgreSQL
│
├── app_tenant_server/   # API de Tenants - Multi-tenancy
│   ├── src/
│   │   ├── models/     # Modelos de tenant
│   │   ├── repositories/
│   │   └── services/
│   └── prisma/         # Schema específico de tenants
│
└── app_ui/             # Interface de Usuário (Quasar SSR)
    ├── src/
    │   ├── components/ # Componentes Vue reutilizáveis
    │   ├── layouts/    # Layouts das páginas
    │   ├── pages/      # Páginas da aplicação
    │   ├── stores/     # Gerenciamento de estado (Pinia)
    │   └── router/     # Configuração de rotas
    ├── src-ssr/        # Configurações do Server-Side Rendering
    │   ├── middlewares/# Middlewares SSR (tenant detection)
    │   └── server.js   # Servidor SSR
    └── public/         # Assets estáticos
```

## ⚡ Como Executar

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **pnpm** (gerenciador de pacotes)
- **Docker** e **Docker Compose**
- **PostgreSQL** (ou usar via Docker)
- **Configuração de DNS local** (para subdomínios de desenvolvimento)

### Configuração de Subdomínios (Multi-tenant)

Este projeto usa **detecção automática de tenant baseada em subdomínios**. Cada tenant é identificado pelo subdomínio da URL.

**Exemplo:**

- `tenant1.localhost:9000` → Tenant "tenant1"
- `tenant2.localhost:9000` → Tenant "tenant2"
- `empresa.localhost:9000` → Tenant "empresa"

#### Para Desenvolvimento Local:

1. **Windows**: Edite `C:\Windows\System32\drivers\etc\hosts`
2. **Mac/Linux**: Edite `/etc/hosts`

Adicione as seguintes linhas:

```
127.0.0.1    tenant1.localhost
127.0.0.1    tenant2.localhost
127.0.0.1    empresa.localhost
```

### 1. Clonar o Repositório

```bash
git clone https://github.com/fernandonagase/ngsfer_catalogo_produtos.git
cd ngsfer-catalogo-produtos
```

### 2. Configurar Backend Principal (app_server)

```bash
cd app_server

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp env.example .env
# Edite o arquivo .env com suas configurações

# Subir o banco de dados PostgreSQL
docker-compose up -d

# Executar migrations do Prisma
pnpm prisma migrate deploy

# Gerar cliente Prisma
pnpm prisma generate

# Iniciar servidor de desenvolvimento
pnpm dev
```

O servidor estará rodando em: `http://localhost:3001`
Documentação da API: `http://localhost:3001/api/docs`

### 3. Configurar API de Tenants (app_tenant_server)

```bash
cd ../app_tenant_server

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp env.example .env

# Executar migrations
pnpm prisma migrate deploy

# Gerar cliente Prisma
pnpm prisma generate

# Iniciar servidor
pnpm dev
```

### 4. Configurar Frontend com SSR (app_ui)

```bash
cd ../app_ui

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente para SSR
# Crie um arquivo .env na raiz de app_ui
echo "TENANT_API_URL=http://localhost:3002" > .env

# Iniciar servidor de desenvolvimento (SSR)
pnpm run dev -m ssr

# Ou iniciar no modo SPA para desenvolvimento mais rápido
pnpm run dev
```

A aplicação estará disponível em: `http://localhost:9000` (SSR) ou `http://localhost:8080` (SPA)

## 🧪 Testes

### Backend

```bash
cd app_server
pnpm test
```

## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger UI:

- **Ambiente Local**: `http://localhost:3001/api/docs`

## 🚀 Deploy

### Backend

1. Configure as variáveis de ambiente de produção
2. Execute as migrations: `pnpm prisma migrate deploy`
3. Gere o cliente Prisma: `pnpm prisma generate`
4. Inicie a aplicação: `pnpm start`

### Frontend (SSR)

#### Opção 1: Deploy SSR (Recomendado)

```bash
cd app_ui

# Configurar variáveis de ambiente de produção
echo "TENANT_API_URL=https://api-tenants.seudominio.com" > .env.local.prod
echo "PORT=<porta>" >> .env.local.prod # Opcional

# Build para produção (SSR)
pnpm build -m ssr

# O build SSR gera uma aplicação Node.js completa
cd dist/ssr

# Instalar as dependências do servidor
pnpm install

# Execute o servidor SSR:
pnpm start # ou node index.mjs
```

O servidor SSR rodará na porta `3000` por padrão (configurável via `process.env.PORT`).

#### Opção 2: Deploy SPA (Alternativo)

```bash
cd app_ui

# Build SPA
quasar build -m spa

# Sirva os arquivos estáticos da pasta dist/spa/
# Usando um servidor web como nginx, apache ou serve
```
