# 🏥 VRL - Doctors: SaaS para Clínicas Médicas

O **VRL - Doctors** é uma aplicação **SaaS (Software as a Service)** desenvolvida para clínicas médicas que desejam gerenciar seus profissionais, pacientes e agendamentos de forma simples, moderna e segura.

Com o VRL - Doctors, é possível registrar médicos e pacientes, agendar consultas, processar pagamentos online e acompanhar o funcionamento da clínica em tempo real.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido com a stack moderna do ecossistema **Next.js** e ferramentas robustas para autenticação, banco de dados e pagamentos:

- **Next.js** — Framework React para renderização híbrida (SSR/SSG)
- **TailwindCSS** — Estilização rápida e responsiva
- **PostgreSQL** — Banco de dados relacional
- **Drizzle ORM** — Mapeamento e migrações tipadas e seguras
- **Better Auth** — Autenticação moderna e segura para aplicações Next.js
- **Stripe** — Integração de pagamentos e gestão de planos de assinatura

---

## 🩺 Funcionalidades Principais

- 👨‍⚕️ **Cadastro de Médicos**  
  Permite registrar médicos com informações de nome, especialidade, preço da consulta e horários disponíveis.

- 👩‍🦰 **Cadastro de Pacientes**  
  Armazena dados pessoais de forma segura e organizada.

- 📅 **Agendamento de Consultas**  
  Interface intuitiva para marcar, visualizar e gerenciar consultas médicas.

- 💳 **Pagamentos via Stripe**  
  Suporte a pagamentos e planos de assinatura para clínicas e profissionais.

- 🔐 **Autenticação Segura (Better Auth)**  
  Controle de acesso somente para administradores.

- 📊 **Dashboard Interativa com Gráficos**  
  Painel administrativo com **gráficos dinâmicos** que facilitam a visualização de métricas da clínica, como número de consultas, médicos com maior número de consultas, especialidades mais procuradas, receita mensal, etc.

---

## ⚙️ Instalação e Configuração

1. **Clone o repositório:**

```bash
   git clone https://github.com/seu-usuario/medcare.git
   cd medcare
```

2. Instale as dependências:

```bash
npm install --legacy-peer-deps
```

3. Configure as variáveis de ambiente:
   Crie um arquivo .env.local na raiz do projeto com as chaves:

```bash
DATABASE_URL=""
BETTER_AUTH_SECRET=""
BETTER_AUTH_URL=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_ESSENTIAL_PLAN_PRICE_ID=""
STRIPE_WEBHOOK_SECRET=""

NEXT_PUBLIC_APP_URL=""
NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL=""
```

4. Execute as migrações do banco de dados:

```bash
npm run db:push
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

6. Acesse o app em: http://localhost:3000

---

💰 Planos e Pagamentos

O sistema utiliza o Stripe para processar pagamentos de forma segura.
Os administradores podem definir planos de assinatura para clínicas e profissionais.

---

🔒 Segurança e Privacidade

Dados sensíveis são criptografados.

Controle de acesso baseado em papéis.

Conformidade com boas práticas de LGPD (Lei Geral de Proteção de Dados).

---

📄 Licença

Este projeto está sob a licença MIT.
