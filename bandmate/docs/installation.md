---
sidebar_position: 2
title: Installation
---

# Installation

BandMate can be deployed in three ways. Docker is recommended for most users.

## Prerequisites

- **Docker** (Option 1 & 2): Docker Engine 20+ and Docker Compose v2+
- **Local Development** (Option 3): Node.js 20+, npm

## Option 1: Docker Run (Recommended)

The fastest way to get started. A single command pulls the image and starts BandMate:

```bash
docker run -d \
  --name bandmate \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/uploads:/app/uploads \
  -e JWT_ACCESS_SECRET="your-secret-here" \
  -e JWT_REFRESH_SECRET="your-refresh-secret" \
  grimothy/bandmate:latest
```

Open [http://localhost:3000](http://localhost:3000) and log in with:

| Field | Value |
|-------|-------|
| Email | `admin@bandmate.local` |
| Password | `admin` |

:::warning Change the Default Password
The default admin credentials are public. Change the admin password immediately after your first login, or set custom credentials using environment variables before seeding.
:::

### Volume Mounts

| Host Path | Container Path | Purpose |
|-----------|---------------|---------|
| `./data` | `/app/data` | SQLite database |
| `./uploads` | `/app/uploads` | Uploaded audio files, stems, and images |

:::tip
Always mount these volumes to persist your data across container restarts and upgrades.
:::

## Option 2: Docker Compose

Clone the repository and use the included `docker-compose.yml`:

```bash
git clone https://github.com/Grimothy/BandMate.git
cd BandMate
docker-compose up -d
```

The Compose file configures volumes, environment variables, and port mappings automatically. Edit `docker-compose.yml` to customize settings before starting.

## Option 3: Local Development

For contributors or those who prefer running without Docker:

### Backend

```bash
cd backend
npm install
cp ../.env.example .env    # Copy and edit environment variables
npm run db:push            # Create database schema
npm run db:seed            # Seed with default admin user
npm run dev                # Start development server
```

### Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server starts on port 5173 and proxies API requests to the backend on port 3000.

## Verifying the Installation

After starting BandMate, verify everything is working:

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. Log in with the default admin credentials
3. Create a test project
4. Upload an audio file and confirm the waveform renders

## Updating

### Docker

```bash
docker pull grimothy/bandmate:latest
docker stop bandmate
docker rm bandmate
# Re-run the docker run command from above
```

### Docker Compose

```bash
docker-compose pull
docker-compose up -d
```

Your data is preserved in the mounted volumes as long as you don't remove them.

## Next Steps

- **[Configuration](/docs/configuration)** -- Customize JWT secrets, email, OAuth, and more
- **[Deployment](/docs/deployment)** -- Production deployment with reverse proxies
