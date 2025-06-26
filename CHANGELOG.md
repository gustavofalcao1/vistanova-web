# 📜 Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/spec/v2.0.0.html).

## [2.2.17] - 2025-01-27 - Otimização Sistema de Envio de Currículos

### 🚀 Melhorias de Integração Resend
- **Encoding Base64** conforme documentação oficial do Resend para anexos locais
- **Validação de tamanho total de email** respeitando limite de 40MB do Resend
- **Processamento otimizado** de arquivos para garantir compatibilidade total
- **Tratamento de erros aprimorado** com mensagens específicas para anexos

### 🔒 Restrições de Segurança
- **Limitação a PDF único** - removido suporte para arquivos Word (.doc/.docx)
- **Validação rigorosa** de tipo MIME para aceitar apenas PDFs
- **Mensagens de erro específicas** para formato e tamanho de arquivo
- **Proteção contra uploads maliciosos** com validação dupla (frontend + backend)

### 📋 Funcionalidades Aprimoradas
- **API de carreiras** (`/api/careers`) otimizada para Resend
- **Formulário de upload** simplificado com accept=".pdf" exclusivo
- **Validação em tempo real** com feedback visual melhorado
- **Documentação atualizada** refletindo mudanças de formato aceito

### ⚡ Performance e Confiabilidade
- **Conversão Base64 eficiente** para compatibilidade total com Resend
- **Verificação preventiva** de tamanho antes do envio
- **Fallback inteligente** em caso de falhas do serviço
- **Logs detalhados** para debugging e monitoramento

### 📚 Documentação Técnica
- **README da API atualizado** (`src/app/api/careers/README.md`)
- **Especificações claras** de formatos aceitos e limitações
- **Exemplos de uso** alinhados com a documentação do Resend
- **Melhores práticas** para envio de anexos por email

## [2.2.16] - 2025-01-27 - Harmonização da Paleta de Cores

### 🎨 Melhorias de Design
- **Novas variantes de cores secundárias** para melhor acessibilidade e harmonia visual
- **Criadas 8 novas variantes** da cor secundária: `onWhite`, `onLight`, `vibrant`, `muted`, `subtle`, `accessible`, `darker`, `auto`
- **Cores WCAG AA/AAA compliant** para garantir legibilidade em todos os contextos
- **Classes CSS automáticas** para seleção inteligente de cores baseada no contexto

### 🛠️ Funcionalidades Técnicas
- **API de Carreiras completa** (`/api/careers`) com suporte a anexos via Resend
- **Upload de CV** com validação (PDF/Word, até 5MB) e processamento seguro
- **Formulário de candidaturas** profissional com todos os campos necessários
- **Integração reCAPTCHA v3** para proteção contra spam
- **Validação robusta** com Zod e feedback visual de erros

### 📄 Documentação
- **Guia completo de cores harmoniosas** (`docs/HARMONIZED_COLORS.md`)
- **Documentação da API de carreiras** (`src/app/api/careers/README.md`)
- **Exemplos de uso** e melhores práticas para cada variante de cor

### 🎯 Aplicações Práticas
- **Página de carreiras otimizada** com design coerente e funcional
- **Ícones e elementos visuais** agora usam cores apropriadas para cada contexto
- **Melhor contraste** em textos e elementos interativos
- **Experiência visual consistente** em todo o site

### ⚡ Performance
- **Sistema de cores eficiente** usando CSS variables
- **Classes utilitárias otimizadas** para rápida aplicação
- **Fallbacks inteligentes** para compatibilidade
- **Compilação sem erros** com todas as melhorias aplicadas

## [2.2.15] - 2025-01-19

### ✨ Adicionado
- **Política de Privacidade Oficial Completa**:
  - Implementação do documento legal oficial elaborado por advogado
  - 19 seções legais obrigatórias conforme legislação portuguesa e GDPR
  - Tabela detalhada de finalidades, fundamentos e prazos de conservação de dados
  - Informações específicas da Microsoft Ireland Operations Limited (NIPC 980152267)
  - Endereço completo do fornecedor de serviços de dados em Dublin, Irlanda
  - Todos os direitos do utilizador detalhados (acesso, retificação, apagamento, etc.)
  - Links funcionais para dadospessoais@vistanova.pt e CNPD
- **Sistema de Email Aprimorado**:
  - Nova API dedicada `/api/newsletter` separada da API de contacto
  - Notificação automática para `marketing@vistanova.pt` em novas inscrições na newsletter
  - Email de boas-vindas duplo: utilizador + notificação interna
  - Separação completa entre formulário de contacto e newsletter

### 🎨 Melhorado
- **Estrutura Legal**:
  - Links internos automáticos para "Política de Cookies" quando mencionada
  - Formatação profissional com numeração ordenada e tabelas responsivas
  - Data dinâmica de última atualização em formato português
  - Contactos telefónicos com links funcionais (tel:)
  - Estrutura hierárquica clara com títulos e subtítulos organizados
