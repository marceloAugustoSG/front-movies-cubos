# Front Movies Cubos

Sistema completo de gerenciamento de filmes desenvolvido com React, TypeScript e Styled Components para o teste técnico da Cubos Academy.

## 🎯 **Visão Geral**

Este projeto implementa uma aplicação web completa para gerenciamento de filmes, atendendo aos requisitos do teste técnico com funcionalidades extras que demonstram conhecimento avançado em desenvolvimento frontend.

## 🚀 **Configuração do Ambiente**

### **Pré-requisitos**
- Node.js 18+ 
- Yarn ou npm
- Backend da API rodando em `localhost:3000`

### **Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações da API
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=10000

# Configurações de ambiente
VITE_APP_ENV=development
VITE_APP_NAME=Front Movies Cubos
```

### **Instalação e Execução**

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

## 📱 **Funcionalidades Implementadas**

### **✅ Requisitos Obrigatórios**
- **Página de Login**: Formulário com e-mail e senha
- **Página de Cadastro**: Formulário completo com validações
- **Página de Listagem**: Lista todos os filmes com paginação (10 por página)
- **Adição/Edição**: Drawer para criar e editar filmes
- **Página de Detalhes**: Informações completas do filme
- **Sistema de Temas**: Alternância entre claro/escuro
- **Responsividade**: Layout adaptável para todos os dispositivos

### **✅ Funcionalidades Extras**
- **Sistema de Permissões**: Apenas o usuário que cadastrou pode visualizar/editar/excluir seus filmes
- **Filtros Avançados**: 
  - Busca por título
  - Filtro por gênero
  - Filtro por período de lançamento
  - Filtro por duração
  - Filtro por orçamento
- **Paginação Inteligente**: Máximo de 10 filmes por página
- **Email de Lembrete**: Notificação automática para filmes com data futura
- **Páginas de Recuperação**: "Esqueci minha senha" e "Redefinir senha"
- **Sistema de Toast**: Notificações elegantes para feedback
- **Validações Robustas**: Validação completa de formulários
- **Tratamento de Erros**: Mensagens de erro amigáveis

## 🏗️ **Arquitetura e Tecnologias**

### **Stack Principal**
- **React 18** com TypeScript
- **Styled Components** para estilização
- **React Router** para navegação
- **Axios** para requisições HTTP
- **Vite** como bundler

### **Estrutura do Projeto**
```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button/         # Botão customizado
│   ├── Input/          # Input customizado
│   ├── Modal/          # Modal base
│   ├── FiltersModal/   # Modal de filtros
│   ├── AddMovieDrawer/ # Drawer para adicionar/editar
│   └── ...
├── pages/              # Páginas da aplicação
│   ├── LoginPage/      # Página de login
│   ├── RegisterPage/   # Página de cadastro
│   ├── MoviesPage/     # Listagem de filmes
│   ├── MovieDetailsPage/ # Detalhes do filme
│   └── ...
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── api/                # Serviços de API
│   ├── authService.ts  # Serviço de autenticação
│   ├── moviesService.ts # Serviço de filmes
│   └── config.ts       # Configurações da API
├── hooks/              # Hooks customizados
├── types/              # Definições TypeScript
└── utils/              # Utilitários
```

## 🎨 **Design System**

### **Tema e Cores**
- **Variáveis CSS** para consistência visual
- **Tema claro/escuro** com persistência no localStorage
- **Cores padronizadas** para botões, inputs e componentes

### **Componentes**
- **Button**: Múltiplas variantes (primary, secondary, danger, etc.)
- **Input**: Suporte a ícones e validações
- **Modal**: Base reutilizável com animações
- **Toast**: Sistema de notificações elegante

## 🔐 **Sistema de Autenticação**

### **Fluxo Completo**
1. **Login**: Autenticação com e-mail e senha
2. **Registro**: Cadastro com validações robustas
3. **Recuperação**: "Esqueci minha senha" com token
4. **Redefinição**: Nova senha com validações
5. **Logout**: Limpeza de dados e redirecionamento

### **Segurança**
- **JWT Token** armazenado no localStorage
- **Interceptadores Axios** para renovação automática
- **Redirecionamento** automático em caso de token inválido

## 📊 **Sistema de Permissões**

### **Controle de Acesso**
- **Filtro por usuário**: Apenas filmes do usuário logado são exibidos
- **Verificação de propriedade**: Validação antes de editar/excluir
- **Proteção de rotas**: Redirecionamento para login se não autenticado

## 🔍 **Sistema de Filtros**

### **Filtros Disponíveis**
- **Título**: Busca textual
- **Gênero**: Filtro por categoria
- **Período**: Data de lançamento (início e fim)
- **Duração**: Faixa de minutos
- **Orçamento**: Faixa de valores

### **Implementação**
- **Debounce** na busca para otimizar performance
- **Filtros combinados** com lógica AND
- **Paginação** mantida com filtros aplicados

## 📧 **Sistema de Email**

### **Funcionalidade**
- **Agendamento automático** para filmes com data futura
- **Cálculo inteligente** de dias até a estreia
- **Toast informativo** sobre o agendamento
- **Integração** com endpoint `/email/send`

## 🌐 **Deploy**

### **Vercel (Recomendado)**
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente:
   ```
   VITE_API_BASE_URL=https://sua-api.com
   VITE_API_TIMEOUT=15000
   ```
3. Deploy automático a cada push

### **Netlify**
1. Conecte seu repositório
2. Configure as variáveis de ambiente
3. Deploy automático

### **Docker**
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

## 🧪 **Testes e Qualidade**

### **Validações**
- **TypeScript** para type safety
- **ESLint** para qualidade de código
- **Validação de formulários** robusta
- **Tratamento de erros** abrangente

### **Performance**
- **Lazy loading** de componentes
- **Debounce** em buscas
- **Otimização** de re-renders
- **Bundle splitting** automático

## 📋 **Justificativas Técnicas**

### **Escolha do Styled Components**
- **CSS-in-JS** para encapsulamento de estilos
- **Props dinâmicas** para temas e variantes
- **TypeScript** integrado para type safety
- **Performance** otimizada com styled-components

### **Arquitetura de Contextos**
- **AuthContext** centralizado para estado global
- **Separação de responsabilidades** clara
- **Reutilização** de lógica entre componentes

### **Sistema de API**
- **Interceptadores** para autenticação automática
- **Tratamento de erros** padronizado
- **Type safety** com interfaces TypeScript
- **Configuração centralizada**

### **Responsividade**
- **Mobile-first** approach
- **Breakpoints** bem definidos
- **Layout flexível** para todos os dispositivos

## 🚀 **Próximos Passos**

### **Melhorias Futuras**
- **Testes unitários** com Jest e React Testing Library
- **PWA** para funcionalidade offline
- **Internacionalização** (i18n)
- **Dashboard** com estatísticas
- **Upload de imagens** com preview
- **Sistema de favoritos**

## 📞 **Contato**

Desenvolvido por **Marcelo Augusto** para o teste técnico da Cubos Academy.

---

**Status**: ✅ **COMPLETO** - Todos os requisitos obrigatórios implementados com funcionalidades extras.