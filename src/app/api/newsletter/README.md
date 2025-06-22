# API de Newsletter

Esta API é responsável pelo processamento de inscrições na newsletter da Vista Nova, separada da API de contato para melhor organização e funcionalidade específica.

## Endpoint

`POST /api/newsletter`

## Funcionalidade

- Processa inscrições na newsletter de forma independente do formulário de contato
- Verifica tokens reCAPTCHA v3 para proteção contra spam
- **Envia 2 emails automaticamente**:
  1. Email de boas-vindas para o novo subscritor
  2. Email de notificação para `marketing@vistanova.pt`
- Valida dados usando schema Zod específico para newsletter

## Parâmetros

```json
{
  "email": "user@example.com",
  "name": "Nome do Utilizador (opcional)",
  "consent": true,
  "recaptchaToken": "token_recaptcha_v3"
}
```

## Validação

- **email**: Obrigatório, deve ser um email válido
- **name**: Opcional, mínimo 2 caracteres se fornecido
- **consent**: Obrigatório, deve ser `true`
- **recaptchaToken**: Verificado com Google reCAPTCHA v3

## Resposta de Sucesso

```json
{
  "success": true,
  "message": "Inscrição realizada com sucesso!",
  "messageId": "resend_message_id_welcome_email",
  "notificationSent": true
}
```

**Nota**: O campo `notificationSent` indica se o email de notificação para marketing foi enviado com sucesso. O processo não falha se apenas o email de notificação falhar, garantindo que o utilizador sempre receba confirmação da sua inscrição.

## Resposta de Erro

```json
{
  "success": false,
  "error": "Descrição do erro",
  "details": ["detalhes específicos (apenas em desenvolvimento)"]
}
```

## Separação de Responsabilidades

Esta API foi criada para separar claramente:

- **Newsletter**: Inscrições e email de boas-vindas (esta API)
- **Contato**: Mensagens de contato para a empresa (API `/api/contact`)

## Configuração

As mesmas variáveis de ambiente da API de contato são utilizadas:

- `RESEND_API_KEY`
- `RECAPTCHA_SECRET_KEY`
- `EMAIL_FROM`
- `EMAIL_REPLY_TO`

## Diferenças da API de Contato

1. **Função específica**: Apenas newsletter, sem misturas
2. **Duplo envio**: 
   - Email de boas-vindas para o utilizador
   - Email de notificação para marketing@vistanova.pt
3. **Dados processados**: Apenas email, nome (opcional) e consentimento
4. **Validação**: Schema específico para newsletter
5. **Mensagem padrão**: "Deseja receber a newsletter: Sim"

---

📅 *Criado: 19/01/2025* 