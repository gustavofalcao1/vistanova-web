# Project Structure

This document outlines the Vista Nova Web project's directory structure and organization conventions.

## Main Directories

### `/src`
- Root source directory containing all application code

### `/src/app`
- Next.js App Router application routes and pages
- Contains route groups and page components
- Follows Next.js 15+ App Router conventions
- Includes `/app/(pages)` for main site pages
- Includes `/app/api` for API routes and serverless functions

### `/src/components`
- Reusable UI components organized by purpose
- Follows PascalCase naming convention
- Structured into subdirectories:
  - `/components/ui`: Base UI components from shadcn/ui
  - `/components/layouts`: Layout components for page structure
  - `/components/sections`: Page-specific content sections
  - `/components/providers`: Context providers for state management
  - `/components/analytics`: Analytics tracking components
  - `/components/seo`: SEO-related components
  - `/components/theme`: Theme-related components

### `/src/contexts`
- React Context providers for application state
- Includes ThemeProvider for theme management
  *(Note: Consider if this directory is still needed if ThemeProvider moved to `/src/components/providers` or `/src/components/theme`)*

### `/src/hooks`
- Custom React hooks for shared logic
- Follows camelCase naming convention
- All hooks are prefixed with 'use'

### `/src/lib`
- Utility functions and external library integrations
- Contains core functionality like:
  - `animation.ts`: Animation utilities
  - `mailer.ts`: Email functionality
  - `queryClient.ts`: React Query configuration
  - `schemas.ts`: Zod validation schemas
  - `utils.ts`: General utility functions (protected zone)
  - `types.ts`: Contains types specifically related to the logic within the `/src/lib/` directory, such as Form data structures (e.g., `ContactFormData`, `NewsletterFormData`).

### `/src/middleware`
- Next.js middleware for request processing
- Handles rate limiting and potentially other request modifications.

### `/src/styles`
- Global styles and Tailwind CSS configurations
- Contains theme variables, global style definitions, and token definitions.
  - `/tokens`: Defines design tokens like colors and spacing.
  - `/utils`: Utility functions related to styling and theme.

### `/src/types`
- Centralized TypeScript type definitions for the application.
- Organized by domain and purpose:
  - `entities.ts`: Defines core data structures and domain entities (e.g., `Service`, `FAQ`, `ContactPerson`).
  - `props.ts`: Defines props interfaces for React components (e.g., `SectionProps`, `ButtonProps`).
  - `api.ts`: Types related to API request/response structures.
  - `auth.ts`: Types for authentication context and user data (protected zone).
  - `theme.ts`: Types for theme context and structure.
  - `utils.ts`: Generic utility types (e.g., `DeepPartial`).
  - `images.d.ts`: Module declarations for image asset imports.
  - `index.ts`: (Optional) Barrel file re-exporting common types from `entities.ts` and `props.ts` for convenience.

### `/src/config`
- Configuration files for the application
- Contains settings and constants (e.g., `env.ts`, `paths.ts`).

## Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `HeroSection.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useTheme.ts`, `useScrollReveal.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `cn.ts` in `lib/utils.ts`)
- **Types**: PascalCase for interfaces and types (e.g., `User`, `ApiResponse`, `Service`, `SectionProps`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_ITEMS`, `API_ENDPOINTS` - as defined in `src/config/env.ts`)

## Best Practices

- Keep components focused on a single responsibility.
- Use TypeScript types for all props, function parameters, and return values.
- Leverage Tailwind CSS for styling, using theme variables and utility classes.
- Follow shadcn/ui patterns for component design when applicable.
- Implement proper error boundaries and loading states for a robust user experience.
- Ensure all components are responsive across different viewports and accessible (striving for WCAG 2.1 AA).
- Document complex logic, components, and public APIs using JSDoc/TSDoc (in English).
- Prefer named exports over default exports for better tree-shaking and clarity, unless it's a page component in Next.js App Router.

*(Note: Removi as secções duplicadas e a estrutura de exemplo para features/ que não existe no seu projeto atual, e ajustei a descrição de /src/types e /src/lib para refletir a nova organização de tipos.)*