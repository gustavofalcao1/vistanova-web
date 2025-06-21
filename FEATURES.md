# Vista Nova Web - Lista de Funcionalidades

Este documento mantém o controle das funcionalidades implementadas e pendentes no projeto Vista Nova Web.

## Funcionalidades Implementadas (v2.2.13)

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
* [x] **Layout Responsivo**: Design moderno e responsivo com breakpoints customizados ✅
* [x] **Sistema de Cores**: Tokens de cores bem estruturados ✅
* [x] **Tipografia**: Sistema tipográfico consistente com fonte Inter ✅
* [x] **Animações**: Implementação com Framer Motion para animações suaves ✅
* [x] **Componentes UI**: Biblioteca baseada em shadcn/ui com customizações ✅
* [x] **Harmonização de Cores e Sombreamentos**: Sistema unificado de cores e sombras padronizadas (v2.2.11) ✅
* [x] **Sistema de Cores Acessíveis**: Variações WCAG AA compliant da cor secundária (v2.2.13) ✅

## Melhorias Recentes (v2.2.13)

* [x] **Correções Críticas de Sistema** ✅
  * [x] Resolução do bug de recursão infinita no Tailwind config (flattenShadows)
  * [x] Build estável sem erros de "Maximum call stack size exceeded"
  * [x] Performance de build melhorada (43.90s sem falhas)
  * [x] Sistema de sombras robusto com mapeamento estático via CSS variables
* [x] **Acessibilidade Visual Aprimorada** ✅
  * [x] Cores secundárias com contraste WCAG AA compliant
  * [x] secondary-accessible (#707E02) - contraste 4.49:1 vs branco
  * [x] secondary-vibrant (#9DB002) - contraste intermediário
  * [x] secondary-darker (#5A6602) - contraste máximo
  * [x] secondary-onDark (#E5FC2A) - preservada para fundos escuros
  * [x] Classes CSS automáticas para todas as variações
  * [x] Suporte completo no Tailwind config
  * [x] Identidade da marca preservada com flexibilidade de uso

## Melhorias Anteriores (v2.2.11)

* [x] **Limpeza e Otimização de Código** ✅
  * [x] Remoção de todos os logs de debug e console.log de produção
  * [x] Exclusão de componentes obsoletos (cookiebot.tsx, cookiebot-dev.tsx)
  * [x] Remoção de documentação desatualizada (COOKIEBOT_SETUP.md)
  * [x] Renomeação interna de variáveis para consistência (COOKIEBOT → USERCENTRICS)
  * [x] Atualização da declaração de cookies para Usercentrics
  * [x] Código otimizado para produção com estrutura limpa e maintível
* [x] **Gestão de Cookies Profissional** ✅
  * [x] Implementação completa do Usercentrics para GDPR compliance
  * [x] Banner de consentimento funcional em português
  * [x] Integração com Google Analytics respeitando consentimento
  * [x] Política de cookies completa e precisa baseada em análise técnica
  * [x] Declaração dinâmica de cookies na página de política

## Próximos Passos (Funcionalidades e Melhorias Gerais)

* [x] **Implementar Lógica de Envio de Emails** (com Resend) ✅
* [x] **Implementar Gestão de Cookies** (com Usercentrics) ✅
* [x] **Limpeza e Otimização de Código** ✅
* [ ] **Refatoração dos Componentes UI** 
  * [ ] Refatorar páginas em `@/(pages)` para usar componentes UI consistentemente
  * [ ] Substituir HTML básico por componentes reutilizáveis (`Card`, `Separator`, `Badge`, `Accordion`, etc.)
  * [ ] Unificar uso de componentes de forma modular para evitar redundância
  * [ ] Garantir que todas as páginas seguem o mesmo padrão de design system
  * [ ] Remover componentes UI não utilizados após refatoração completa
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
  * [x] Consolidar configuração ESLint (convertido para `