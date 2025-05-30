# Sistema de Cores

Este documento descreve o sistema de cores do projeto e como usá-lo de forma consistente.

## Visão Geral

O sistema de cores é baseado em um conjunto de tokens que definem as cores principais, secundárias e utilitárias do projeto. Esses tokens são usados para manter a consistência visual em toda a aplicação.

## Estrutura de Cores

As cores são organizadas em categorias lógicas:

- **Cores Principais**: `primary`, `secondary`
- **Cores de Fundo**: `background`
- **Cores de Texto**: `foreground`
- **Cores de Status**: `success`, `warning`, `error`
- **Cores de Borda**: `border`
- **Cores Neutras**: `neutral`

## Como Usar

### 1. Usando no CSS/SCSS

```css
/* Usando variáveis CSS */
.element {
  color: var(--color-primary);
  background-color: var(--color-background-default);
  border: 1px solid var(--color-border-default);
}

/* Usando classes do Tailwind */
<div class="text-primary bg-background border border-border">
  Conteúdo
</div>
```

### 2. Usando no JavaScript/TypeScript

```typescript
import { getColor, color, bgColor, borderColor, textColor } from '@/styles/utils/colors';

// Obter valor de cor
const primaryColor = getColor('primary');

// Estilos com styled-components
const StyledButton = styled.button`
  ${color('primary', 'color')};
  ${bgColor('secondary')};
  ${borderColor('border.primary')};
`;
```

### 3. Usando no Tailwind Config

As cores estão disponíveis no tema do Tailwind através do prefixo `vn-`:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Suas cores personalizadas
      },
    },
  },
};
```

## Convenções

1. **Nomes de Cores**: Use nomes semânticos em vez de nomes baseados em aparência.
   - ✅ `primary`, `success`, `warning`
   - ❌ `blue`, `green`, `red`

2. **Opacidade**: Use as classes de opacidade do Tailwind para variar a intensidade.
   - `bg-primary/50` para 50% de opacidade
   - `text-foreground/70` para 70% de opacidade

3. **Modo Escuro**: Use as classes `dark:` para estilos específicos do modo escuro.
   ```html
   <div class="bg-background dark:bg-background-dark">
     Conteúdo
   </div>
   ```

## Adicionando Novas Cores

1. Adicione a nova cor no arquivo `src/styles/tokens/colors.ts`
2. Atualize a tipagem em `tailwind.d.ts` se necessário
3. Documente a nova cor neste arquivo

## Cores Disponíveis

### Primárias
- `primary`: Azul escuro principal
- `secondary`: Verde neon

### Fundo
- `background.default`: Branco
- `background.dark`: Azul escuro
- `background.alt`: Cinza claro
- `background.alt-dark`: Azul escuro alternativo

### Texto
- `foreground.default`: Azul escuro
- `foreground.light`: Cinza médio
- `foreground.dark`: Preto
- `foreground.onDark`: Branco
- `foreground.muted`: Cinza mais claro

### Status
- `success`: Verde
- `warning`: Amarelo
- `error`: Vermelho

### Bordas
- `border.default`: Cinza claro
- `border.dark`: Cinza escuro
- `border.secondary`: Verde neon
- `border.primary`: Azul escuro

### Neutras
- `neutral.50` a `neutral.900`: Escala de cinza
