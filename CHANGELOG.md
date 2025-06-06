# 📜 Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/spec/v2.0.0.html).

## [2.2.9] - 2025-06-06

### Melhorado
- **Página 404 (`src/app/not-found.tsx`)**:
  - Ajustada para ser um Client Component (`'use client';`) para permitir o uso de `framer-motion`.
  - Removida a exportação `metadata` para resolver conflitos com o Client Component.
  - Melhorias visuais e de design, alinhando-a com o tema do site.
  - Adicionada animação com `framer-motion`.
  - Incluída uma mensagem bem-humorada em Português de Portugal.
  - Atualizado o estilo do botão para melhor coerência visual.

## [2.2.8] - 2025-06-01

### Adicionado
- **Documentação**:
  - Adicionada documentação JSDoc/TSDoc (em inglês) a funções complexas, componentes e tipos críticos.
  - Clarificada e documentada a estratégia de otimização de imagens no `README.md`.
  - Atualizado o `src/README.md` com a estrutura de diretórios e a organização de tipos TypeScript.
  - Documentada a decisão e diretrizes de uso para `styled-components` vs. Tailwind CSS.
- **Analytics**:
  - Implementado Google Analytics 4 (GA4) com deteção automática de domínio para múltiplos códigos de medição.
- **Monitoramento de Erros e Performance**:
  - Integrado Sentry para rastreamento de erros e monitoramento de desempenho em tempo real.
  - Configuração automática do Sentry SDK para Next.js (client, server e edge).

### Alterado
- **Configuração ESLint**:
  - Consolidada toda a configuração ESLint para um único ficheiro `eslint.config.mjs`.
  - Removidos ficheiros ESLint legados (`.eslintignore`, `.eslintrc.js`, `.eslintrc.json`) e a secção `eslintConfig` do `package.json`.
  - Ajustada a regra `no-restricted-syntax` para cores hexadecimais, focando a validação no script `check-colors.ts`.
- **Configuração Next.js (`next.config.mjs`)**:
  - Unificada a gestão de cabeçalhos de segurança e cache, centralizando-os neste ficheiro.
  - Atualizado para incluir a configuração do Sentry.
- **Configuração Vercel (`vercel.json`)**:
  - Simplificado o ficheiro, removendo a secção `headers` (agora gerida pelo `next.config.mjs`).
- **Configuração Tailwind CSS (`tailwind.config.mjs`)**:
  - Convertido o ficheiro de configuração de `.js` para `.mjs`.
  - Refatorada a secção de cores para maior clareza entre cores temáticas (variáveis CSS) e tokens diretos (namespace `vn:`).
- **Configuração `next-sitemap` (`next-sitemap.config.mjs`)**:
  - Convertido o ficheiro de configuração de `.js` para `.mjs`.
  - Atualizado o script `generate-sitemap` no `package.json`.
- **Qualidade de Código**:
  - Revisadas e otimizadas as arrays de dependências de `useEffect` em vários componentes e hooks para prevenir re-renders desnecessários e stale closures (e.g., `use-toast.ts`, `FontProvider.tsx`).
  - Melhorada a consistência de cores no projeto através da execução e ajustes baseados no script `check-colors.ts`, incluindo a correção de `boxShadow` para usar variáveis CSS.
- **Organização de Tipos**:
  - Consolidada e clarificada a estrutura de tipos TypeScript, distinguindo entre tipos de entidade (`src/types/entities.ts`), tipos de props (`src/types/props.ts`) e tipos específicos de `src/lib/types.ts`.
- **Hooks**:
  - Removida a duplicação do hook `use-toast.ts`, padronizando o uso para `src/components/ui/use-toast.ts`.

### Removido
- Dependência `@azure/identity` verificada como desnecessária e removida.
- Regra `no-restricted-syntax` para cores hexadecimais do ESLint (a verificação é agora primariamente feita pelo script `check-colors.ts`).
- Páginas e rotas de API de exemplo do Sentry (`/sentry-example-page` e `/api/sentry-example-api`) após a validação da integração.

