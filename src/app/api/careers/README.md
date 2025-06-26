# API de Candidaturas de Emprego

Esta API é responsável pelo processamento de candidaturas de emprego da Vista Nova, com suporte completo a anexos de CV.

## Endpoint

`POST /api/careers`

## Funcionalidade

- Processa candidaturas de emprego com upload de CV
- Suporta anexos PDF e Word até 5MB
- Verifica tokens reCAPTCHA v3 para proteção contra spam
- Envia email com CV em anexo usando Resend
- Validação completa de dados do formulário

## Parâmetros (FormData)

```javascript
const formData = new FormData();
formData.append('name', 'Nome Completo');
formData.append('email', 'email@exemplo.com');
formData.append('phone', '+351 9XX XXX XXX');
formData.append('position', 'especialista-credito');
formData.append('experience', '3-5');
formData.append('motivation', 'Carta de motivação...');
formData.append('availability', 'immediate');
formData.append('linkedin', 'https://linkedin.com/in/...');
formData.append('consent', 'true');
formData.append('cv', fileObject); // File object
formData.append('recaptchaToken', 'token_recaptcha_v3');
```

## Validação

### Campos Obrigatórios
- **name**: Mínimo 2 caracteres
- **email**: Email válido
- **phone**: Mínimo 9 dígitos
- **position**: Uma das opções válidas
- **experience**: Nível de experiência
- **motivation**: Mínimo 50 caracteres
- **availability**: Disponibilidade
- **consent**: Deve ser 'true'
- **cv**: Ficheiro PDF, máximo 5MB

### Campos Opcionais
- **linkedin**: URL do LinkedIn (opcional)

### Validação de Ficheiros
- **Formatos aceites**: PDF (.pdf)
- **Tamanho máximo**: 5MB
- **Obrigatório**: Sim

## Resposta de Sucesso

```json
{
  "success": true,
  "message": "Candidatura enviada com sucesso!",
  "messageId": "resend_message_id"
}
```

## Resposta de Erro

```json
{
  "success": false,
  "error": "Descrição do erro",
  "details": ["detalhes específicos (apenas em desenvolvimento)"]
}
```

## Erros Comuns

- **400 Bad Request**: Dados inválidos ou ficheiro inválido
- **500 Internal Server Error**: Erro no servidor ou falha no envio do email

## Funcionalidades Especiais

### Suporte a Anexos (Conforme Documentação Resend)
- Converte ficheiros para Base64 para compatibilidade com Resend
- Valida tamanho total do email (limite Resend: 40MB)
- Aceita apenas ficheiros PDF para currículos
- Inclui informações do ficheiro no email

### Email Profissional
O email enviado inclui:
- Dados pessoais organizados
- Informações profissionais
- Carta de motivação formatada
- CV em anexo
- Reply-to configurado para o email do candidato

### Fallback para Desenvolvimento
- Se `RESEND_API_KEY` não estiver configurada, simula o envio
- Útil para desenvolvimento local sem configurar Resend

## Configuração

Utiliza as mesmas variáveis de ambiente das outras APIs:

```env
RESEND_API_KEY=sua_chave_resend
EMAIL_FROM=VISTA NOVA <noreply@vistanova.pt>
CONTACT_FORM_RECIPIENT=rh@vistanova.pt
RECAPTCHA_SECRET_KEY=sua_chave_secreta_recaptcha
```

## Diferenças da API de Contato

1. **Suporte a anexos**: Upload de CV com validação
2. **FormData**: Aceita multipart/form-data em vez de JSON
3. **Validação específica**: Schema dedicado para candidaturas
4. **Email formatado**: Template específico para RH
5. **Campos profissionais**: Posição, experiência, disponibilidade

## Segurança

- Validação de tipo MIME para prevenir uploads maliciosos
- Limite de tamanho de ficheiro (5MB)
- reCAPTCHA v3 para proteção contra bots
- Validação Zod para todos os campos

## Exemplo de Uso

```javascript
const handleCareerSubmit = async (formData) => {
  const response = await fetch('/api/careers', {
    method: 'POST',
    body: formData, // FormData object
  });

  const result = await response.json();
  
  if (result.success) {
    console.log('Candidatura enviada!', result.messageId);
  } else {
    console.error('Erro:', result.error);
  }
};
```

---

📅 *Criado: 01/06/2025* 