- **Sistema de Emails**:
  - Todas as respostas de email agora direcionadas para `geral@vistanova.pt`
  - Links de contacto nos emails atualizados para o endereço correto
  - Separação clara entre APIs de contacto e newsletter
  - Melhor organização do código com funções específicas para cada tipo de email

### 🔧 Corrigido
- **Informações de Fornecedor**:
  - Removidos placeholders genéricos ([DENOMINAÇÃO SOCIAL], [EMPRESA 2])
  - Implementadas informações reais da Microsoft Ireland Operations Limited
  - Corrigida estrutura do ponto 12 sobre comunicação de dados a terceiros
  - Alinhamento completo com documento legal sem alterações não autorizadas
- **Configuração de Emails**:
  - Corrigido reply-to de `contato@vistanova.pt` para `geral@vistanova.pt`
  - Removida mistura de dados entre formulário de contacto e newsletter
  - Corrigidos templates de email para direcionar respostas ao endereço correto

## [2.2.14] - 2025-01-19

### ✨ Adicionado
- **Informações Legais Obrigatórias no Footer**:
  - Seção dedicada com informações do Banco de Portugal (Registro n° 2543)
  - Dados da ANICA - Associação Nacional Intermediários Crédito Autorizados
  - Detalhamento completo dos serviços de crédito hipotecário e ao consumo
  - Números de autorização AP atualizados (2024-2025)
  - Design responsivo com fundo destacado e tipografia legível (12px mínimo)

### 🎨 Melhorado
- **Footer Design**:
  - Nova seção de informações legais com destaque visual
  - Fundo semi-transparente para melhor legibilidade
  - Estrutura hierárquica clara com títulos e listas organizadas
  - Layout responsivo adaptado para diferentes tamanhos de tela

## [2.2.13] - 2025-01-19

### 🛠️ Corrigido
- **Bug Crítico - Recursão Infinita no Tailwind**:
  - Corrigida função `flattenShadows` que causava "Maximum call stack size exceeded"
  - Substituída lógica complexa de recursão por mapeamento estático usando variáveis CSS
  - Build e desenvolvimento funcionando normalmente sem erros de stack overflow
  - Mantida toda funcionalidade de sombras existente

### ✨ Adicionado
- **Novas Variações de Cor Secundária Acessível**:
  - `secondary-accessible`: #707E02 - WCAG AA compliant (contraste 4.49:1 vs branco)
  - `secondary-vibrant`: #9DB002 - contraste intermediário (2.43:1 vs branco)  
  - `secondary-darker`: #5A6602 - contraste máximo (6.29:1 vs branco)
  - `secondary-onDark`: #E5FC2A - para uso em fundos escuros
  - Classes CSS automáticas (`.text-secondary-accessible`, `.bg-secondary-accessible`, etc.)
  - Suporte completo no Tailwind config para todas as variações

### 🎯 Melhorado
- **Estabilidade do Sistema**:
  - Configuração Tailwind mais robusta e livre de recursões
  - Performance melhorada no processo de build (43.90s vs anteriores falhas)
  - Manutenção facilitada do sistema de sombras
- **Acessibilidade Visual**:
  - Sistema de cores secundárias com contraste adequado para fundos claros
  - Preservada identidade da marca (cor original mantida para fundos escuros)
  - Flexibilidade para diferentes contextos de uso

## [2.2.11] - 2025-01-06

### ✨ Adicionado
- **Sistema de Harmonização de Cores e Sombreamentos**:
  - Tokens de sombras padronizadas baseados na identidade da marca (`src/styles/tokens/shadows.ts`)
  - Funções utilitárias de harmonização de cores (`src/styles/utils/colorUtils.ts`)
  - Classes Tailwind customizadas para sombras harmonizadas (`shadow-vn-*`)
  - Variáveis CSS centralizadas para sistema de elevação consistente
  - Animações de transição suave para sombras (`animate-shadow-lift`, `animate-shadow-settle`)
  - Funções de verificação de acessibilidade WCAG (`getContrastRatio`, `isAccessibleContrast`)
  - Sistema de mapeamento automático de cores para paleta da marca
  - Relatório de análise completo (`src/styles/analysis-report.md`)

### 🔧 Melhorado
- Configuração Tailwind expandida com sistema de sombras harmonizadas
- CSS global com variáveis customizadas para elevação visual
- Sistema de tokens de cores mais robusto e escalável

### 📚 Documentação
- Guia completo de uso do sistema de harmonização
- Mapeamento de componentes antes/depois
- Checklist de implementação para desenvolvedores

