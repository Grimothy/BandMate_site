---
sidebar_position: 1
title: API Overview
---

# API Overview

BandMate exposes a RESTful API from the Express backend. All endpoints are prefixed with `/api`.

## Base URL

```
http://localhost:3000/api
```

In production, replace with your configured `APP_URL`.

## Authentication

Most endpoints require authentication. BandMate uses JWT tokens:

- **Access Token** -- Short-lived token sent in the `Authorization` header
- **Refresh Token** -- Long-lived token used to obtain new access tokens
- **Cookies** -- Used for WebSocket authentication

### Headers

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Token Refresh

When an access token expires, the client automatically requests a new one using the refresh token. This happens transparently via an Axios interceptor.

## Response Format

Successful responses return JSON:

```json
{
  "data": { ... },
  "message": "Success"
}
```

Error responses:

```json
{
  "error": "Error description",
  "statusCode": 400
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse. If you exceed the limit, you'll receive a `429 Too Many Requests` response.

## Core API Groups

| Group | Base Path | Description |
|-------|-----------|-------------|
| [Authentication](/docs/api/authentication) | `/api/auth` | Login, register, refresh tokens, OAuth |
| [Projects](/docs/api/projects) | `/api/projects` | CRUD operations on projects, vibes, cuts |
| [Files](/docs/api/files) | `/api/files` | Upload, download, share, storage info |
| [Comments](/docs/api/comments) | `/api/comments` | Timestamped comments and replies |
| [Real-time](/docs/api/realtime) | WebSocket | Socket.io events and channels |

## Common Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad request (validation error) |
| `401` | Unauthorized (missing or invalid token) |
| `403` | Forbidden (insufficient permissions) |
| `404` | Not found |
| `429` | Rate limited |
| `500` | Server error |
