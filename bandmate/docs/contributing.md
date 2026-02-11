---
sidebar_position: 8
title: Contributing
---

# Contributing

BandMate is open source and welcomes contributions. This guide covers how to get set up for development and submit changes.

## Getting Started

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR-USERNAME/BandMate.git
cd BandMate
```

### 2. Set Up the Development Environment

**Backend:**

```bash
cd backend
npm install
cp ../.env.example .env
npm run db:push
npm run db:seed
npm run dev
```

**Frontend (separate terminal):**

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on port 5173 and proxies API calls to the backend on port 3000.

### 3. Make Your Changes

Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

## Project Structure

```
BandMate/
├── backend/
│   ├── src/
│   │   ├── routes/        # Express route handlers
│   │   ├── services/      # Business logic
│   │   ├── middleware/     # Auth, rate limiting, access checks
│   │   └── prisma/        # Schema and migrations
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   └── api/           # API client functions
│   └── package.json
├── docs/                  # Documentation
├── docker-compose.yml
├── Dockerfile
└── .env.example
```

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React, TypeScript, Vite, Tailwind CSS, Radix UI, WaveSurfer.js |
| Backend | Node.js, Express, TypeScript, Prisma (SQLite) |
| Real-time | Socket.io |
| Auth | JWT, Google OAuth |

## Code Style

- **TypeScript** throughout -- both frontend and backend
- **Functional React components** with hooks
- **Prisma** for all database access -- no raw SQL
- **Express middleware** for cross-cutting concerns (auth, rate limiting, access checks)

## Testing

Backend tests can be run with:

```bash
cd backend
npm test
```

A Docker-based test environment is also available:

```bash
docker-compose -f docker-compose.test.yml up --build
```

## Submitting Changes

1. Commit your changes with a clear, descriptive message
2. Push to your fork
3. Open a Pull Request against the `main` branch
4. Describe what your PR does and why

### PR Guidelines

- Keep PRs focused on a single change
- Include a description of what changed and why
- If your change affects the UI, describe how to test it
- Make sure the build passes (`npm run build` in both frontend and backend)

## Reporting Issues

Found a bug or have a feature request? [Open an issue](https://github.com/Grimothy/BandMate/issues) on GitHub with:

- A clear title and description
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Browser and OS information if relevant

## License

BandMate is licensed under the MIT License. By contributing, you agree that your contributions will be licensed under the same terms.