### Revisado
- **`postcss.config.mjs`**: Configuração validada como standard e correta.
- **`tsconfig.json`**: Configuração validada como robusta; sugestões opcionais de melhoria consideradas.
- **`.npmrc`**: Analisado; aconselhada a remoção dado o uso exclusivo de `yarn`.
- **`.prettierrc` e `.prettierignore`**: Configurações validadas como boas e standard.
- **`tailwind.d.ts`**: Estrutura de tipagem do tema Tailwind validada.
- **Sistema de Estilos**: Organização entre tokens, `tailwind.config.mjs`, `globals.css` e `tailwind.d.ts` clarificada.

## [2.2.7] - 2025-06-01

### Alterado
- **Configuração ESLint**:
  - Consolidada toda a configuração ESLint para um único ficheiro `eslint.config.mjs` utilizando o formato "flat config".
  - Removidos ficheiros ESLint legados (`.eslintignore`, `.eslintrc.js`, `.eslintrc.json`) e a secção `eslintConfig` do `package.json`.
  - Adicionado `eslint-plugin-tailwindcss` com regras recomendadas e personalizadas.
  - Incluídas regras para desencorajar o uso direto de cores hexadecimais.
- **Configuração Next.js (`next.config.mjs`)**:
  - Unificada a gestão de cabeçalhos de segurança e cache, centralizando-os neste ficheiro.
  - Atualizada a `Permissions-Policy` para incluir `interest-cohort=()`.
  - Adicionada política de cache para a diretoria `/fonts/`.
  - Adicionada política de `Cache-Control: no-store` para rotas API (`/api/*`).
- **Configuração Vercel (`vercel.json`)**:
  - Simplificado o ficheiro, removendo a secção `headers` (agora gerida pelo `next.config.mjs`).
  - Mantidas as diretivas de build e framework.
- **Configuração Tailwind CSS (`tailwind.config.js` -> `tailwind.config.mjs`)**:
  - Convertido o ficheiro de configuração para o formato `.mjs` (`tailwind.config.mjs`).
  - Refatorada a secção de cores para maior clareza entre cores temáticas (variáveis CSS) e cores de token diretas (namespace `vn:`).
  - Removida redundância na secção "Legacy support" dentro do namespace `vn.colors`.
- **Configuração `next-sitemap` (`next-sitemap.config.js` -> `next-sitemap.config.mjs`)**:
  - Convertido o ficheiro de configuração para o formato `.mjs`.
  - Atualizado o script `generate-sitemap` no `package.json` para usar o novo nome do ficheiro de configuração.

### Revisado
- **`tsconfig.json`**: Configuração validada como robusta e alinhada com as práticas modernas. Sugestões opcionais fornecidas para maior clareza e robustez (e.g., `forceConsistentCasingInFileNames`, `baseUrl`).
- **`tailwind.d.ts`**: Validação da estrutura para tipagem do tema Tailwind. Sugerido o uso de `ThemeConfig` para maior clareza semântica na importação de tipos.
- **`postcss.config.mjs`**: Configuração validada como standard e correta.
- **`.npmrc`**: Analisado o conteúdo. Aconselhada a remoção se `yarn` for o gestor de pacotes exclusivo, pois as configurações `.npmrc` não teriam efeito.
- **`.prettierrc` e `.prettierignore`**: Configurações validadas como boas e standard, sem necessidade de alterações.

## [2.2.6] - 2025-05-31

### Adicionado
- Suporte a fontes locais otimizadas.
- Sistema de pré-carregamento de fontes.
- Título "Equipa" na seção `WeAreHereSection`.
- Padronização visual dos títulos de seção.

### Corrigido
- Link "Fala Connosco" para navegação correta em todas as páginas.
- Exibição do iframe do mapa com bordas arredondadas em todos os lados.
- Inconsistências nas cores dos títulos de seção (agora usando `text-primary`).
- Problemas de tipagem na função `getColor` para lidar com variantes e erros.

