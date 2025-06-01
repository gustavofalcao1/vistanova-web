# Vista Nova - Website

Website institucional profissional para a Vista Nova, construído com tecnologias modernas para garantir desempenho, acessibilidade e manutenibilidade.

## 📌 Status do Projeto

**Versão Atual:** 2.2.6  
**Status:** Em desenvolvimento ativo  
**Próxima Versão Estável:** 2.3.X (Planejada para produção)

### Versionamento
- **2.x.x**: Melhorias e manutenção do site atual
- **x.2.x**: Versão em produção (versão estável)
- **x.x.6**: Sexta iteração de desenvolvimento

### Melhorias Recentes (v2.2.6)
- Correção do link "Fala Connosco" para navegação correta em todas as páginas
- Ajuste da responsividade no header para melhor visualização em tablets
- Padronização das cores nos títulos de seção para maior consistência visual
- Ajuste do tamanho da logo no header para diferentes tamanhos de tela
- Melhoria na exibição do menu móvel em dispositivos de tamanho médio

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
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) com variáveis CSS
- **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/)
- **Tipagem**: [TypeScript](https://www.typescriptlang.org/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Ícones**: [Lucide Icons](https://lucide.dev/)
- **Formulários**: [React Hook Form](https://react-hook-form.com/)
- **Validação**: [Zod](https://zod.dev/)
- **E-mails**: [Nodemailer](https://nodemailer.com/)
- **Segurança**: [reCAPTCHA v3](https://www.google.com/recaptcha/intro/)
- **Gerenciamento de Estado**: Context API

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

- [Otimizações e Features](./FEATURES.md)

---

Desenvolvido com ❤️ por [Seu Nome] para Vista Nova
