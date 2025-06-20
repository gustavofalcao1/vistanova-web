# Configuração de Variáveis de Ambiente - Vista Nova

Este arquivo contém todas as variáveis de ambiente necessárias para o funcionamento completo do projeto Vista Nova.

## 📧 Sistema de Email (Resend)

```env
# API Key do Resend (obrigatória para envio real)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email de origem (remetente) - deve ser um domínio verificado no Resend
EMAIL_FROM=Vista Nova <noreply@vistanova.pt>

# Email para respostas (opcional, mas recomendado)
EMAIL_REPLY_TO=contato@vistanova.pt

# Email que receberá as mensagens do formulário de contato
CONTACT_FORM_RECIPIENT=contato@vistanova.pt
```

### 📝 Notas sobre Resend:
- **RESEND_API_KEY**: Obter em [resend.com](https://resend.com) → Dashboard → API Keys
- **EMAIL_FROM**: Deve usar um domínio verificado no Resend (ex: @vistanova.pt)
- Se não configurado, o sistema fará fallback para simulação
- Para testes locais, podes comentar RESEND_API_KEY para usar simulação

## 🛡️ reCAPTCHA v3 (Google)

```env
# Chave pública do site (visível no frontend)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxA

# Chave secreta (apenas no servidor)
RECAPTCHA_SECRET_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxA
```

### 📝 Notas sobre reCAPTCHA:
- **NEXT_PUBLIC_RECAPTCHA_SITE_KEY**: Chave pública, prefixo `NEXT_PUBLIC_` é obrigatório
- **RECAPTCHA_SECRET_KEY**: Chave privada, nunca expor no frontend
- Obter em [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
- Configurar para reCAPTCHA v3
- Adicionar domínios: `localhost`, `vistanova.pt`, `*.vercel.app`

## 🗺️ Google Maps

```env
# API Key para Google Maps (para o iframe/embed)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 📝 Notas sobre Google Maps:
- **NEXT_PUBLIC_GOOGLE_MAPS_API_KEY**: Chave pública para Maps
- Obter em [Google Cloud Console](https://console.cloud.google.com)
- Ativar APIs: Maps JavaScript API, Places API
- Configurar restrições de domínio por segurança

## 📊 Analytics e Monitoramento

```env
# Google Analytics 4 - Domínio principal
NEXT_PUBLIC_GA4_MEASUREMENT_ID_MAIN=G-XXXXXXXXXX

# Google Analytics 4 - Domínio de desenvolvimento/staging
NEXT_PUBLIC_GA4_MEASUREMENT_ID_DEV=G-YYYYYYYYYY

# Sentry (monitoramento de erros)
SENTRY_AUTH_TOKEN=your_sentry_auth_token_here
NEXT_PUBLIC_SENTRY_DSN=https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@o0000000.ingest.sentry.io/0000000
```

### 📝 Notas sobre Analytics:
- **GA4**: Dois códigos para ambientes diferentes (opcional)
- **Sentry**: Para monitoramento de erros e performance
- Configurar em [sentry.io](https://sentry.io)

## 🔧 Configurações Opcionais

```env
# Ambiente de execução
NODE_ENV=development
# ou NODE_ENV=production

# URL base do site (usado em sitemap e links absolutos)
SITE_URL=https://vistanova.pt
# ou SITE_URL=http://localhost:3000 (desenvolvimento)

# Vercel (configurações automáticas em deploy)
VERCEL_URL=your-project.vercel.app
VERCEL_ENV=development
```

## ✅ Verificação da Configuração

### Para Email (Resend):
1. ✅ **RESEND_API_KEY** está definida e começa com `re_`
2. ✅ **EMAIL_FROM** usa um domínio verificado no Resend
3. ✅ **CONTACT_FORM_RECIPIENT** é um email válido
4. ✅ Domínio está verificado no painel do Resend

### Para reCAPTCHA:
1. ✅ **NEXT_PUBLIC_RECAPTCHA_SITE_KEY** está definida e começa com `6L`
2. ✅ **RECAPTCHA_SECRET_KEY** está definida e começa com `6L`
3. ✅ Domínios estão configurados no painel do Google reCAPTCHA
4. ✅ Tipo é reCAPTCHA v3 (não v2)

### Para Google Maps:
1. ✅ **NEXT_PUBLIC_GOOGLE_MAPS_API_KEY** está definida
2. ✅ APIs necessárias estão ativadas no Google Cloud
3. ✅ Restrições de domínio estão configuradas

## 🚨 Resolução de Problemas Comuns

### Email não é enviado:
1. Verificar se RESEND_API_KEY está correta
2. Verificar se o domínio em EMAIL_FROM está verificado no Resend
3. Verificar logs do console para erros específicos
4. Testar primeiro com simulação (comentar RESEND_API_KEY)

### reCAPTCHA falha:
1. Verificar se as chaves estão corretas
2. Verificar se o domínio está autorizado
3. Verificar se é reCAPTCHA v3 (não v2)
4. Verificar se NEXT_PUBLIC_ está presente na chave pública

### Google Maps não carrega:
1. Verificar se a API está ativada
2. Verificar se há créditos suficientes na conta Google Cloud
3. Verificar restrições de domínio

## 📁 Arquivo .env.local de Exemplo

Criar arquivo `.env.local` na raiz do projeto com as variáveis acima:

```bash
# Vista Nova - Environment Variables
# Copiar as variáveis necessárias de cima e preencher com valores reais
```

## 🔒 Segurança

- ✅ **Nunca** commitar `.env.local` no Git
- ✅ `.env.local` está no `.gitignore`
- ✅ Chaves secretas (sem NEXT_PUBLIC_) nunca no frontend
- ✅ Configurar restrições de domínio nas APIs
- ✅ Rotacionar chaves regularmente em produção

---

**📅 Última atualização:** 06/01/2025  
**�� Versão:** 2.2.10 