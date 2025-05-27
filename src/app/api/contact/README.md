# Sistema de Contato

Este diretório contém a implementação da API de contato do site Vista Nova.

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Configurações de E-mail
EMAIL_SERVER_HOST=smtp.seu-provedor.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_SECURE=false
EMAIL_SERVER_USER=seu-email@exemplo.com
EMAIL_SERVER_PASSWORD=sua-senha
EMAIL_FROM=noreply@vistanova.pt
EMAIL_REPLY_TO=contato@vistanova.pt
CONTACT_FORM_RECIPIENT=contato@vistanova.pt

# Configurações do reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=sua_chave_do_site_aqui
RECAPTCHA_SECRET_KEY=sua_chave_secreta_aqui
```

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

1. O usuário preenche o formulário de contato
2. O frontend valida os campos obrigatórios
3. O reCAPTCHA v3 é executado em segundo plano
4. Os dados são enviados para a rota `/api/contact`
5. O servidor valida o token do reCAPTCHA
6. A limitação de taxa é verificada
7. O e-mail é enviado usando o Nodemailer
8. O usuário recebe feedback sobre o status do envio

### Limitações de Taxa

- Máximo de 5 requisições a cada 15 minutos por endereço IP
- Respostas com status 429 são retornadas quando o limite é excedido

## Testes

Para testar o sistema de contato localmente:

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
