---
sidebar_position: 4
title: Self-Hosted Setup
---

# Self-Hosted Setup

This guide covers everything you need to install, configure, and deploy BandMate on your own server.

## Prerequisites

- **Docker** (recommended): Docker Engine 20+ and Docker Compose v2+
- **Local Development**: Node.js 20+, npm

## Quick Start (Docker)

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

| Field    | Value                  |
|----------|------------------------|
| Email    | `admin@bandmate.local` |
| Password | `admin`                |

:::warning Change the Default Password
The default admin credentials are public. Change the admin password immediately after your first login, or set custom credentials using environment variables before seeding.
:::

### Volume Mounts

| Host Path    | Container Path  | Purpose                                   |
|--------------|-----------------|-------------------------------------------|
| `./data`     | `/app/data`     | SQLite database                           |
| `./uploads`  | `/app/uploads`  | Uploaded audio files, stems, and images   |

:::tip
Always mount these volumes to persist your data across container restarts and upgrades.
:::

## Docker Compose

Clone the repository and use the included `docker-compose.yml`:

```bash
git clone https://github.com/Grimothy/BandMate.git
cd BandMate
docker-compose up -d
```

### Production Docker Compose

```yaml
version: '3.8'

services:
  bandmate:
    image: grimothy/bandmate:latest
    container_name: bandmate
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
      - ./uploads:/app/uploads
    environment:
      NODE_ENV: production
      JWT_ACCESS_SECRET: "your-strong-secret-here"
      JWT_REFRESH_SECRET: "your-other-strong-secret-here"
      APP_URL: "https://bandmate.yourdomain.com"
      # Optional: Email
      # EMAIL_ENABLED: "true"
      # EMAIL_HOST: smtp.example.com
      # Optional: Google OAuth
      # GOOGLE_OAUTH_ENABLED: "true"
      # GOOGLE_CLIENT_ID: "your-client-id"
      # GOOGLE_CLIENT_SECRET: "your-client-secret"
```

## Configuration

BandMate is configured through environment variables.

### Required Variables

These must be set for BandMate to function securely:

| Variable             | Description                                                                         |
|----------------------|-------------------------------------------------------------------------------------|
| `JWT_ACCESS_SECRET`  | Secret key for signing access tokens. Use a random string (32+ characters recommended). |
| `JWT_REFRESH_SECRET` | Secret key for signing refresh tokens. Use a **different** random string.           |

:::danger
Never use the default secrets in production. Generate strong random secrets:
```bash
openssl rand -base64 32
```
:::

### Server Variables

| Variable       | Default                    | Description                                 |
|----------------|----------------------------|---------------------------------------------|
| `PORT`         | `3000`                     | Port the server listens on                  |
| `NODE_ENV`     | `development`              | Set to `production` for deployments         |
| `DATABASE_URL` | `file:./data/bandmate.db`  | SQLite database path                        |

### Admin User

These variables control the initial admin account created during database seeding:

| Variable         | Default                 | Description             |
|------------------|-------------------------|-------------------------|
| `ADMIN_EMAIL`    | `admin@bandmate.local`  | Admin login email       |
| `ADMIN_PASSWORD` | `admin`                 | Admin login password    |

:::tip
Set these **before** running `db:seed` or starting the container for the first time. They are only used during initial seeding.
:::

### Reverse Proxy

| Variable  | Default                    | Description                                                                                  |
|-----------|----------------------------|----------------------------------------------------------------------------------------------|
| `APP_URL` | `http://localhost:3000`    | Your public-facing URL. Used for email links, OAuth redirects, and cookie configuration.     |

When `APP_URL` uses HTTPS, BandMate automatically enables the `Secure` flag on authentication cookies.

### Email Notifications (Optional)

| Variable                      | Default                              | Description                                     |
|-------------------------------|--------------------------------------|-------------------------------------------------|
| `EMAIL_ENABLED`               | `false`                              | Set to `true` to enable email                   |
| `EMAIL_HOST`                  | `smtp.example.com`                   | SMTP server hostname                            |
| `EMAIL_PORT`                  | `587`                                | SMTP port                                       |
| `EMAIL_SECURE`                | `false`                              | Set to `true` for port 465 (SSL/TLS)            |
| `EMAIL_USER`                  | --                                   | SMTP username                                   |
| `EMAIL_PASS`                  | --                                   | SMTP password                                   |
| `EMAIL_FROM`                  | `BandMate <noreply@bandmate.local>`  | Sender address shown in emails                  |
| `CHAT_NOTIFICATION_GRACE_MS`  | `600000` (10 min)                    | Wait time before emailing an offline recipient  |
| `CHAT_NOTIFICATION_POLL_MS`   | `120000` (2 min)                     | How often the server checks for unread messages |

