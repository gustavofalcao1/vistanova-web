# Project Structure

This document outlines the project's directory structure and organization conventions.

## Main Directories

### `/src`
- Root source directory

### `/src/app`
- Next.js application routes and pages
- Contains route groups and page components

### `/src/components`
- Reusable UI components
- Organized by feature
- Follows PascalCase naming convention

### `/src/features`
- Feature-based components and logic
- Each feature has its own directory
- Contains both UI and business logic

### `/src/hooks`
- Custom React hooks
- Follows camelCase naming convention
- Should be prefixed with 'use'

### `/src/lib`
- External library integrations
- Utility functions
- Third-party configurations

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
