# 🔍 Debug de Problemas de Email - Vista Nova

Este guia ajuda a diagnosticar e resolver problemas com o sistema de email.

## 🚨 Problema Crítico Corrigido

**IMPORTANTE**: Encontrei e corrigi um erro crítico na API que estava a ignorar falhas de envio!

### O que estava errado:
- A API sempre retornava sucesso, mesmo quando o email falhava
- Não verificava se `result.success` era verdadeiro
- Logging inadequado para debugging

### O que foi corrigido:
- ✅ API agora verifica se o email foi enviado com sucesso
- ✅ Retorna erro apropriado se o envio falhar
- ✅ Logging melhorado com detalhes do erro
- ✅ Informações de debug no ambiente de desenvolvimento

## 🔧 Passos para Debug

### 1. Verificar Logs do Console

Abre o **DevTools** do browser (F12) e verifica a aba **Console**:

```javascript
// Logs esperados quando tudo funciona:
📧 Email sent successfully via Resend: { messageId: "...", to: "...", subject: "..." }
Resultado do envio de email: { success: true, messageId: "...", simulated: false }

// Logs quando há problemas:
RESEND_API_KEY not set. Falling back to email simulation.
📧 Email simulation: { ... }
Resultado do envio de email: { success: true, messageId: "sim_...", simulated: true }

// Logs quando há erro real:
Resend error: { ... }
Falha no envio de email: "..."
```

### 2. Verificar Network Tab

Na aba **Network** do DevTools:

1. Filtrar por `contact`
2. Enviar formulário
3. Verificar resposta da requisição POST `/api/contact`

**Resposta de sucesso:**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso!",
  "messageId": "re_abc123..."
}
```

**Resposta de erro:**
```json
{
  "success": false,
  "error": "Erro ao enviar a mensagem...",
  "details": "..."
}
```

### 3. Testar Modo Simulação

Para testar se o problema é com o Resend ou com o código:

1. **Comentar** a linha no `.env.local`:
   ```env
   # RESEND_API_KEY=re_...
   ```

2. Reiniciar o servidor (`yarn dev`)

3. Tentar enviar email novamente

**Se funcionar em simulação:** Problema é com configuração do Resend
**Se não funcionar:** Problema é no código/validação

### 4. Verificar Configuração do Resend

Aceder ao [painel do Resend](https://resend.com):

1. **API Keys**: Verificar se a chave está ativa
2. **Domains**: Verificar se o domínio está verificado
3. **Logs**: Verificar tentativas de envio
4. **Quotas**: Verificar se não ultrapassou limites

## 🐛 Problemas Comuns e Soluções

### Email em Simulação (não enviado de verdade)

**Sintomas:**
- Logs mostram `simulated: true`
- MessageId começa com `sim_`

**Causa:** `RESEND_API_KEY` não está definida ou inválida

**Solução:**
1. Verificar se `RESEND_API_KEY` está no `.env.local`
2. Verificar se a chave é válida (começa com `re_`)
3. Reiniciar o servidor após alterar env

### Erro: "Missing API key"

**Sintomas:**
- Build/runtime falha
- Erro no console sobre API key

**Causa:** Resend está a ser inicializado sem chave

**Solução temporária:**
```env
# Adicionar ao .env.local para desenvolvimento
RESEND_API_KEY=dummy_key_for_dev
```

### Erro: "Domain not verified"

**Sintomas:**
- Erro do Resend sobre domínio
- Email rejeitado

**Solução:**
1. Verificar domínio no painel Resend
2. Usar domínio verificado em `EMAIL_FROM`
3. Ou usar email de teste do Resend

### reCAPTCHA sempre falha

**Sintomas:**
- "Falha na verificação de segurança"
- reCAPTCHA score baixo

**Solução:**
1. Verificar chaves do reCAPTCHA
2. Verificar domínio autorizado
3. Testar com `RECAPTCHA_SECRET_KEY` comentada (dev only)

## 🧪 Comandos de Teste

### Testar envio direto (Terminal)

```bash
# Testar se o servidor recebe requisições
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "test@example.com", 
    "message": "Mensagem de teste",
    "consent": true
  }'
```

### Verificar variáveis de ambiente

```bash
# No terminal do projeto
node -e "console.log(process.env.RESEND_API_KEY ? 'Resend OK' : 'Resend Missing')"
node -e "console.log(process.env.EMAIL_FROM || 'EMAIL_FROM not set')"
```

## 📋 Checklist de Verificação

### Antes de enviar o primeiro email:

- [ ] `RESEND_API_KEY` está definida no `.env.local`
- [ ] A chave começa com `re_` e tem 32+ caracteres
- [ ] `EMAIL_FROM` usa domínio verificado no Resend
- [ ] Domínio está verificado no painel Resend
- [ ] `CONTACT_FORM_RECIPIENT` é um email válido
- [ ] reCAPTCHA está configurado (ou comentado para teste)
- [ ] Servidor foi reiniciado após alterar `.env.local`

### Para debug:

- [ ] DevTools aberto para ver logs
- [ ] Network tab para ver requisições
- [ ] Verificar painel do Resend para logs
- [ ] Testar com simulação primeiro
- [ ] Verificar quota/limites do Resend

## 🆘 Se nada funcionar

1. **Comentar todas as env do email** e testar simulação
2. **Criar conta nova no Resend** com domínio diferente
3. **Usar email de teste** do Resend (onboarding@resend.dev)
4. **Verificar logs do servidor** (`yarn dev` verbose)
5. **Contactar suporte do Resend** se problema persistir

---

**📅 Criado:** 06/01/2025  
**🔖 Versão:** 2.2.10  
**🔧 Status:** Problema crítico corrigido 