# Vista Nova - Website

Website institucional profissional para a Vista Nova, construído com tecnologias modernas para garantir desempenho, acessibilidade e manutenibilidade.

## 📌 Status do Projeto

**Versão Atual:** 2.2.11  
**Status:** Em desenvolvimento ativo  
**Próxima Versão Estável:** 2.3.X (Planejada para produção)

### Versionamento
- **2.x.x**: Melhorias e manutenção do site atual
- **x.2.x**: Versão em produção (versão estável)
- **x.x.11**: Décima primeira iteração de desenvolvimento

### Melhorias Recentes (v2.2.11)
- **Limpeza e Otimização de Código**: Remoção completa de logs de debug, componentes obsoletos e código de desenvolvimento desnecessário
- **Gestão de Cookies Profissional**: Implementação limpa do Usercentrics com GDPR compliance total
- **Código de Produção**: Estrutura otimizada e maintível, sem elementos de desenvolvimento
- **Renomeação Consistente**: Variáveis internas ajustadas para refletir a tecnologia real (Usercentrics)
- **Documentação Atualizada**: Remoção de documentação obsoleta e atualização para refletir implementação atual

### Melhorias Anteriores (v2.2.10)
- **Sistema de Email Profissional**: Integração completa com Resend para envio real de emails com fallback automático
- **LazyLoad Funcional**: Implementação real de lazy loading com Intersection Observer para melhor performance
- **Validação Backend Robusta**: Implementação de validação com Zod na API de contato
- **Qualidade de Código**: Linting reativado no build, auditoria de dependências e documentação de scripts
- **Documentação Completa**: Scripts customizados documentados e funcionalidades atualizadas

## 🛡️ Funcionalidades Avançadas

O site da Vista Nova implementa diversas funcionalidades avançadas para garantir desempenho, segurança e experiência do utilizador:

### Desempenho e Otimização
- **Lazy-loading** de componentes e imagens para carregamento otimizado
- **Image Optimization** com script personalizado para conversão para WebP
- **Vercel Analytics** para monitoramento de performance em tempo real
- **Caching inteligente** para recursos estáticos e dinâmicos (via `/optimized-assets/`)
- **Otimização manual** de imagens para maior controle sobre qualidade e tamanho
- **Código limpo de produção** sem logs de debug ou elementos de desenvolvimento

### Segurança e Proteção
- **reCAPTCHA v3** para proteção contra bots nos formulários
- **Proteção DDoS** para garantir disponibilidade mesmo sob ataques
- **File Route Path Protection** para controlo de acesso a recursos
- **Verificação SSL** para comunicação segura
- **Firewall** para filtragem de tráfego malicioso
- **Monitoramento de Erros e Performance** com Sentry para identificar e resolver problemas em tempo real

### Compliance e Privacidade
- **Gestão de Cookies GDPR** com Usercentrics para compliance total
- **Banner de consentimento** em português com categorização adequada
- **Política de cookies** completa baseada em análise técnica real
- **Integração respeitosa** com Google Analytics baseada em consentimento

