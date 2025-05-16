## Estrutura Técnica do Website Vista Nova

### 🔧 1. Stack de Desenvolvimento

#### 🧠 Frontend Framework

*   **Next.js (v14 ou superior)** com App Router (`/app`)
*   Suporte a renderização híbrida (**SSR, SSG, ISR**).
*   Roteamento por pastas preparado para `/politica`, `/rgpd` e páginas futuras.
*   Ideal para **deploy na Vercel** com otimizações automáticas.
*   Suporte a `middleware.ts` para SEO, RGPD ou segurança futura.

#### 🎨 Estilização

*   **Tailwind CSS** (leve, utility-first, altamente customizável)
*   Plugins sugeridos:
    *   `@tailwindcss/typography` (texto institucional)
    *   `@tailwindcss/forms` (formulário de contato)
    *   `tailwindcss-animate` ou **Framer Motion** para animações suaves

#### 🧩 Animações

*   **Framer Motion** (animações declarativas e suaves)
    *   Aplicações:
        *   Slides da Hero Section
        *   Accordions (Missão, Visão, Valores)
        *   Transições entre blocos e cards
*   Alternativa leve: Tailwind com `transition` e `transform`

* * *

### 📦 2. Estrutura de Pastas Recomendada

```plain
/app
  layout.tsx          # Layout global
  page.tsx            # Página principal (landing)
  politica/page.tsx   # Política de privacidade
  rgpd/page.tsx       # Termos de RGPD
/components           # Componentes reutilizáveis
/constants            # Textos fixos, nomes de seção
/lib                  # Utilitários e serviços (ex: envio de email)
/styles               # Tailwind config e estilos globais
/public               # Imagens e ícones
```

* * *

### ✉️ 3. Formulário de Contato (sem redirecionar)

#### Integração recomendada:

*   **Resend** (backend integrado no projeto)
    *   Via rota `/api/send-email` usando Serverless API route
    *   Feedback inline via `react-hook-form` + `react-hot-toast`

#### Alternativas:

*   **EmailJS** (API-only, gratuito até 200 emails/mês)
*   **Formspree** (free limitado, simples)
*   **Nodemailer** + Vercel Functions (requer SMTP confiável)

#### Funcionalidade do Componente:

*   Validação com `react-hook-form`
*   Toasts de sucesso/erro
*   Honeypot anti-bot opcional
*   UX fluida sem redirecionamento

* * *

### 🧪 4. Testes e Qualidade

#### 🧼 Testes de Código

*   **Jest + React Testing Library**
    *   Foco em testes de:
        *   Formulário de contato
        *   Componente de header e menu
        *   Lógica de escolha de perfil

#### 🧯 Segurança e Qualidade

*   Headers HTTP via `middleware.ts` ou `next.config.js`
    *   CSP, `X-Frame-Options`, `X-XSS-Protection`
*   Lighthouse audit local:
    *   Performance
    *   Acessibilidade
    *   Boas práticas
    *   SEO

#### ✅ Check pré-deploy

*   `next lint` + `eslint-config-next`
*   `npm run build` sem warnings
*   `npm run test` com sucesso
*   `npm run analyze` (opcional)
*   Testes manuais em:
    *   Mobile: iOS Safari, Android Chrome
    *   Desktop: Chrome, Firefox, Edge

* * *

### 🚀 5. Deploy e Escalabilidade

#### 🔗 Deploy

*   **Vercel**
    *   Deploy automático via GitHub
    *   Previews por branch
    *   Edge caching e performance tracking
    *   Edge Functions futuras para localização ou RGPD

#### 🧠 Pronto para escalar

*   Internacionalização via `next-intl`
*   Middleware para segmentação de perfis ou tracking
*   CMS integrável: Notion API, Sanity, Headless WordPress, etc.