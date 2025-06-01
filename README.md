# Vista Nova - Website

Website institucional profissional para a Vista Nova, construído com tecnologias modernas para garantir desempenho, acessibilidade e manutenibilidade.

## 📌 Status do Projeto

**Versão Atual:** 2.2.8  
**Status:** Em desenvolvimento ativo  
**Próxima Versão Estável:** 2.3.X (Planejada para produção)

### Versionamento
- **2.x.x**: Melhorias e manutenção do site atual
- **x.2.x**: Versão em produção (versão estável)
- **x.x.8**: Oitava iteração de desenvolvimento

### Melhorias Recentes (v2.2.8)
- Implementação do Google Analytics 4 com deteção automática de domínio para múltiplos códigos de medição
- Migração para a integração oficial do Google Analytics via `@next/third-parties`
- Consolidação e clarificação da estrutura de tipos TypeScript
- Reorganização dos componentes de analytics para maior consistência
- Atualização da documentação com estrutura de diretórios e organização de tipos
- Otimização de `useEffect` em vários componentes para prevenir re-renders desnecessários

## 🛡️ Funcionalidades Avançadas

O site da Vista Nova implementa diversas funcionalidades avançadas para garantir desempenho, segurança e experiência do utilizador:

### Desempenho e Otimização
- **Lazy-loading** de componentes e imagens para carregamento otimizado
- **Image Optimization** com script personalizado para conversão para WebP
- **Vercel Analytics** para monitoramento de performance em tempo real
- **Caching inteligente** para recursos estáticos e dinâmicos (via `/optimized-assets/`)
- **Otimização manual** de imagens para maior controle sobre qualidade e tamanho

### Segurança e Proteção
- **reCAPTCHA v3** para proteção contra bots nos formulários
- **Proteção DDoS** para garantir disponibilidade mesmo sob ataques
- **File Route Path Protection** para controlo de acesso a recursos
- **Verificação SSL** para comunicação segura
- **Firewall** para filtragem de tráfego malicioso

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
- **E-mails**: [Nodemailer](https://nodemailer.com/)
- **Segurança**: [reCAPTCHA v3](https://www.google.com/recaptcha/intro/)
- **Gerenciamento de Estado**: Context API

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

#### Notas Importantes

- A logo principal deve ser fornecida em formato SVG para melhor qualidade.
- O arquivo `LoGO Horizonta l 500 x 281.svg` é usado para o cabeçalho e rodapé do site.
- O arquivo `Logo 1000 por 1000.svg` é usado para gerar os favicons e ícones do site.
- Sempre execute o script de processamento após alterar os arquivos de origem.
- O diretório `public/assets/brand/processed/` é gerado automaticamente e não deve ser versionado.
- O diretório `public/optimized-assets/` contém imagens otimizadas e deve ser gerado antes do deploy.
- A otimização nativa do Next.js está desativada (`unoptimized: true` em `next.config.mjs`) em favor do nosso script personalizado.
- As imagens otimizadas são referenciadas com o prefixo `/optimized-assets/` em vez de `/assets/`.

- `dev`: Inicia o servidor de desenvolvimento
- `build`: Cria uma build de produção
- `start`: Inicia o servidor de produção
- `lint`: Executa o ESLint
- `check-types`: Verifica os tipos TypeScript
- `format`: Formata o código com Prettier

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
