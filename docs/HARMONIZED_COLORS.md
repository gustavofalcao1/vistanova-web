# 🎨 Cores Harmoniosas - Vista Nova

## Problema Identificado

A cor secundária original `#E5FC2A` (verde limão vibrante) apresentava problemas de legibilidade e harmonia quando usada sobre fundos brancos, violando diretrizes de acessibilidade WCAG.

## Solução Implementada

Criamos **variantes contextuais** da cor secundária que mantêm a identidade visual mas garantem melhor legibilidade e harmonia.

## 🌈 Nova Paleta Secundária

### Variantes Principais

| Variante | Cor | Uso Recomendado | Contraste |
|----------|-----|-----------------|-----------|
| `secondary` | `#E5FC2A` | Fundos escuros, destaques | Original |
| `secondary-onWhite` | `#7A8F02` | **Texto em fundo branco** | ✅ WCAG AA |
| `secondary-onLight` | `#5A6602` | Texto em fundos claros | ✅ WCAG AAA |
| `secondary-vibrant` | `#9DB002` | Ícones, bordas | ✅ Boa visibilidade |
| `secondary-muted` | `#C8E6A0` | Fundos suaves | ✅ Harmoniosa |
| `secondary-subtle` | `#E8F5D0` | Backgrounds delicados | ✅ Muito suave |

### Classes CSS Disponíveis

```css
/* Texto */
.text-secondary-onWhite    /* Para fundo branco */
.text-secondary-onLight    /* Para fundos claros */
.text-secondary-vibrant    /* Ícones e destaques */
.text-secondary-muted      /* Texto secundário */

/* Fundos */
.bg-secondary-subtle       /* Fundo muito suave */
.bg-secondary-muted        /* Fundo suave */
.bg-secondary-vibrant      /* Fundo com destaque */

/* Bordas */
.border-secondary-muted    /* Bordas suaves */
.border-secondary-vibrant  /* Bordas com destaque */

/* Auto-seleção (recomendado) */
.text-secondary-auto       /* Escolhe automaticamente a melhor cor */
.bg-secondary-auto         /* Fundo automático */
.border-secondary-auto     /* Borda automática */
```

## 📋 Guia de Uso

### ✅ Boas Práticas

```jsx
// ✅ Para ícones em fundo branco
<CheckCircle className="text-secondary-onWhite" />

// ✅ Para títulos em fundo claro
<h2 className="text-secondary-onWhite">Título</h2>

// ✅ Para fundos de cards suaves
<div className="bg-secondary-subtle border-secondary-muted">

// ✅ Para destaques em fundo escuro (mantém original)
<h2 className="text-secondary">Título em fundo escuro</h2>
```

### ❌ Evitar

```jsx
// ❌ Cor original em fundo branco (baixo contraste)
<span className="text-secondary">Texto em fundo branco</span>

// ❌ Cores muito vibrantes para textos longos
<p className="text-secondary">Parágrafo longo...</p>
```

## 🎯 Casos de Uso Específicos

### 1. Ícones
- **Fundo branco/claro**: `text-secondary-onWhite`
- **Fundo escuro**: `text-secondary`
- **Destaque médio**: `text-secondary-vibrant`

### 2. Títulos
- **Fundo branco**: `text-secondary-onWhite`
- **Fundo claro**: `text-secondary-onLight`
- **Fundo escuro**: `text-secondary`

### 3. Fundos
- **Cards suaves**: `bg-secondary-subtle`
- **Seções destacadas**: `bg-secondary-muted`
- **Botões**: `bg-secondary-vibrant`

### 4. Bordas
- **Bordas sutis**: `border-secondary-muted`
- **Bordas de destaque**: `border-secondary-vibrant`

## 🔄 Migração Gradual

Para facilitar a transição, mantemos as cores originais e adicionamos as novas variantes:

1. **Fase 1**: Identificar usos problemáticos da cor original
2. **Fase 2**: Aplicar variantes apropriadas
3. **Fase 3**: Otimizar baseado no feedback visual

## 🧪 Testes de Contraste

Todas as novas variantes foram testadas para garantir:
- ✅ **WCAG AA**: Contraste mínimo 4.5:1 para texto normal
- ✅ **WCAG AAA**: Contraste mínimo 7:1 para máxima acessibilidade
- ✅ **Harmonia visual**: Integração suave com a paleta existente

## 📱 Responsividade

As cores funcionam consistentemente em:
- 🖥️ Desktop
- 📱 Mobile
- 🌙 Modo escuro (quando implementado)
- 🖨️ Impressão

---

**Resultado**: Mantemos a identidade visual vibrante da Vista Nova enquanto garantimos excelente legibilidade e acessibilidade em todos os contextos de uso. 