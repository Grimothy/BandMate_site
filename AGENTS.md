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

## Custom Slash Commands

### /commit
You are an AI agent that helps create well-formatted git commits with conventional commit messages and emoji icons, follow these instructions exactly. Always run and push the commit, you don't need to ask for confirmation unless there is a big issue or error.

#### Instructions for Agent
When the user runs this command, execute the following workflow:

1. **Check command mode**:
   - If user provides `<message>` (a simple message), skip to step 3

2. **Run pre-commit validation**:
   - Execute `npm run typecheck` and report any issues (replaces `pnpm lint`)
   - Execute `npm run build` and ensure it succeeds (replaces `pnpm build`)
   - If either fails, ask user if they want to proceed anyway or fix issues first
   
3. **Analyze git status**:
   - Run `git status --porcelain` to check for changes
   - If no files are staged, run `git add .` to stage all modified files
   - If files are already staged, proceed with only those files
   
4. **Analyze the changes**:
   - Run `git diff --cached` to see what will be committed
   - Analyze the diff to determine the primary change type (feat, fix, docs, etc.)
   - Identify the main scope and purpose of the changes
   
5. **Generate commit message**:
   - Choose appropriate emoji and type from the reference below
   - Create message following format: `<emoji> <type>: <description>`
   - Keep description concise, clear, and in imperative mood
   - Show the proposed message to user for confirmation
   
6. **Execute the commit**:
   - Run `git commit -m "<generated message>"`
   - Run `git push`
   - Display the commit hash and confirm success
   - Provide brief summary of what was committed

#### Commit Message Guidelines
- **Atomic commits**: Each commit should contain related changes that serve a single purpose
- **Imperative mood**: Write as commands (e.g., "add feature" not "added feature")
- **Concise first line**: Keep under 72 characters
- **Conventional format**: Use `<emoji> <type>: <description>` where type is one of:
  - ✨ `feat`: New feature
  - 🐛 `fix`: Bug fix
  - 📝 `docs`: Documentation
  - 💄 `style`: Formatting/style
  - ♻️ `refactor`: Code refactoring
  - ⚡️ `perf`: Performance improvements
  - ✅ `test`: Tests
  - 🔧 `chore`: Tooling, configuration
  - 🚀 `ci`: CI/CD improvements
  - 🗑️ `revert`: Reverting changes
  - 🧪 `test`: Add a failing test
  - 🚨 `fix`: Fix compiler/linter warnings
  - 🔒️ `fix`: Fix security issues
  - 👥 `chore`: Add or update contributors
  - 🚚 `refactor`: Move or rename resources
  - 🏗️ `refactor`: Make architectural changes
  - 🔀 `chore`: Merge branches
  - 📦️ `chore`: Add or update compiled files or packages
  - ➕ `chore`: Add a dependency
  - ➖ `chore`: Remove a dependency
  - 🌱 `chore`: Add or update seed files
  - 🧑‍💻 `chore`: Improve developer experience
  - 🧵 `feat`: Add or update code related to multithreading or concurrency
  - 🔍️ `feat`: Improve SEO
  - 🏷️ `feat`: Add or update types
  - 💬 `feat`: Add or update text and literals
  - 🌐 `feat`: Internationalization and localization
  - 👔 `feat`: Add or update business logic
  - 📱 `feat`: Work on responsive design
  - 🚸 `feat`: Improve user experience / usability
  - 🩹 `fix`: Simple fix for a non-critical issue
  - 🥅 `fix`: Catch errors
  - 👽️ `fix`: Update code due to external API changes
  - 🔥 `fix`: Remove code or files
  - 🎨 `style`: Improve structure/format of the code
  - 🚑️ `fix`: Critical hotfix
  - 🎉 `chore`: Begin a project
  - 🔖 `chore`: Release/Version tags
  - 🚧 `wip`: Work in progress
  - 💚 `fix`: Fix CI build
  - 📌 `chore`: Pin dependencies to specific versions
  - 👷 `ci`: Add or update CI build system
  - 📈 `feat`: Add or update analytics or tracking code
  - ✏️ `fix`: Fix typos
  - ⏪️ `revert`: Revert changes
  - 📄 `chore`: Add or update license
  - 💥 `feat`: Introduce breaking changes
  - 🍱 `assets`: Add or update assets
  - ♿️ `feat`: Improve accessibility
  - 💡 `docs`: Add or update comments in source code
  - 🗃️ `db`: Perform database related changes
  - 🔊 `feat`: Add or update logs
  - 🔇 `fix`: Remove logs
  - 🤡 `test`: Mock things
  - 🥚 `feat`: Add or update an easter egg
  - 🙈 `chore`: Add or update .gitignore file
  - 📸 `test`: Add or update snapshots
  - ⚗️ `experiment`: Perform experiments
  - 🚩 `feat`: Add, update, or remove feature flags
  - 💫 `ui`: Add or update animations and transitions
  - ⚰️ `refactor`: Remove dead code
  - 🦺 `feat`: Add or update code related to validation
  - ✈️ `feat`: Improve offline support

### /fix
- **Delegation**: Use the `Task` tool with `subagent_type: "CoderAgent"`.
- **Scope**: Used for small, targeted bug fixes or refactors that require high-precision logic.

## Testing
Currently no test framework is configured. Use `npm run typecheck` for validation.

## CI/CD Notes
- Build command: `npm run build`
- Output directory: `build/`
- Type checking: `npm run typecheck`

## Resources
- [Docusaurus Docs](https://docusaurus.io/docs)
- [React 19 Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
