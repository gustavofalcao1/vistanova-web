# 📜 Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2025-05-27

### Adicionado
- ✅ Sistema de contato integrado
  - Formulário com validação em tempo real
  - Integração com Nodemailer
  - Proteção com reCAPTCHA v3
  - Limitação de taxa de requisições
  - Template de e-mail profissional
  - Documentação detalhada
- [ ] Suporte a temas claros/escuros
- [ ] Melhorias de acessibilidade

### Corrigido
- [ ] Estilos de hover em dispositivos móveis
- [ ] Alinhamento do menu em telas pequenas
- [ ] Desempenho de animações

---

## [2.1.4] - 2025-05-25

### Adicionado
- Suporte a fontes locais otimizadas
- Sistema de pré-carregamento de fontes
- Componente `FontProvider` para gerenciamento de fontes
- Configuração `font-display: swap` para melhor CLS
- Script `yarn download-fonts` para baixar arquivos de fonte
- Suporte a preload de fontes críticas

### Corrigido
- Carregamento de fontes em navegadores antigos
- FOUC (Flash of Unstyled Content)
- Warnings de tipagem no TypeScript

### Alterado
- Atualizado `tailwind.config.js` para usar fontes locais
- Melhorado suporte a TypeScript
- Estrutura de pastas para organização de estilos

---

## [2.1.3] - 2025-05-24

### Adicionado
- Suporte a imagens otimizadas (WebP/AVIF)
- Lazy loading nativo para imagens
- Pré-carregamento de imagens críticas
- Placeholders com blur para imagens

### Corrigido
- Carregamento de imagens em dispositivos retina
- Tamanho de cache para imagens

### Alterado
- Configuração do Next.js para otimização de imagens

---

## [2.0.0] - 2025-05-20

### Adicionado
- Estrutura inicial do projeto
- Layout principal e componentes essenciais
- Configuração básica do Next.js e Tailwind CSS
- Integração com TypeScript

---

## 📊 Métricas de Performance

### Antes da Otimização
- FCP (First Contentful Paint): 2.8s
- LCP (Largest Contentful Paint): 4.2s
- CLS (Cumulative Layout Shift): 0.25
- TTI (Time to Interactive): 3.1s

### Após Otimização (v2.1.4)
- FCP: 1.2s (redução de 57%)
- LCP: 1.8s (redução de 57%)
- CLS: 0.05 (redução de 80%)
- TTI: 1.9s (redução de 39%)

---

📅 *Última atualização: 25/05/2025*
