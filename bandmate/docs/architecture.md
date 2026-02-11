---
sidebar_position: 5
title: Architecture
---

# Architecture

BandMate is a full-stack TypeScript application with a clear separation between frontend and backend, connected by a REST API and WebSocket layer.

## High-Level Overview

```
┌─────────────────────────────────────────────────────┐
│                     Client                          │
│  React + TypeScript + Vite + Tailwind CSS           │
│  Radix UI · WaveSurfer.js · Socket.io Client        │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP / WebSocket
┌──────────────────────▼──────────────────────────────┐
│                     Server                          │
│  Node.js + Express + TypeScript                     │
│  Prisma ORM · Socket.io · JWT Auth · Multer         │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                   Database                          │
│  SQLite (default) / PostgreSQL                      │
└─────────────────────────────────────────────────────┘
```

## Frontend

The frontend is a React single-page application built with Vite.

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tooling and dev server |
| **Tailwind CSS** | Utility-first styling |
| **Radix UI** | Accessible component primitives |
| **WaveSurfer.js** | Audio waveform visualization |
| **Socket.io Client** | Real-time updates |
| **Axios** | HTTP API client |

### Key Frontend Patterns

- **Context-based state management** -- AuthContext, SocketContext for global state
- **Cookie-based auth for WebSockets** -- Ensures reliable real-time connections
- **Lazy loading** of audio components for performance
- **Media Session API integration** via a custom `useMediaSession` hook
- **ActionSheet components** for mobile-friendly interactions
- **Responsive design** with Tailwind breakpoints

## Backend

The backend is a Node.js/Express server written in TypeScript.

| Technology | Purpose |
|-----------|---------|
| **Express** | HTTP server and routing |
| **TypeScript** | Type safety |
| **Prisma ORM** | Database access and migrations |
| **Socket.io** | WebSocket server for real-time events |
| **JWT** | Access and refresh token authentication |
| **Multer** | File upload handling |
| **bcrypt** | Password hashing |

### Key Backend Patterns

- **Prisma singleton** -- A single Prisma client instance is shared across the application for efficient database connection pooling
- **Rate limiting** -- API endpoints are rate-limited to prevent abuse
- **Consolidated access checks** -- Middleware validates project membership and permissions before route handlers execute
- **Activity tracking hooks** -- Actions automatically create activity records for the activity feed
- **File type detection** -- Uploads are automatically categorized based on MIME type and extension

## Database

BandMate uses **SQLite** by default, requiring zero configuration. The database file is stored at `./data/bandmate.db` inside the container.

### Core Models

| Model | Description |
|-------|-------------|
| `User` | User accounts with roles and avatars |
| `Project` | Top-level music workspaces |
| `ProjectMember` | Many-to-many relationship between users and projects with role permissions |
| `Vibe` | Song ideas within a project |
| `Cut` | Individual takes/mixes within a vibe |
| `File` | Uploaded files (audio, stems, images) |
| `Comment` | Timestamped comments on cuts with reply support |
| `Activity` | Activity feed events |
| `Notification` | User notifications |
| `ShareToken` | Secure tokens for public file sharing |
| `RefreshToken` | JWT refresh tokens for persistent sessions |

### Scaling to PostgreSQL

To use PostgreSQL instead of SQLite, update the `DATABASE_URL` environment variable:

```bash
DATABASE_URL="postgresql://user:password@host:5432/bandmate"
```

Prisma handles the schema migration automatically.

## Real-Time Layer

Socket.io provides bidirectional WebSocket communication between the client and server.

### Events

| Event | Direction | Description |
|-------|-----------|-------------|
| File upload | Server -> Client | Notifies project members of new uploads |
| New comment | Server -> Client | Broadcasts new comments in real-time |
| Activity update | Server -> Client | Pushes activity feed updates |
| Cut moved | Server -> Client | Notifies when cuts are moved between vibes |
| Notification | Server -> Client | Delivers user notifications |

### Authentication

WebSocket connections use **cookie-based authentication** rather than localStorage tokens. This ensures reliable auth across browser contexts, including when the app is used after OAuth redirects.

## File Storage

Uploaded files are stored on the local filesystem at `/app/uploads` inside the container. The directory structure is organized by upload type and unique identifiers.

File metadata (name, size, type, path, upload user) is stored in the database, while the actual file bytes live on disk.

## Docker Architecture

The production Docker image uses a **multi-stage build**:

1. **Build stage** -- Compiles TypeScript, bundles the frontend with Vite
2. **Production stage** -- Copies built artifacts, installs production-only dependencies
3. **Runtime** -- Express serves the API and the built frontend as static files

Health check endpoints are included for container orchestration.
