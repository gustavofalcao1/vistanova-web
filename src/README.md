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

### `/src/middleware`
- Next.js middleware for request processing
- Handles authentication, redirects, and request modifications

### `/src/styles`
- Global styles and Tailwind CSS configurations
- Contains theme variables and global style definitions

### `/src/types`
- TypeScript type definitions
- Organized by domain:
  - `auth.ts`: Authentication types (protected zone)
  - `api.ts`: API-related types
  - `theme.ts`: Theme-related types
  - `utils.ts`: Utility types

### `/src/config`
- Configuration files for the application
- Contains settings and constants

## Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `HeroSection.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useMediaQuery.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase for interfaces and types (e.g., `User`, `ApiResponse`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_ITEMS`, `API_ENDPOINTS`)

## Best Practices

- Keep components focused on a single responsibility
- Use TypeScript types for all props and function parameters
- Leverage Tailwind CSS for styling
- Follow shadcn/ui patterns for component design
- Implement proper error boundaries and loading states
- Ensure all components are responsive and accessible
- Document complex logic with clear comments
- Use named exports instead of default exports
### `/src/types`
- TypeScript type definitions
- Interfaces and types
- Follows PascalCase naming convention

### `/src/utils`
- Helper functions
- Utility classes
- Follows camelCase naming convention

### `/src/contexts`
- React context providers
- State management
- Follows PascalCase naming convention

### `/src/styles`
- Global styles
- CSS modules
- Tailwind configurations

### `/src/config`
- Application configuration
- Environment variables
- API configurations

## Naming Conventions

### Components
- Use PascalCase (e.g., `HeroSection`)
- Include suffix for component type (e.g., `Header`, `Footer`)
- Keep names descriptive but concise

### Hooks
- Prefix with 'use' (e.g., `useAuth`, `useFetch`)
- Follow camelCase (e.g., `useUser`, `useCart`)

### Types
- Use PascalCase (e.g., `UserType`, `ProductType`)
- Use 'Type' or 'Interface' suffix when appropriate

### Utilities
- Use camelCase (e.g., `formatDate`, `calculateTotal`)
- Keep names descriptive

### Contexts
- Use PascalCase (e.g., `AuthContext`, `ThemeContext`)
- Follow React context naming conventions

## File Organization

### Components
```
components/
  ├── ui/              # Reusable UI components
  │   ├── Button.tsx
  │   ├── Card.tsx
  │   └── Input.tsx
  ├── sections/        # Page sections
  │   ├── HeroSection.tsx
  │   └── Footer.tsx
  └── layouts/         # Layout components
      └── MainLayout.tsx
```

### Features
```
features/
  ├── auth/           # Authentication feature
  │   ├── components/
  │   ├── hooks/
  │   └── types/
  └── products/       # Product feature
      ├── components/
      ├── hooks/
      └── types/
```

### Hooks
```
hooks/
  ├── useAuth.ts
  ├── useFetch.ts
  └── useTheme.ts
```

## Best Practices

1. Keep related files together
2. Use consistent naming across the project
3. Document complex components and hooks
4. Follow TypeScript best practices
5. Keep files small and focused
6. Use meaningful names that describe functionality
7. Follow React component best practices
