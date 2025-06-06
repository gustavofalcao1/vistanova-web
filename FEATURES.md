# Vista Nova Web - Lista de Funcionalidades

Este documento mantém o controle das funcionalidades implementadas e pendentes no projeto Vista Nova Web.

## Funcionalidades Implementadas (v2.2.6)

* [x] **Componentes de UI Reutilizáveis** ✅
  * [x] Botões com variantes
  * [x] Campos de formulário com validação
  * [x] Cards para serviços e equipe
  * [x] Componentes de navegação
  * [x] Componentes de feedback (toast, alerts)
* [x] **Formulários Inteligentes** ✅
  * [x] Validação em tempo real com Zod (frontend)
  * [x] Feedback visual de erros
  * [x] Integração com reCAPTCHA v3
  * [x] Envio de e-mail (simulado, planeado Resend)
  * [x] Prevenção de spam e ataques (Rate limiting na API, reCAPTCHA)
* [x] **Animações e Transições** ✅
  * [x] Animações de entrada para seções (Framer Motion, `useScrollReveal`)
  * [x] Transições suaves entre estados
  * [x] Efeitos de hover e foco
  * [x] Animações otimizadas para performance
* [x] **Navegação e Acessibilidade (Base)** ✅
  * [x] Navegação suave entre seções
    * [x] Scroll suave para âncoras (`SmoothScrollLink`, `ScrollProvider`)
    * [x] Tratamento de navegação entre páginas com âncoras (`PageLink`)
    * [x] Feedback visual durante a navegação (não explícito, mas implícito nas transições)
* [x] **Componente HeroCarousel Melhorado** ✅
  * [x] Controle de exibição do badge de satisfação
  * [x] Controle de exibição dos botões de CTA
  * [x] Animações otimizadas
  * [x] Responsividade aprimorada
  * [x] Navegação por swipe em mobile
* [x] **Otimização de Imagens e Logos (Processo Manual/Script)** ✅
  * [x] Favicon moderno com suporte a múltiplos tamanhos e dispositivos (`generate-icons.ts`)
  * [x] Otimização de logos e imagens para WebP (`optimize-images.ts`)
    * [x] Remoção de metadados desnecessários (implícito no Sharp)
    * [x] Validação de imagens com ferramentas de otimização (assumido como parte do seu processo)
  * [x] Implementar carregamento otimizado para imagens (`OptimizedImage` com `loading="lazy"` e `priority`)
  * [x] Correção de problemas de exibição da logo em diferentes contextos
* [x] **Responsividade Aprimorada** ✅
  * [x] Layout adaptativo para dispositivos móveis, tablets e desktop
  * [x] Ajustes específicos para breakpoints personalizados
  * [x] Otimização de espaçamento e tamanho de fonte em diferentes dispositivos
  * [x] Componentes que se reorganizam conforme o tamanho da tela
* [x] **Segurança (Base)** ✅
  * [x] Cabeçalhos de segurança HTTP (`next.config.mjs`)
  * [x] Rate limiting para API (`middleware.ts`)
  * [x] Proteção de formulários com reCAPTCHA v3
* [x] **SEO (Base)** ✅
  * [x] Geração de `sitemap.xml` e `robots.txt` (`next-sitemap.config.js` agora `.mjs`)
  * [x] Metadados base e por página (`layout.tsx`, `metadata.ts` específicos)
  * [x] Favicons e ícones configurados
  * [x] `humans.txt`
* [x] **Monitoramento de Erros e Performance** ✅
  * [x] Análise de erros do lado do cliente (Sentry)
  * [x] Monitoramento de desempenho (Sentry)

## Melhorias Recentes (v2.2.6)

* [x] Correção do link "Fala Connosco" para navegação correta em todas as páginas
* [x] Ajuste da responsividade no header para melhor visualização em tablets
* [x] Padronização das cores nos títulos de seção para maior consistência visual
* [x] Ajuste do tamanho da logo no header para diferentes tamanhos de tela
* [x] Melhoria na exibição do menu móvel em dispositivos de tamanho médio

## Próximos Passos (Funcionalidades e Melhorias Gerais)

* [ ] **Implementar Lógica de Envio de Emails** (com Resend)
* [ ] **Implementar Gestão de Cookies** (com Cookiebot)
* [ ] **Acessibilidade (A11y) - Avançado**
  * [ ] Suporte a tema claro/escuro (funcionalidade completa e toggle)
  * [ ] Melhorias de contraste (auditoria e ajustes)
  * [ ] Navegação por teclado (testes exaustivos e correções)
  * [ ] Suporte a leitores de tela (ARIA, semântica)
* [ ] **SEO - Avançado**
  * [ ] Adicionar metadados para SEO em imagens (`alt text` já é obrigatório, mas rever a qualidade)
  * [ ] Garantir sitemap dinâmico para futuras páginas (blog, etc.)
  * [ ] Adicionar dados estruturados (Schema.org)