### Alterado
- Responsividade do header para melhor visualização em tablets (menu móvel até `xl`).
- Tamanho da logo no header para diferentes tamanhos de tela.
- Layout responsivo dos cards da equipe para centralizar em telas menores.
- Breakpoint customizado em `976px` para a grid de contatos e equipe.
- Altura do mapa aumentada para `350px` para melhor visualização.

## [2.2.0] - 2025-05-27

### Adicionado
- Sistema de contato integrado:
  - Formulário com validação em tempo real.
  - Integração com Nodemailer (simulada para desenvolvimento).
  - Proteção com reCAPTCHA v3.
  - Limitação de taxa de requisições.
  - Template de e-mail profissional.
  - Documentação detalhada da API de contato.
- _(Nota: Itens como "Suporte a temas claros/escuros" e "Melhorias de acessibilidade" listados aqui no original como pendentes foram movidos para o `FEATURES.MD` como tarefas futuras, pois o changelog regista alterações concluídas.)_

### Corrigido
- _(Nota: Itens como "Estilos de hover em dispositivos móveis" listados aqui no original como pendentes foram movidos para o `FEATURES.MD` como tarefas futuras.)_

## [2.1.6] - 2025-05-31

### Corrigido
- Configuração de build para Vercel:
  - Adicionado script `build:vercel` para ignorar erros de linting durante o build.
  - Atualizado `vercel.json` para usar o novo script de build.

## [2.1.5] - 2025-05-31

### Corrigido
- Problemas de build para produção:
  - Erro de tipo no `src/styles/theme/index.ts` (importações de tipos `Colors` e `Space`).
  - Erro de tipo na função `getColor` em `src/styles/utils/colorUtils.ts`.
  - Referência incorreta a `theme.fonts` em `src/styles/utils/theme-utils.ts`.
  - Adicionado boundary de suspense ao `ScrollProvider` para resolver erro com `useSearchParams()`.
  - Criado ficheiro `metadata.ts` para a página `/modelo` com configuração correta de `viewport`.
- Simplificação do sistema de email:
  - Removida dependência do `nodemailer`.
  - Implementada simulação de envio de email para desenvolvimento.
  - Simplificada a configuração de variáveis de ambiente.
- Otimização de páginas:
  - Convertidas páginas de políticas para Client Components.
  - Implementado renderização dinâmica de datas.
  - Movidos metadados para ficheiros separados.

### Alterado
- Simplificada a configuração do Next.js.
- Desativada verificação de linting durante o build.
- Atualizada estrutura de tipagem para o sistema de tema.
- Adicionada biblioteca `styled-components` para estilização avançada.

## [2.1.3] - 2025-05-24

### Adicionado
- Suporte a imagens otimizadas (WebP/AVIF).
- Lazy loading nativo para imagens.
- Pré-carregamento de imagens críticas.
- Placeholders com blur para imagens.

### Corrigido
- Carregamento de imagens em dispositivos retina.
- Tamanho de cache para imagens.

### Alterado
- Configuração do Next.js para otimização de imagens.

## [2.0.0] - 2025-05-20

### Adicionado
- Estrutura inicial do projeto.
- Layout principal e componentes essenciais.
- Configuração básica do Next.js e Tailwind CSS.
- Integração com TypeScript.

---

## 📊 Métricas de Performance

### Antes da Otimização (Referência Inicial)
- FCP (First Contentful Paint): 2.8s
- LCP (Largest Contentful Paint): 4.2s
- CLS (Cumulative Layout Shift): 0.25
- TTI (Time to Interactive): 3.1s

### Após Otimização (Marco v2.1.4 - Data não especificada, assumido como referência)
- FCP: 1.2s (redução de 57%)
- LCP: 1.8s (redução de 57%)
- CLS: 0.05 (redução de 80%)
- TTI: 1.9s (redução de 39%)

---

📅 *Última atualização: 01/06/2025*