## 🚀 Tecnologias Principais

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Estilização Principal**: [Tailwind CSS](https://tailwindcss.com/) com variáveis CSS
- **Estilização Avançada**: [styled-components](https://styled-components.com/) (casos específicos)
- **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/)
- **Tipagem**: [TypeScript](https://www.typescriptlang.org/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Ícones**: [Lucide Icons](https://lucide.dev/)
- **Formulários**: [React Hook Form](https://react-hook-form.com/)
- **Validação**: [Zod](https://zod.dev/)
- **E-mails**: [Resend](https://resend.com/) (com fallback Nodemailer)
- **Cookies/GDPR**: [Usercentrics](https://usercentrics.com/)
- **Segurança**: [reCAPTCHA v3](https://www.google.com/recaptcha/intro/)
- **Gerenciamento de Estado**: Context API
- **Gerenciamento de Erros e Performance**: [Sentry](https://sentry.io/)

## 🎨 Estratégia de Estilização

O projeto Vista Nova Web utiliza uma abordagem híbrida de estilização, combinando as vantagens de diferentes tecnologias:

### Tailwind CSS (Principal)

O [Tailwind CSS](https://tailwindcss.com/) é a solução principal de estilização, utilizada para:

- Layouts responsivos e componentes de UI padrão
- Espaçamentos, tipografia e cores consistentes
- Estilização rápida com classes utilitárias
- Componentes shadcn/ui (baseados em Tailwind)

### styled-components (Casos Específicos)

O [styled-components](https://styled-components.com/) é utilizado em casos específicos onde o Tailwind CSS apresenta limitações:

- Componentes com lógica de estilo complexa e dinâmica
- Estilos que dependem de múltiplas props ou estados
- Animações e transições avançadas
- Acesso programático ao sistema de tema para manipulações complexas
- Geração de CSS dinâmico baseado em lógica de negócio

### Diretrizes de Uso

1. **Priorize o Tailwind CSS** para a maioria dos componentes e layouts
2. **Use styled-components apenas quando necessário** para casos que exigem lógica de estilo complexa
3. **Mantenha a consistência** utilizando as mesmas variáveis de cores e espaçamentos em ambas as abordagens
4. **Documente claramente** quando e por que styled-components foi escolhido para um componente específico

### Utilitários de Integração

O projeto inclui utilitários que facilitam o uso consistente de cores e outros tokens de design em ambas as abordagens:

- `src/styles/utils/colors.ts`: Funções para acessar cores do tema em styled-components
- `src/styles/theme`: Sistema de tema compartilhado entre Tailwind e styled-components

## 🛠️ Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Primeiros Passos

1. Clone o repositório
2. Instale as dependências:
   ```bash
   yarn install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   yarn dev
   ```
4. Acesse [http://localhost:3000](http://localhost:3000)

### Scripts Úteis

#### Processamento de Imagens

1. **Otimizar todas as imagens**:
   ```bash
   yarn ts-node scripts/optimize-images.ts
   ```
   Este script irá:
   - Converter imagens JPG/JPEG/PNG para WebP com compressão otimizada
   - Redimensionar imagens grandes para um máximo de 1920px de largura
   - Manter a estrutura de diretórios original
   - Gerar as versões otimizadas em `public/optimized-assets/`

2. **Processar logos a partir dos arquivos SVG**:
   ```bash
   node scripts/process-logos-svg.js
   ```
   Este script irá:
   - Processar a logo horizontal a partir de `public/assets/brand/LOGO VISTA NOVA/LoGO Horizonta l 500 x 281.svg`
   - Processar o favicon a partir de `public/assets/brand/LOGO VISTA NOVA/Logo 1000 por 1000.svg`
   - Gerar as versões otimizadas em `public/assets/brand/processed/`

3. **Gerar favicon.ico**:
   ```bash
   node scripts/generate-favicon.js
   ```
   Gera o diretório `public/icons` na raiz do projeto.

#### Scripts de Manutenção e Validação

4. **Verificar uso de cores**:
   ```bash
   yarn ts-node scripts/check-colors.ts
   ```
   Este script irá:
   - Verificar se cores hardcoded estão sendo usadas no código
   - Validar se as cores estão de acordo com o sistema de design
   - Reportar possíveis inconsistências de cor

5. **Gerar ícones e favicons**:
   ```bash
   yarn ts-node scripts/generate-icons.ts
   ```
   Este script irá:
   - Gerar todos os favicons em diferentes tamanhos a partir do SVG
   - Criar ícones para Android, iOS e Windows
   - Gerar o arquivo `site.webmanifest` para PWA

6. **Baixar fontes locais**:
   ```bash
   yarn ts-node scripts/download-fonts.ts
   ```
   Este script irá:
   - Baixar as fontes Inter em formato WOFF2 para hospedagem local
   - Melhorar a performance eliminando requests externos
   - Garantir controle total sobre o carregamento de fontes

#### Notas Importantes

- A logo principal deve ser fornecida em formato SVG para melhor qualidade.
- O arquivo `LoGO Horizonta l 500 x 281.svg` é usado para o cabeçalho e rodapé do site.
- O arquivo `Logo 1000 por 1000.svg` é usado para gerar os favicons e ícones do site.
- Sempre execute o script de processamento após alterar os arquivos de origem.
- O diretório `public/assets/brand/processed/` é gerado automaticamente e não deve ser versionado.
- O diretório `public/optimized-assets/` contém imagens otimizadas e deve ser gerado antes do deploy.
- A otimização nativa do Next.js está desativada (`unoptimized: true` em `next.config.mjs`) em favor do nosso script personalizado.
- As imagens otimizadas são referenciadas com o prefixo `/optimized-assets/` em vez de `/assets/`.
- Execute regularmente o script `check-colors.ts` para manter a consistência visual
- Os scripts de manutenção garantem qualidade do código e otimização de assets

### Scripts Disponíveis

- `dev`: Inicia o servidor de desenvolvimento
- `build`: Cria uma build de produção
- `start`: Inicia o servidor de produção
- `lint`: Executa o ESLint
- `check-types`: Verifica os tipos TypeScript
- `format`: Formata o código com Prettier
- `analyze`: Analisa o bundle de produção (requer build primeiro)

## 📂 Estrutura do Projeto

- `/src/app`: Rotas e páginas do Next.js
- `/src/components`: Componentes reutilizáveis
- `/src/styles`: Estilos globais e temas
- `/src/lib`: Funções e utilitários
- `/public`: Arquivos estáticos (imagens, fonts, etc.)

## 📝 Documentação Adicional

### Documentação Principal
- [Otimizações e Features](./FEATURES.md) - Lista de funcionalidades implementadas e pendentes
- [Changelog](./CHANGELOG.md) - Histórico de alterações e versões

### Documentação Técnica
- [Estrutura do Projeto](./src/README.md) - Organização de diretórios e convenções
- [Sistema de Estilização](./src/styles/README.md) - Guia de estilização e sistema de cores
- [API de Contato](./src/app/api/contact/README.md) - Documentação da API de contato com Resend e reCAPTCHA v3

---

Desenvolvido com ❤️ por [Gustavo Falcão](https://github.com/gustavofalcao1) para [Vista Nova](https://vistanova.pt)
