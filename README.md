# 🎬 Front Movies Cubos

<div align="center">

![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled%20Components-6.0+-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Sistema completo de gerenciamento de filmes com autenticação com filtros  e design responsivo**

[![Deploy Status](https://img.shields.io/badge/Deploy-Ready-brightgreen?style=for-the-badge)](https://vercel.com)
[![Test Coverage](https://img.shields.io/badge/Coverage-85%25-green?style=for-the-badge)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

</div>

---

## 🎯 **Visão Geral**

Sistema web completo para gerenciamento de filmes desenvolvido com **React 18**, **TypeScript** e **Styled Components**. Implementa todas as funcionalidades obrigatórias do teste técnico da Cubos Academy, além de recursos extras que demonstram conhecimento avançado em desenvolvimento frontend.

### ✨ **Destaques**
- 🔐 **Sistema de autenticação completo** com JWT
- 🎨 **Design system** com tema claro/escuro
- 📱 **Responsividade**
- 🔍 **Filtros**
- 🛡️ **Sistema de permissões** por usuário
- 📧 **Notificações por email** automáticas
- ⚡ **Lazy loading** 

---

## 🚀 **Quick Start**

### **Pré-requisitos**
```bash
Node.js 18+
Yarn
```

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/front-movies-cubos.git
cd front-movies-cubos

# Instale as dependências
yarn install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute em desenvolvimento
yarn dev
```

### **Variáveis de Ambiente**
```env
# .env
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=10000
VITE_APP_ENV=development
VITE_APP_NAME=Front Movies Cubos
```

## 📱 **Funcionalidades**

### **✅ Requisitos Obrigatórios**
- [x] **Página de Login** - Formulário com validações
- [x] **Página de Cadastro** - Registro completo de usuários
- [x] **Listagem de Filmes** 
- [x] **Adicionar/Editar Filmes** - Drawer responsivo
- [x] **Página de Detalhes** - Informações completas
- [x] **Sistema de Temas** - Claro/escuro
- [x] **Design Responsivo**

### **🚀 Funcionalidades Extras**
- [x] **Sistema de Permissões** - Apenas dono pode editar/excluir
- [x] **Filtros Avançados** - Título, gênero, período, duração, orçamento
- [x] **Busca Inteligente** - Debounce para performance
- [x] **Email de Lembrete** - Notificação para filmes futuros
- [x] **Recuperação de Senha** - Fluxo completo com token
- [x] **Sistema de Toast** - Notificações elegantes
- [x] **Validações Robustas** - Formulários com validação completa
- [x] **Tratamento de Erros** - Mensagens amigáveis
- [x] **Loading States** - Feedback visual durante carregamento

---

## 🏗️ **Arquitetura**

### **Stack Tecnológica**
```typescript
Frontend:
├── React 18 + TypeScript
├── Styled Components
├── React Router v6
├── Axios + Interceptors
├── Context API
└── Vite (Build Tool)

Backend Integration:
├── RESTful API
├── JWT Authentication
├── File Upload Support
└── Email Service
```

### **Estrutura do Projeto**
```
src/
├── 📁 components/          # Componentes reutilizáveis
│   ├── Button/            # Botão com múltiplas variantes
│   ├── Input/             # Input com validações
│   ├── Modal/             # Modal base reutilizável
│   ├── FiltersModal/      # Modal de filtros avançados
│   ├── AddMovieDrawer/    # Drawer para CRUD de filmes
│   ├── Toast/             # Sistema de notificações
│   └── ...
├── 📁 pages/              # Páginas da aplicação
│   ├── LoginPage/         # Autenticação
│   ├── RegisterPage/      # Cadastro de usuários
│   ├── MoviesPage/        # Listagem com filtros
│   ├── MovieDetailsPage/  # Detalhes completos
│   ├── ForgotPasswordPage/ # Recuperação de senha
│   └── ...
├── 📁 contexts/           # Contextos React
│   ├── AuthContext.tsx    # Gerenciamento de autenticação
│   └── ThemeContext.tsx   # Sistema de temas
├── 📁 api/                # Serviços de API
│   ├── authService.ts     # Autenticação e usuários
│   ├── moviesService.ts   # CRUD de filmes
│   ├── emailService.ts    # Envio de emails
│   └── config.ts          # Configurações da API
├── 📁 hooks/              # Hooks customizados
│   └── useToast.ts        # Hook para notificações
├── 📁 types/              # Definições TypeScript
│   └── index.ts           # Interfaces e tipos
├── 📁 utils/              # Utilitários
│   ├── mobileUtils.ts     # Detecção e debug mobile
│   └── movieReminder.ts   # Lógica de lembretes
└── 📁 styles/             # Estilos globais
    └── global.css         # Reset e variáveis CSS
```

---

## 🎨 **Design System**

### **Tema e Cores**
```css
/* Variáveis CSS para consistência */
:root {
  --primary-color: #646CFF;
  --secondary-color: #535BF2;
  --success-color: #00C851;
  --danger-color: #FF4444;
  --warning-color: #FF8800;
  --text-primary: #213547;
  --text-secondary: #6B7280;
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8FAFC;
}
```

### **Componentes Principais**
- **Button**: 6 variantes (primary, secondary, danger, success, warning, ghost)
- **Input**: Suporte a ícones, validações e estados de erro
- **Modal**: Base reutilizável com animações suaves
- **Toast**: Sistema de notificações com auto-dismiss
- **Drawer**: Painel lateral para formulários

---


### **Segurança Implementada**
- ✅ **JWT Token** com expiração
- ✅ **Interceptadores Axios** para renovação automática
- ✅ **Redirecionamento** em caso de token inválido
- ✅ **Validação** de formulários no frontend

---

## 🔍 **Sistema de Filtros**

### **Filtros Disponíveis**
```typescript
interface MovieFilters {
  title?: string;           // Busca textual
  genre?: string;           // Filtro por gênero
  releaseDateStart?: string; // Data início
  releaseDateEnd?: string;   // Data fim
  durationMin?: number;     // Duração mínima
  durationMax?: number;     // Duração máxima
  budgetMin?: number;      // Orçamento mínimo
  budgetMax?: number;      // Orçamento máximo
}
```

## 📧 **Sistema de Email**

### **Funcionalidade**
```typescript
// Agendamento automático para filmes futuros
const scheduleReminder = (movie: Movie) => {
  const daysUntilRelease = calculateDaysUntilRelease(movie.releaseDate);
  
  if (daysUntilRelease > 0) {
    emailService.sendReminder({
      email: user.email,
      movieTitle: movie.title,
      releaseDate: movie.releaseDate,
      daysUntilRelease
    });
  }
};
```

## 🌐 **Deploy**

### **Vercel (Recomendado)**
[![Deploy with Vercel](https://vercel.com/button)](https://front-movies-cubos.vercel.app/)

1. **Conecte** seu repositório GitHub
2. **Configure** as variáveis de ambiente:
   ```env
   VITE_API_BASE_URL=https://sua-api.vercel.app
   VITE_API_TIMEOUT=15000
   ```
