# Front Movies Cubos

Sistema de gerenciamento de filmes desenvolvido com React, TypeScript e Styled Components.

## 🚀 Configuração do Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configurações da API
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=10000

# Configurações de ambiente
VITE_APP_ENV=development
VITE_APP_NAME=Front Movies Cubos
```

### Variáveis para Produção

Para deploy em produção, configure:

```env
# Produção
VITE_API_BASE_URL=https://sua-api.com
VITE_API_TIMEOUT=15000
VITE_APP_ENV=production
VITE_APP_NAME=Front Movies Cubos
```

## 📦 Instalação

```bash
# Instalar dependências
yarn install

# Executar em desenvolvimento
yarn dev

# Build para produção
yarn build

# Preview do build
yarn preview
```

## 🌐 Deploy

### Vercel
1. Conecte seu repositório
2. Configure as variáveis de ambiente no painel da Vercel
3. Deploy automático

### Netlify
1. Conecte seu repositório
2. Configure as variáveis de ambiente no painel da Netlify
3. Deploy automático

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "preview"]
```

## 🔧 Configurações

- **Desenvolvimento**: Usa proxy para `localhost:3000`
- **Produção**: Usa URL da API configurada nas variáveis de ambiente
- **Validação**: Verifica variáveis obrigatórias na inicialização

## 📱 Funcionalidades

- ✅ Autenticação (Login/Registro)
- ✅ Listagem de filmes
- ✅ Busca e filtros
- ✅ Tema claro/escuro
- ✅ Responsividade
- ✅ Componentes reutilizáveis