---
sidebar_position: 3
title: Configuration
---

# Configuration

BandMate is configured through environment variables. This page covers every available option.

## Required Variables

These must be set for BandMate to function securely:

| Variable | Description |
|----------|-------------|
| `JWT_ACCESS_SECRET` | Secret key for signing access tokens. Use a random string (32+ characters recommended). |
| `JWT_REFRESH_SECRET` | Secret key for signing refresh tokens. Use a **different** random string. |

:::danger
Never use the default secrets in production. Generate strong random secrets:
```bash
openssl rand -base64 32
```
:::

## Server

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Port the server listens on |
| `NODE_ENV` | `development` | Set to `production` for deployments |
| `DATABASE_URL` | `file:./data/bandmate.db` | SQLite database path |

## Admin User

These variables control the initial admin account created during database seeding:

| Variable | Default | Description |
|----------|---------|-------------|
| `ADMIN_EMAIL` | `admin@bandmate.local` | Admin login email |
| `ADMIN_PASSWORD` | `admin` | Admin login password |

:::tip
Set these **before** running `db:seed` or starting the container for the first time. They are only used during initial seeding.
:::

## Reverse Proxy

If BandMate runs behind nginx, Traefik, Caddy, or another reverse proxy:

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_URL` | `http://localhost:3000` | Your public-facing URL. Used for email links, OAuth redirects, and cookie configuration. |

Example:

```bash
-e APP_URL="https://bandmate.yourdomain.com"
```

When `APP_URL` uses HTTPS, BandMate automatically enables the `Secure` flag on authentication cookies.

## Email Notifications (Optional)

Enable email notifications for invitations and activity updates:

| Variable | Default | Description |
|----------|---------|-------------|
| `EMAIL_ENABLED` | `false` | Set to `true` to enable email |
| `EMAIL_HOST` | `smtp.example.com` | SMTP server hostname |
| `EMAIL_PORT` | `587` | SMTP port |
| `EMAIL_SECURE` | `false` | Set to `true` for port 465 (SSL/TLS) |
| `EMAIL_USER` | -- | SMTP username |
| `EMAIL_PASS` | -- | SMTP password |
| `EMAIL_FROM` | `BandMate <noreply@bandmate.local>` | Sender address shown in emails |

### Example: Gmail SMTP

```bash
EMAIL_ENABLED=true
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="BandMate <your-email@gmail.com>"
```

:::note
Gmail requires an [App Password](https://support.google.com/accounts/answer/185833) if you have 2FA enabled.
:::

## Google OAuth (Optional)

Enable Google sign-in for your users:

| Variable | Default | Description |
|----------|---------|-------------|
| `GOOGLE_OAUTH_ENABLED` | `false` | Set to `true` to enable Google login |
| `GOOGLE_CLIENT_ID` | -- | From [Google Cloud Console](https://console.cloud.google.com/) |
| `GOOGLE_CLIENT_SECRET` | -- | From Google Cloud Console |
| `GOOGLE_CALLBACK_URL` | `http://localhost:3000/api/auth/google/callback` | OAuth callback URL |

### Setup Steps

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Navigate to **APIs & Services > Credentials**
4. Create an **OAuth 2.0 Client ID** (Web application type)
5. Add your callback URL to **Authorized redirect URIs**:
   - Development: `http://localhost:3000/api/auth/google/callback`
   - Production: `https://bandmate.yourdomain.com/api/auth/google/callback`
6. Copy the Client ID and Client Secret into your environment variables

## File Upload Limits

These limits are built into the application and are not configurable via environment variables:

| File Type | Max Size | Accepted Formats |
|-----------|----------|-----------------|
| Images | 5 MB | JPEG, PNG, GIF, WebP |
| Audio | 100 MB | MP3, WAV, OGG, FLAC, AAC, M4A |
| Stems (ZIP) | 500 MB | ZIP |

## Complete `.env` Example

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

# Google OAuth (optional)
GOOGLE_OAUTH_ENABLED=false
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
# GOOGLE_CALLBACK_URL=https://bandmate.yourdomain.com/api/auth/google/callback
```

## Next Steps

- **[User Guide](/docs/category/user-guide)** -- Learn how to use BandMate
- **[Deployment](/docs/deployment)** -- Production deployment guide