* [ ] **Monitoramento Completo**
  * [ ] Métricas de performance em tempo real (Vercel Analytics já está, mas expandir se necessário)
  * [ ] Monitoramento de disponibilidade
* [ ] **Testes**
  * [ ] Adicionar testes unitários e de integração (Jest, RTL)
* [ ] **Blog e CMS** (funcionalidade futura, sem planos claros ainda)

## Tarefas Pós-Auditoria (Refatoração e Boas Práticas)

### Estrutura e Organização
* [x] Clarificar/Atualizar `src/README.md` sobre o diretório `/src/features` (se aplicável).
* [x] Consolidar ou documentar claramente a distinção entre `/src/types` e `/src/lib/types.ts`.

### Configuração do Projeto
* [x] **ESLint**:
  * [x] Consolidar configuração ESLint (convertido para `eslint.config.mjs`).
  * [x] Remover secção `eslintConfig` do `package.json` e ficheiros ESLint legados.
* [x] **Otimização de Imagens**: Clarificar e documentar a estratégia final (Next.js Image loader vs. script `optimize-images.ts` e `images.unoptimized: true`). Atualizar `README.md`.
* [x] **Cabeçalhos de Segurança**: Unificar gestão de cabeçalhos de segurança (priorizar `next.config.mjs` sobre `vercel.json`).
* [x] **Dependências**:
  * [x] Verificar necessidade da dependência `@azure/identity`. (removida)
  * [x] Documentar decisão e diretrizes de uso para `styled-components` vs. Tailwind CSS.
* [x] **Padronização de Ficheiros de Configuração**:
    * [x] Converter `tailwind.config.js` para `.mjs`.
    * [x] Revisar `postcss.config.mjs` (confirmado como OK).
    * [x] Converter `next-sitemap.config.js` para `.mjs` e atualizar script no `package.json`.
* [x] **Revisão de `tsconfig.json`** (confirmado como bom, sugestões opcionais fornecidas).
* [x] **Revisão de `.npmrc`** (aconselhado remover se `yarn` for exclusivo).
* [x] **Revisão de `.prettierrc` e `.prettierignore`** (confirmados como bons).
* [ ] (Opcional) Reativar linting no build de produção (`eslint.ignoreDuringBuilds: false`) antes do deploy final.

### Qualidade do Código e Convenções
* [x] **Hooks**: Remover duplicação do hook `use-toast.ts` (escolher uma localização: `/src/hooks` ou `/src/components/ui`).
* [x] **Documentação de Código**: Adicionar JSDoc/TSDoc (em inglês) a funções complexas, componentes com muitas props e lógica de negócio crítica.
* [x] **Consistência de Cores**: Executar regularmente `scripts/check-colors.ts` e garantir que todas as cores hardcoded não intencionais sejam substituídas por variáveis/classes do tema.
* [x] **Revisão de `useEffect`**: Garantir que os arrays de dependências estão corretos e otimizados.
* [x] **Revisão do sistema de Estilos**: Clarificar organização entre tokens, `tailwind.config.mjs`, `globals.css` e `tailwind.d.ts`.

### Analytics e Monitoramento
* [x] **Google Analytics**: Implementar Google Analytics 4 (GA4) com dois códigos de medição:
  * `G-CKS904F0K4` para o domínio principal (vistanova.pt)
  * `G-WN7H6JW57C` para o URL de deploy do Vercel
  * Detecção automática do domínio para usar o código apropriado
* [x] **Web Vitals**: Monitorar métricas de performance com o componente `WebVitals` integrado ao Next.js.
* [x] **Vercel Analytics**: Manter a integração com Vercel Analytics para métricas complementares.

### Performance
* [ ] **LazyLoad Component**: Se o componente `LazyLoad` atual for um placeholder, implementar lazy loading real para componentes (e.g., com Intersection Observer) ou usar funcionalidades do React 19.
* [ ] **Bundle Analysis**: Executar `yarn analyze` periodicamente.

### Segurança
* [ ] **Validação Backend**: Implementar validação com Zod no backend para a rota `/api/contact`.
* [ ] **Gestão de Segredos**: Confirmar que `.env.local` está no `.gitignore` e que os segredos são geridos de forma segura em produção.
* [ ] **Auditoria de Dependências**: Executar `yarn audit` regularmente.

### Documentação e Manutenção
* [x] **Changelog**: Reordenar e verificar consistência do `CHANGELOG.MD` (entradas mais recentes no topo). *(Sugestão: Marcar como feito)*
* [ ] **Scripts Customizados**: Documentar scripts em `scripts/` (e.g., `generateGlobalCSS.mjs`) no `README.md` principal.

### Error Handling e Logging
