# AGENTS.md - Coding Guidelines for BandMate

## Project Overview
Docusaurus v3 documentation site built with React 19 and TypeScript. Located in `/home/cj/Documents/GitHub/BandMate_site/bandmate/`.

## Build & Development Commands

```bash
# Install dependencies
npm install

# Start development server (opens browser, live reload)
npm run start

# Build for production
npm run build

# Type-check TypeScript (no compilation, editor only)
npm run typecheck

# Serve built site locally
npm run serve

# Clear Docusaurus cache
npm run clear

# Deployment (GitHub Pages)
npm run deploy

# i18n commands
npm run write-translations
npm run write-heading-ids
```

**Note:** No test runner, linter, or formatter is currently configured. Use `npm run typecheck` to validate TypeScript before committing.

## Project Structure

```
bandmate/
├── blog/               # Blog posts (MDX)
├── docs/               # Documentation (MDX)
├── src/
│   ├── components/     # React components
│   ├── css/           # Global styles
│   └── pages/         # Custom pages
├── static/            # Static assets
├── docusaurus.config.ts
├── sidebars.ts
└── tsconfig.json
```

## Technology Stack

- **Framework:** Docusaurus 3.9.2
- **React:** 19.0.0
- **TypeScript:** 5.6.2
- **Node:** >= 20.0
- **Package Manager:** npm

## Code Style Guidelines

### TypeScript

- Use explicit type annotations for function props and return types
- Prefer `type` aliases for object shapes
- Use `ReactNode` for component return types
- Enable strict mode via extended tsconfig

Example:
```typescript
import type {ReactNode} from 'react';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

function Feature({title, description}: FeatureItem): ReactNode {
  // ...
}
```

### Imports

- Group imports: React/types first, then external libs, then internal modules
- Use `@site/` alias for project root imports
- Use `@theme/` for Docusaurus theme components
- Import types with `import type`

Example:
```typescript
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';
```

### Components

- Use functional components with explicit return types
- Destructure props in function parameters
- Use `clsx` for conditional class names
- Use Docusaurus theme components (`@theme/Heading`, `@theme/Layout`)

### Styling

- Use CSS modules (`.module.css`) for component styles
- Use Docusaurus utility classes (`text--center`, `padding-horiz--md`, `container`, `row`, `col`)
- Follow BEM-like naming in CSS modules

### Naming Conventions

- **Components:** PascalCase (e.g., `HomepageFeatures.tsx`)
- **Files:** PascalCase for components, camelCase for utilities
- **Types/Interfaces:** PascalCase with descriptive names
- **CSS Modules:** `ComponentName/styles.module.css`
- **Constants:** UPPER_SNAKE_CASE for true constants

### Error Handling

- Docusaurus throws on broken links (`onBrokenLinks: 'throw'`)
- TypeScript strict mode enabled
- Always handle async errors in data fetching

### MDX Guidelines

- Use MDX for docs and blog posts
- Frontmatter required for metadata
- Use JSX components sparingly in content

## Docusaurus-Specific Patterns

### Configuration
- Config in `docusaurus.config.ts` (TypeScript)
- Sidebars defined in `sidebars.ts`
- Future v4 compatibility enabled

### Theming
- Uses `prism-react-renderer` for code blocks
- Supports light/dark mode with `respectPrefersColorScheme`
- Custom CSS in `src/css/custom.css`

## Testing

Currently no test framework is configured. Consider adding:
- Jest or Vitest for unit tests
- Playwright for E2E testing

## CI/CD Notes

- Build command: `npm run build`
- Output directory: `build/`
- Type checking: `npm run typecheck`

## Resources

- [Docusaurus Docs](https://docusaurus.io/docs)
- [React 19 Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
