---
sidebar_position: 6
title: Deployment
---

# Deployment

This guide covers deploying BandMate to production with Docker and a reverse proxy.

## Production Checklist

Before deploying, ensure you have:

- [ ] Set strong, unique values for `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`
- [ ] Changed the default admin password (or set `ADMIN_EMAIL`/`ADMIN_PASSWORD` before first run)
- [ ] Set `NODE_ENV=production`
- [ ] Set `APP_URL` to your public-facing domain
- [ ] Configured persistent volume mounts for `/app/data` and `/app/uploads`
- [ ] Set up a reverse proxy with HTTPS

## Docker Production Deployment

### Basic Docker Run

```bash
docker run -d \
  --name bandmate \
  --restart unless-stopped \
  -p 3000:3000 \
  -v /path/to/data:/app/data \
  -v /path/to/uploads:/app/uploads \
  -e NODE_ENV=production \
  -e JWT_ACCESS_SECRET="$(openssl rand -base64 32)" \
  -e JWT_REFRESH_SECRET="$(openssl rand -base64 32)" \
  -e APP_URL="https://bandmate.yourdomain.com" \
  grimothy/bandmate:latest
```

### Docker Compose (Production)

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

## Reverse Proxy Configuration

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

## Monitoring

BandMate includes health check endpoints that Docker can use for container health monitoring:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

## Updating in Production

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
