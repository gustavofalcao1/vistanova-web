# Sistema de Contato

Este diretório contém a implementação da API de contato do site Vista Nova, utilizando Resend para envio de e-mails e reCAPTCHA v3 para proteção contra spam.

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do Resend
RESEND_API_KEY=sua_chave_api_resend
EMAIL_FROM=noreply@vistanova.pt
EMAIL_REPLY_TO=contato@vistanova.pt
CONTACT_FORM_RECIPIENT=contato@vistanova.pt

# Configurações do reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=sua_chave_do_site_aqui
RECAPTCHA_SECRET_KEY=sua_chave_secreta_aqui
```

### Configuração do Resend

1. Acesse o [Resend](https://resend.com)
2. Crie uma conta ou faça login
3. Navegue até a seção de API Keys
4. Crie uma nova API Key
5. Copie a chave gerada para a variável de ambiente `RESEND_API_KEY`
6. Configure seu domínio para envio de e-mails (opcional, mas recomendado para produção)

### Configuração do reCAPTCHA

1. Acesse o [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Registre um novo site
3. Escolha o tipo "reCAPTCHA v3"
4. Adicione seu domínio (ex: `vistanova.pt`, `localhost` para desenvolvimento)
5. Copie as chaves geradas para as variáveis de ambiente
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Chave do site (pública)
   - `RECAPTCHA_SECRET_KEY`: Chave secreta (mantenha em segredo)

## Como Funciona

### Fluxo de Envio

1. O utilizador preenche o formulário de contacto
2. O frontend valida os campos obrigatórios
3. O reCAPTCHA v3 é executado em segundo plano
4. Os dados são enviados para a rota `/api/contact`
5. O servidor valida o token do reCAPTCHA
6. A limitação de taxa é verificada
7. O e-mail é enviado usando a API do Resend
8. O utilizador recebe feedback sobre o status do envio

### Limitações de Taxa

Para evitar abuso da API de contacto, implementamos limitações de taxa:

- Máximo de 5 solicitações por endereço IP a cada 15 minutos
- Máximo de 3 solicitações por endereço de e-mail a cada 30 minutos
- Respostas com status 429 são retornadas quando o limite é excedido
- Bloqueio temporário após exceder os limites

## Implementação

### Dependências

```bash
npm install resend @vercel/ratelimit
# ou
yarn add resend @vercel/ratelimit
```

### Código da API

A implementação utiliza:

- **Resend**: Para envio de e-mails confiável e rastreamento
- **reCAPTCHA v3**: Para proteção contra bots
- **Vercel Rate Limit**: Para limitação de taxa
- **Zod**: Para validação de dados

### Vantagens do Resend

- **Confiabilidade**: Alta taxa de entrega
- **Rastreamento**: Estatísticas de abertura e cliques
- **Templates**: Suporte a templates HTML responsivos
- **Webhooks**: Notificações de eventos (entrega, abertura, etc.)
- **API Moderna**: Integração simples com Next.js
- **Dashboard**: Interface para monitoramento de e-mails

## Testes

Para testar o sistema de contacto localmente:

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
2. Acesse a página de contato
3. Preencha o formulário e envie
4. Verifique o console do servidor para logs de depuração
5. Verifique sua caixa de entrada para o e-mail de confirmação

## Solução de Problemas

### E-mails não estão sendo enviados

- Verifique as configurações do servidor SMTP
- Confirme se as variáveis de ambiente estão corretas
- Verifique a pasta de spam

### Erro de reCAPTCHA

- Confirme se as chaves do reCAPTCHA estão corretas
- Verifique se o domínio está configurado corretamente no painel do reCAPTCHA

### Limite de taxa excedido

- Aguarde 15 minutos ou altere o IP para continuar testando
- Ajuste as configurações em `src/middleware/rateLimit.ts` se necessário

---

📅 *Última atualização: 01/06/2025*