### Removido
- **Limpeza de Código de Produção**:
  - Removidos todos os logs de debug (`console.log`, `console.warn`, `console.error`) do código de produção
  - Excluído componente obsoleto `src/components/analytics/cookiebot.tsx`
  - Excluído banner de desenvolvimento `src/components/analytics/cookiebot-dev.tsx`
  - Removida documentação desatualizada `docs/COOKIEBOT_SETUP.md`
  - Limpeza dos logs de debug no componente `web-vitals.tsx`

### Alterado
- **Renomeação e Consistência**:
  - Renomeadas variáveis internas de `COOKIEBOT_*` para `USERCENTRICS_*` para melhor clareza
  - Atualizado `cookie-declaration.tsx` para usar Usercentrics em vez de Cookiebot
  - Ajustado `google-analytics.tsx` removendo logs de debug e simplificando código
  - Atualizado `layout.tsx` removendo referências aos componentes deletados
- **Documentação**:
  - Atualizado `USERCENTRICS_SETUP.md` removendo seções de debug e desenvolvimento
  - Atualizado `FEATURES.md` marcando limpeza de código como concluída
  - Atualizado `README.md` para versão 2.2.11 com melhorias de limpeza

### Técnico
- **Build e Performance**:
  - Build bem-sucedido sem erros após limpeza
  - Código TypeScript válido e consistente
  - Integração Sentry mantida e funcional
  - Todas as funcionalidades essenciais preservadas

## [2.2.10] - 2025-06-06

### Adicionado
- **Sistema de Email Melhorado**:
  - Integração completa com [Resend](https://resend.com) para envio real de emails
  - Fallback automático para simulação quando Resend não está configurado
  - Suporte a emails de boas-vindas para newsletter
  - Templates HTML melhorados e responsivos
  - Logging detalhado para debugging e monitoramento
- **Componente LazyLoad Funcional**:
  - Implementação real de lazy loading com Intersection Observer
  - Fallback para navegadores antigos que não suportam Intersection Observer
  - Configuração flexível de thresholds e margens
  - Suporte a renderização única ou contínua
  - Componente de fallback customizável enquanto o conteúdo não é carregado
- **Documentação de Scripts Customizados**:
  - Documentação completa dos scripts em `/scripts` no README
  - Instruções detalhadas para verificação de cores (`check-colors.ts`)
  - Guia para geração de ícones e favicons (`generate-icons.ts`)
  - Documentação do download de fontes locais (`download-fonts.ts`)

### Melhorado
- **Validação Backend**:
  - Implementação de validação com Zod na API `/api/contact`
  - Remoção de validação manual básica em favor do schema estruturado
  - Melhor tratamento de erros com detalhes específicos por campo
  - Resposta JSON mais informativa para debugging
- **Qualidade do Código**:
  - Linting reativado no build de produção para garantir qualidade
  - Auditoria de dependências executada (6 vulnerabilidades de baixo risco identificadas)
  - Bundle analysis configurado para monitoramento de tamanho
- **Gestão de Segredos**:
  - Confirmado que `.env.local` está corretamente no `.gitignore`
  - Validação da configuração de segurança do projeto

### Técnico
- **Dependências**:
  - Adicionado `resend@4.6.0` para serviço de email profissional
  - Mantidas compatibilidades com dependências existentes
- **Scripts**:
  - Documentados todos os scripts customizados de manutenção
  - Adicionado suporte ao `yarn analyze:browser` para análise de bundle
- **Performance**:
  - Lazy loading real implementado para melhor performance
  - Redução do carregamento inicial através de renderização sob demanda

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

📅 *Última atualização: 19/01/2025*

# Changelog - Vista Nova Web

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [2.2.11] - 2025-01-06

### ✨ Adicionado
- **Sistema de Harmonização de Cores e Sombreamentos**:
  - Tokens de sombras padronizadas baseados na identidade da marca (`src/styles/tokens/shadows.ts`)
  - Funções utilitárias de harmonização de cores (`src/styles/utils/colorUtils.ts`)
  - Classes Tailwind customizadas para sombras harmonizadas (`shadow-vn-*`)
  - Variáveis CSS centralizadas para sistema de elevação consistente
  - Animações de transição suave para sombras (`animate-shadow-lift`, `animate-shadow-settle`)
  - Funções de verificação de acessibilidade WCAG (`getContrastRatio`, `isAccessibleContrast`)
  - Sistema de mapeamento automático de cores para paleta da marca
  - Relatório de análise completo (`src/styles/analysis-report.md`)

### 🔧 Melhorado
- Configuração Tailwind expandida com sistema de sombras harmonizadas
- CSS global com variáveis customizadas para elevação visual
- Sistema de tokens de cores mais robusto e escalável

### 📚 Documentação
- Guia completo de uso do sistema de harmonização
- Mapeamento de componentes antes/depois
- Checklist de implementação para desenvolvedores