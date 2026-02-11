---
sidebar_position: 2
title: Authentication API
---

# Authentication API

Endpoints for user authentication, registration, and session management.

## Endpoints

### POST `/api/auth/register`

Create a new user account.

**Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "Display Name"
}
```

**Response:** `201 Created`

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "Display Name",
    "role": "MEMBER"
  },
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token"
}
```

### POST `/api/auth/login`

Authenticate with email and password.

**Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:** `200 OK`

Returns the same structure as registration, plus sets authentication cookies for WebSocket connections.

### POST `/api/auth/refresh`

Exchange a refresh token for a new access token.

**Body:**

```json
{
  "refreshToken": "current-refresh-token"
}
```

**Response:** `200 OK`

```json
{
  "accessToken": "new-jwt-access-token",
  "refreshToken": "new-jwt-refresh-token"
}
```

### POST `/api/auth/logout`

Invalidate the current refresh token and clear authentication cookies.

**Response:** `200 OK`

### GET `/api/auth/me`

Get the currently authenticated user's profile.

**Headers:** Requires `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Display Name",
  "role": "ADMIN",
  "avatarUrl": "https://..."
}
```

## Google OAuth

When Google OAuth is enabled, the following endpoints are available:

### GET `/api/auth/google`

Redirects the user to Google's OAuth consent screen.

### GET `/api/auth/google/callback`

Handles the OAuth callback from Google. On success, creates or links the user account and redirects to the app with authentication cookies set.

## Token Behavior

- **Access tokens** expire after a short period (typically 15 minutes)
- **Refresh tokens** are longer-lived and stored in the database
- **Cookie-based auth** is used for WebSocket connections, set automatically on login
- Tokens are invalidated on logout
- The Axios interceptor on the frontend automatically refreshes expired access tokens
