# Configuração Usercentrics - Vista Nova

Este documento descreve como configurar o Usercentrics para gestão de cookies GDPR no projeto Vista Nova.

## 📋 Pré-requisitos

1. Conta no Usercentrics: https://usercentrics.com/
2. Settings ID obtido no dashboard
3. Configuração das variáveis de ambiente

## 🔧 Configuração

### 1. Variáveis de Ambiente

Adicione ao seu arquivo `.env.local`:

```env
# Usercentrics Configuration
NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID=U6pVKNVGxFbG1D
NEXT_PUBLIC_COOKIEBOT_ENABLED=true

# Google Analytics (integra com Usercentrics)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=seu-ga-id-aqui
```

**Nota**: Mantemos o nome `COOKIEBOT_DOMAIN_ID` por compatibilidade, mas agora contém o **Settings ID do Usercentrics**.

### 2. Dashboard do Usercentrics

1. Acesse: https://admin.usercentrics.eu/
2. Vá para **Configuration** → **Implementation**
3. Configure:
   - **Language**: Portuguese (Portugal)
   - **Blocking Mode**: Automatic
   - **Categories**: Essential, Functional, Marketing, Preferences
   - **Services**: Google Analytics, etc.

### 3. Configuração no Vercel

No **Vercel Dashboard**:
1. Vá para **Settings** → **Environment Variables**
2. Adicione:
   ```
   NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID = U6pVKNVGxFbG1D
   NEXT_PUBLIC_COOKIEBOT_ENABLED = true
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = seu-ga-id
   ```

## 🧪 Desenvolvimento Local

### **Funcionalidade em Localhost**
- ✅ **Usercentrics funciona em localhost** (diferente do Cookiebot)
- ✅ **Banner aparece normalmente**
- ✅ **Todas as funcionalidades disponíveis**

## 🚨 Troubleshooting

### **Banner não aparece**
1. ✅ **Verificar variáveis**: Confirmar se estão configuradas
2. ✅ **Verificar domínio**: Deve estar registrado no Usercentrics
3. ✅ **Verificar rede**: Bloqueadores podem interferir

### **Google Analytics não funciona**
1. ✅ **Verificar consentimento**: Analytics só carrega após consent
2. ✅ **Verificar integração**: Event listeners para Usercentrics
3. ✅ **Verificar GA ID**: Deve estar configurado corretamente

## 📊 Funcionalidades

### **✅ Implementado**
- [x] Banner de consentimento GDPR
- [x] Integração com Google Analytics
- [x] Gestão de categorias de cookies
- [x] Suporte a português
- [x] Código limpo de produção

### **🔄 Integração com Google Analytics**
- Carrega apenas após consentimento
- Usa Consent Mode v2
- Event listeners para mudanças de consentimento
- Suporte a múltiplos domínios

## 🚀 Deploy

### **Checklist de Deploy**
1. ✅ Configurar variáveis no Vercel
2. ✅ Verificar Settings ID no Usercentrics
3. ✅ Adicionar domínio de produção
4. ✅ Testar banner em produção
5. ✅ Verificar Google Analytics

### **Variáveis de Produção**
```env
NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID=U6pVKNVGxFbG1D
NEXT_PUBLIC_COOKIEBOT_ENABLED=true
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## 📞 Suporte

Em caso de problemas:
1. Verificar configuração no dashboard Usercentrics
2. Testar em modo incógnito
3. Verificar se não há bloqueadores de ads/cookies

---

**Nota**: Esta implementação mantém compatibilidade com as variáveis de ambiente existentes, mas o código interno foi limpo e otimizado para produção. 