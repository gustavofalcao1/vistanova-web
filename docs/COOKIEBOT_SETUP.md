# Configuração do Cookiebot - Vista Nova

Este documento explica como configurar o Cookiebot no projeto Vista Nova.

## 🍪 Variáveis de Ambiente Necessárias

Adicione as seguintes variáveis ao seu arquivo `.env.local`:

```bash
# Cookiebot Configuration
NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID="your-cookiebot-domain-id-here"
NEXT_PUBLIC_COOKIEBOT_ENABLED="true"

# Google Analytics (integra com Cookiebot)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=seu-ga-id-aqui
```

## 📋 Como Obter o Domain ID

1. **Aceda à sua conta Cookiebot** em https://www.cookiebot.com/
2. **Vá para "Domains"** no painel de controlo
3. **Selecione o seu domínio** (vistanova.pt)
4. **Copie o "Domain ID"** que aparece no código de implementação

## ⚙️ Configuração no Cookiebot Dashboard

### 1. Configurações Básicas
- **Nome do site**: Vista Nova
- **URL**: https://vistanova.pt
- **Idioma principal**: Português (PT)
- **Modo de bloqueio**: Automático

### 2. Categorias de Cookies
Configure as seguintes categorias no seu dashboard:

#### 🔧 Estritamente Necessários
- **Descrição**: Cookies essenciais para o funcionamento do website
- **Sempre ativos**: Sim

#### 📊 Estatísticas
- **Descrição**: Google Analytics e métricas de performance
- **Cookies incluídos**: 
  - `_ga` (Google Analytics)
  - `_ga_*` (Google Analytics 4)

#### 🎯 Marketing
- **Descrição**: Cookies para publicidade e marketing direcionado
- **Cookies incluídos**: (configurar conforme necessário)

### 3. Texto Legal
Certifique-se de que o texto da política de cookies está alinhado com o documento jurídico fornecido pelo advogado.

## 🔧 Implementação Técnica

### Componentes Criados:
1. **`/src/components/analytics/cookiebot.tsx`** - Script principal do Cookiebot
2. **`/src/components/ui/cookie-declaration.tsx`** - Declaração de cookies para a página de política
3. **Google Analytics integrado** - Respeita o consentimento de cookies

### Integração:
- ✅ Banner de consentimento automático
- ✅ Integração com Google Analytics
- ✅ Página de política de cookies completa
- ✅ Declaração de cookies dinâmica

## 🧪 Testes

### Ambiente de Desenvolvimento:
```bash
# Habilitar Cookiebot em desenvolvimento
NEXT_PUBLIC_COOKIEBOT_ENABLED="true"
NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID="your-domain-id"
```

### Verificações:
1. **Banner aparece** na primeira visita
2. **Google Analytics só carrega** após consentimento
3. **Página de política** exibe declaração dinâmica
4. **Configurações persistem** entre sessões

## 🚀 Deploy em Produção

### Vercel:
1. Aceda às **Environment Variables** no dashboard Vercel
2. Adicione as variáveis do Cookiebot
3. **Redeploy** o projeto

### Verificação Pós-Deploy:
- [ ] Banner funciona em `vistanova.pt`
- [ ] Política de cookies carrega corretamente
- [ ] Google Analytics respeita consentimento
- [ ] Declaração de cookies atualiza automaticamente

## 🚀 Desenvolvimento Local

### ⚠️ Problema Comum: Banner não aparece em localhost

O Cookiebot **NÃO funciona em localhost** por questões de segurança. Você verá este erro:

```
GET https://consentcdn.cookiebot.com/consentconfig//localhost/configuration.js net::ERR_ABORTED 404 (Not Found)
```

### ✅ Solução: Banner de Desenvolvimento

Foi criado um componente especial para desenvolvimento local (`CookiebotDev`) que:

1. **Simula o banner** em localhost
2. **Salva consentimento** no localStorage
3. **Dispara eventos** como o Cookiebot real
4. **Permite testes** de integração local

### Como Usar em Desenvolvimento:

1. **Inicie o servidor**:
   ```bash
   npm run dev
   ```

2. **Acesse localhost:3000** - você verá:
   - Banner com `[MODO DE DESENVOLVIMENTO]`
   - Logs no console com 🍪
   - Opções para testar consentimento

3. **Teste as funcionalidades**:
   ```javascript
   // No console do browser:
   window.resetCookieConsent() // Reset para testar novamente
   ```

4. **Verifique os logs**:
   ```
   🍪 Cookiebot Debug Info:
   - Enabled: true
   - Domain ID: NOT_SET (normal em dev)
   - Current hostname: localhost
   ```

## 🧪 Testing

### Teste Local (Development):
- ✅ Banner de desenvolvimento aparece
- ✅ Consentimento salvo no localStorage
- ✅ Google Analytics respeita consentimento
- ✅ Logs de debug no console

### Teste Produção:
- ✅ Banner real do Cookiebot
- ✅ Configuração carregada do servidor
- ✅ Compliance GDPR completo
- ✅ Integração com Analytics

## 📊 Integração com Google Analytics

O Google Analytics só carrega **após consentimento** para cookies de estatística:

```typescript
// Só carrega GA se o usuário consentir
if (consent.statistics) {
  // Google Analytics ativo
}
```

## 🔍 Troubleshooting

### 1. Banner não aparece (Produção)
```bash
# Verifique as variáveis
echo $NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID
echo $NEXT_PUBLIC_COOKIEBOT_ENABLED
```

### 2. Erro 404 em localhost
- ✅ **Normal** - Use o banner de desenvolvimento
- ✅ Verifique se `CookiebotDev` está no layout

### 3. Domain ID vazio
```javascript
// Console mostra: Domain ID: NOT_SET
// Solução: Configure NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID no .env.local
```

### 4. Analytics não carrega
- ✅ Verifique se aceitou cookies de estatística
- ✅ Confirme NEXT_PUBLIC_GOOGLE_ANALYTICS_ID configurado

## 📝 Implementação

### Componentes:
1. **`Cookiebot.tsx`** - Componente principal (produção)
2. **`CookiebotDev.tsx`** - Banner de desenvolvimento
3. **`GoogleAnalytics.tsx`** - Integração com consentimento
4. **`CookieDeclaration.tsx`** - Tabela de cookies na política

### Arquivos modificados:
- `src/app/layout.tsx` - Integração no layout
- `src/config/env.ts` - Variáveis de ambiente
- `src/app/(pages)/politica-de-cookies/page.tsx` - Página da política

## 🚀 Deploy

### Antes do deploy:
1. ✅ Configure Domain ID real no .env
2. ✅ Adicione domínio no dashboard Cookiebot
3. ✅ Teste em staging primeiro
4. ✅ Verifique compliance GDPR

### Pós-deploy:
1. ✅ Confirme banner aparecer
2. ✅ Teste aceitação/rejeição
3. ✅ Verifique Analytics funcionar
4. ✅ Teste política de cookies

## 📞 Suporte

Para questões sobre a implementação do Cookiebot:
- **Documentação Cookiebot**: https://www.cookiebot.com/en/developer/
- **Suporte técnico**: suporte@vistanova.pt

---

✅ **Status**: Pronto para implementação
📅 **Última atualização**: Janeiro 2025 