### Google OAuth (Optional)

| Variable                | Default                                               | Description                          |
|-------------------------|-------------------------------------------------------|--------------------------------------|
| `GOOGLE_OAUTH_ENABLED`  | `false`                                               | Set to `true` to enable Google login |
| `GOOGLE_CLIENT_ID`      | --                                                    | From Google Cloud Console            |
| `GOOGLE_CLIENT_SECRET`  | --                                                    | From Google Cloud Console            |
| `GOOGLE_CALLBACK_URL`   | `http://localhost:3000/api/auth/google/callback`      | OAuth callback URL                   |

### Complete `.env` Example

```bash
# Required
JWT_ACCESS_SECRET=change-me-to-a-random-string
JWT_REFRESH_SECRET=change-me-to-another-random-string

# Server
PORT=3000
NODE_ENV=production
DATABASE_URL=file:./data/bandmate.db

# Admin (used during initial seed only)
ADMIN_EMAIL=admin@bandmate.local
ADMIN_PASSWORD=change-this-password

# Reverse Proxy
APP_URL=https://bandmate.yourdomain.com

# Email (optional)
EMAIL_ENABLED=false
# EMAIL_HOST=smtp.example.com
# EMAIL_PORT=587
# EMAIL_SECURE=false
# EMAIL_USER=
# EMAIL_PASS=
# EMAIL_FROM=BandMate <noreply@bandmate.local>

# Chat missed message email timing (optional, requires EMAIL_ENABLED=true)
# CHAT_NOTIFICATION_GRACE_MS=600000   # 10 minutes
# CHAT_NOTIFICATION_POLL_MS=120000    # 2 minutes

# Google OAuth (optional)
GOOGLE_OAUTH_ENABLED=false
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
# GOOGLE_CALLBACK_URL=https://bandmate.yourdomain.com/api/auth/google/callback
```

## Reverse Proxy

BandMate should be placed behind a reverse proxy that handles HTTPS termination.

:::important
BandMate uses WebSockets for real-time features. Your reverse proxy **must** be configured to proxy WebSocket connections, or notifications and real-time updates will not work.
:::

### nginx

```nginx
server {
    listen 443 ssl http2;
    server_name bandmate.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    client_max_body_size 500M;  # Match stem upload limit

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support
    location /socket.io/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name bandmate.yourdomain.com;
    return 301 https://$host$request_uri;
}
```

### Traefik (Docker Labels)

```yaml
services:
  bandmate:
    image: grimothy/bandmate:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.bandmate.rule=Host(`bandmate.yourdomain.com`)"
      - "traefik.http.routers.bandmate.entrypoints=websecure"
      - "traefik.http.routers.bandmate.tls.certresolver=letsencrypt"
      - "traefik.http.services.bandmate.loadbalancer.server.port=3000"
```

### Caddy

```
bandmate.yourdomain.com {
    reverse_proxy localhost:3000
}
```

Caddy handles HTTPS automatically and supports WebSocket proxying out of the box.

## Production Checklist

Before going live, ensure you have:

- [ ] Set strong, unique values for `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`
- [ ] Changed the default admin password (or set `ADMIN_EMAIL`/`ADMIN_PASSWORD` before first run)
- [ ] Set `NODE_ENV=production`
- [ ] Set `APP_URL` to your public-facing domain
- [ ] Configured persistent volume mounts for `/app/data` and `/app/uploads`
- [ ] Set up a reverse proxy with HTTPS

## Backups

### Automated Backup Script

```bash
#!/bin/bash
# backup-bandmate.sh
BACKUP_DIR="/path/to/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Stop container for consistency
docker stop bandmate

# Create compressed archive
tar -czf "$BACKUP_DIR/bandmate-$DATE.tar.gz" \
  /path/to/data \
  /path/to/uploads

# Restart container
docker start bandmate

# Remove backups older than 30 days
find "$BACKUP_DIR" -name "bandmate-*.tar.gz" -mtime +30 -delete

echo "Backup completed: bandmate-$DATE.tar.gz"
```

### Restore from Backup

```bash
docker stop bandmate

# Extract backup
tar -xzf bandmate-20260210_120000.tar.gz -C /

docker start bandmate
```

## Updating

```bash
# Pull the latest image
docker pull grimothy/bandmate:latest

# Stop and remove the current container
docker stop bandmate
docker rm bandmate

# Start with the same configuration
docker run -d \
  --name bandmate \
  --restart unless-stopped \
  # ... same flags as before ...
  grimothy/bandmate:latest
```

Your data is preserved in the mounted volumes. Database migrations run automatically on startup.
