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

### **Limitações do Localhost**
- ✅ **Usercentrics funciona em localhost** (diferente do Cookiebot)
- ✅ **Banner aparece normalmente**
- ⚠️ **Algumas funcionalidades podem estar limitadas**

### **Banner de Desenvolvimento**
Para casos onde o Usercentrics não carrega localmente, mantemos um banner de desenvolvimento que simula a funcionalidade.

## 🚨 Troubleshooting

### **Erro: Settings ID não válido**
```
Error: Cookie script tag ID U6pVKNVGxFbG1D is not a valid key.
```

**Soluções:**
1. ✅ **Verificar Settings ID**: Deve ter 10+ caracteres alfanuméricos
2. ✅ **Verificar no Dashboard**: Configuration → Implementation
3. ✅ **Verificar Domínio**: Adicionar `vistanova-web.vercel.app` na lista

### **Banner não aparece**
1. ✅ **Verificar variáveis**: Console logs mostram configuração
2. ✅ **Verificar domínio**: Deve estar registrado no Usercentrics
3. ✅ **Verificar rede**: Bloqueadores podem interferir

### **Google Analytics não funciona**
1. ✅ **Verificar consentimento**: Analytics só carrega após consent
2. ✅ **Verificar integração**: Event listeners para Usercentrics
3. ✅ **Verificar GA ID**: Deve estar configurado corretamente

## 🔍 Debug

### **Logs de Debug**
No console do browser, procure por:
```
🍪 Usercentrics Debug Info:
- Enabled: true
- Settings ID: U6pVKNVGxFbG1D
- Settings ID Length: 14
- Settings ID Format Valid: true
```

### **Eventos do Usercentrics**
```javascript
// Escutar eventos de consentimento
window.addEventListener('ucEvent', (event) => {
  console.log('Usercentrics event:', event);
});
```

## 📊 Funcionalidades

### **✅ Implementado**
- [x] Banner de consentimento GDPR
- [x] Integração com Google Analytics
- [x] Gestão de categorias de cookies
- [x] Suporte a português
- [x] Debug logs para desenvolvimento
- [x] Fallback para desenvolvimento local

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
1. Verificar logs de debug no console
2. Confirmar configuração no dashboard Usercentrics
3. Testar em modo incógnito
4. Verificar se não há bloqueadores de ads/cookies

---

**Nota**: Esta implementação substitui a anterior do Cookiebot, mantendo compatibilidade com as variáveis de ambiente existentes. 