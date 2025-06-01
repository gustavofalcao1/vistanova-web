# Guia de Estilização do Vista Nova Web

Este documento descreve a estratégia de estilização do projeto Vista Nova Web, incluindo o sistema de cores, a abordagem híbrida de estilização e as diretrizes para uso consistente das tecnologias de estilo.

## Índice

1. [Visão Geral](#visão-geral)
2. [Sistema de Cores](#sistema-de-cores)
3. [Estratégia de Estilização](#estratégia-de-estilização)
4. [Tailwind CSS (Principal)](#tailwind-css-principal)
5. [styled-components (Casos Específicos)](#styled-components-casos-específicos)
6. [Integração entre Tecnologias](#integração-entre-tecnologias)
7. [Boas Práticas](#boas-práticas)
8. [Exemplos Práticos](#exemplos-práticos)

## Visão Geral

O projeto Vista Nova Web utiliza uma abordagem híbrida de estilização, combinando:

- **Tailwind CSS**: Solução principal para a maioria dos componentes
- **styled-components**: Solução complementar para casos específicos

Esta abordagem nos permite aproveitar o melhor de cada tecnologia, mantendo a consistência visual e a eficiência de desenvolvimento.

## Sistema de Cores

### Estrutura de Cores

As cores são organizadas em categorias lógicas definidas em `src/styles/tokens/colors.ts`:

- **Cores Principais**: `primary`, `secondary`
- **Cores de Fundo**: `background`
- **Cores de Texto**: `foreground`
- **Cores de Status**: `success`, `warning`, `error`
- **Cores de Borda**: `border`
- **Cores Neutras**: `neutral`

### Cores Disponíveis

#### Primárias
- `primary`: Azul escuro principal
- `secondary`: Verde neon

#### Fundo
- `background.default`: Branco
- `background.dark`: Azul escuro
- `background.alt`: Cinza claro
- `background.alt-dark`: Azul escuro alternativo

#### Texto
- `foreground.default`: Azul escuro
- `foreground.light`: Cinza médio
- `foreground.dark`: Preto
- `foreground.onDark`: Branco
- `foreground.muted`: Cinza mais claro

#### Status
- `success`: Verde
- `warning`: Amarelo
- `error`: Vermelho

#### Bordas
- `border.default`: Cinza claro
- `border.dark`: Cinza escuro
- `border.secondary`: Verde neon
- `border.primary`: Azul escuro

#### Neutras
- `neutral.50` a `neutral.900`: Escala de cinza

### Como Usar as Cores

#### 1. Usando no CSS/SCSS

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

#### 2. Usando no JavaScript/TypeScript

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

#### 3. Convenções de Cores

1. **Nomes Semânticos**: Use nomes semânticos em vez de nomes baseados em aparência.
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

## Estratégia de Estilização

### Abordagem Híbrida

O projeto utiliza uma abordagem híbrida de estilização, combinando Tailwind CSS como solução principal e styled-components para casos específicos onde o Tailwind apresenta limitações.

### Motivação

Esta abordagem foi escolhida para:

1. **Desenvolvimento Rápido**: Tailwind CSS permite desenvolvimento rápido e consistente
2. **Flexibilidade**: styled-components oferece flexibilidade para casos complexos
3. **Melhor DX**: Cada tecnologia é usada para o que faz melhor
4. **Consistência Visual**: Sistema de tema compartilhado entre as tecnologias

## Tailwind CSS (Principal)

### Quando Utilizar

- Para todos os layouts e componentes de UI padrão
- Para espaçamentos, tipografia e cores consistentes
- Para componentes shadcn/ui (que são baseados em Tailwind)
- Para responsividade e variantes de estado simples

### Exemplo de Uso

```jsx
// Componente de botão com Tailwind CSS
function Button({ children, variant = 'primary', size = 'medium', disabled = false }) {
  return (
    <button 
      className={`
        rounded-md font-medium transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${size === 'small' ? 'px-3 py-1 text-sm' : ''}
        ${size === 'medium' ? 'px-4 py-2 text-base' : ''}
        ${size === 'large' ? 'px-6 py-3 text-lg' : ''}
        ${variant === 'primary' ? 'bg-primary text-white hover:bg-primary-dark' : ''}
        ${variant === 'secondary' ? 'bg-secondary text-white hover:bg-secondary-dark' : ''}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

## styled-components (Casos Específicos)

### Quando Utilizar

styled-components deve ser utilizado apenas nos seguintes casos:

1. **Lógica de Estilo Complexa**: Quando os estilos dependem de múltiplas props ou estados
2. **Animações Avançadas**: Para animações e transições que são difíceis de implementar com Tailwind
3. **Acesso Programático ao Tema**: Quando é necessário manipular valores do tema de forma dinâmica
4. **Geração de CSS Dinâmico**: Quando os estilos precisam ser gerados com base em lógica de negócio
5. **Componentes com Muitas Variantes**: Quando um componente tem muitas combinações de estilos

### Exemplo de Uso

```jsx
// Componente com lógica de estilo complexa baseada em múltiplas props
import styled from 'styled-components';
import { color, bgColor } from '@/styles/utils/colors';

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  ${props => props.size === 'small' && `
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  `}
  
  ${props => props.size === 'large' && `
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  `}
  
  ${props => {
    if (props.variant === 'primary') {
      return `
        ${bgColor('primary')};
        ${color('white')};
        &:hover {
          ${bgColor('primary-dark')};
        }
      `;
    }
    
    if (props.variant === 'secondary') {
      return `
        ${bgColor('secondary')};
        ${color('white')};
        &:hover {
          ${bgColor('secondary-dark')};
        }
      `;
    }
    
    return '';
  }}
  
  ${props => props.disabled && `
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      ${bgColor(props.variant === 'primary' ? 'primary' : 'secondary')};
    }
  `}
`;

function Button({ children, variant = 'primary', size = 'medium', disabled = false }) {
  return (
    <StyledButton 
      variant={variant}
      size={size}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}
```

## Integração entre Tecnologias

### Sistema de Tema Compartilhado

- `src/styles/theme`: Define tokens de design compartilhados (cores, espaçamentos, etc.)
- `tailwind.config.js`: Utiliza os mesmos tokens para configurar o Tailwind
- `src/styles/utils/colors.ts`: Fornece funções para acessar cores do tema em styled-components

### Utilitários de Estilo

```typescript
// Exemplo de uso dos utilitários de cores
import { css } from 'styled-components';
import { color, bgColor, borderColor } from '@/styles/utils/colors';

const StyledCard = styled.div`
  ${bgColor('background.default')};
  ${borderColor('border.primary')};
  ${color('foreground.default')};
  
  padding: 1rem;
  border-radius: 0.5rem;
  border-width: 1px;
  
  &:hover {
    ${bgColor('background.alt')};
  }
`;
```

## Boas Práticas

### Para Tailwind CSS

1. **Organização de Classes**: Agrupe classes por categoria (layout, espaçamento, tipografia, cores)
2. **Componentes Reutilizáveis**: Extraia padrões comuns para componentes reutilizáveis
3. **Variantes com cva**: Use `class-variance-authority` para componentes com muitas variantes
4. **Evite @apply**: Use @apply apenas quando absolutamente necessário
5. **Prefira Classes Inline**: Mantenha as classes no JSX para melhor visibilidade

### Para styled-components

1. **Documente o Uso**: Explique por que styled-components foi escolhido para o componente
2. **Arquivos Separados**: Mantenha os componentes styled em arquivos `.styles.ts`
3. **Use Utilitários de Tema**: Utilize os utilitários para acessar o tema
4. **Evite Mistura**: Não misture classes Tailwind com styled-components no mesmo elemento
5. **Nomeie Semanticamente**: Use nomes que descrevam o propósito do componente

## Exemplos Práticos

### Exemplo 1: Componente de Card (Tailwind)

```jsx
// Card simples com Tailwind
function Card({ title, content, variant = 'default' }) {
  return (
    <div className={`
      p-4 rounded-lg shadow-md
      ${variant === 'default' ? 'bg-background border border-border' : ''}
      ${variant === 'primary' ? 'bg-primary/10 border border-primary/30' : ''}
    `}>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-foreground-light">{content}</p>
    </div>
  );
}
```

### Exemplo 2: Componente de Animação (styled-components)

```jsx
// Componente com animação complexa
import styled, { keyframes } from 'styled-components';
import { bgColor } from '@/styles/utils/colors';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const StyledPulsingButton = styled.button`
  ${bgColor('primary')};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  animation: ${pulse} 2s infinite;
  
  &:hover {
    animation-play-state: paused;
  }
  
  ${props => props.isActive && `
    animation-duration: 1s;
    ${bgColor('secondary')};
  `}
`;

function PulsingButton({ children, isActive = false }) {
  return (
    <StyledPulsingButton isActive={isActive}>
      {children}
    </StyledPulsingButton>
  );
}
```

---

📅 *Última atualização: 01/06/2025*
