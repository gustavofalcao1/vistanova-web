# Vista Nova - Website

Website institucional profissional para a Vista Nova, construído com tecnologias modernas para garantir desempenho, acessibilidade e manutenibilidade.

## 📌 Status do Projeto

**Versão Atual:** 2.1.3  
**Status:** Em desenvolvimento ativo  
**Próxima Versão Estável:** 2.2.X (Planejada para produção)

### Versionamento
- **2.x.x**: Melhorias e manutenção do site atual
- **x.1.x**: Versão em produção (MVP validado)
- **x.x.3**: Terceira iteração de desenvolvimento

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

1. **Verificar transparência de uma imagem**:
   ```bash
   node scripts/check-transparency.js
   ```

2. **Remover fundo branco da logo principal**:
   ```bash
   node scripts/remove-background.js
   ```
   A imagem processada será salva em `public/assets/brand/processed/logo-transparent.png`.

3. **Gerar favicons a partir da imagem 5.png**:
   ```bash
   node scripts/generate-favicons.js
   ```
   Os favicons serão gerados no diretório `public/favicon/`.

4. **Processar a logo principal (3_2.png)**:
   ```bash
   node scripts/process-logo.js
   ```
   A imagem processada será salva em `public/assets/brand/processed/logo-default.png`.

#### Notas Importantes

- A logo principal (3_2.png) deve ser usada para o cabeçalho do site.
- A imagem 5.png é usada para gerar os favicons e ícones do site.
- Sempre execute os scripts de geração de favicons após alterar a imagem de origem.
- Os diretórios `public/favicon/` e `public/assets/brand/processed/` são gerados automaticamente e não devem ser versionados.

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
