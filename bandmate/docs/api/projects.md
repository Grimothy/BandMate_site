---
sidebar_position: 3
title: Projects API
---

# Projects API

Endpoints for managing projects, vibes, cuts, and project membership.

## Projects

### GET `/api/projects`

List all projects the authenticated user is a member of.

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "name": "Summer EP",
    "description": "Our summer recording project",
    "imageUrl": "/uploads/project-image.jpg",
    "createdAt": "2026-01-31T00:00:00Z",
    "memberCount": 4,
    "role": "ADMIN"
  }
]
```

### POST `/api/projects`

Create a new project.

**Body:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Project name |
| `description` | string | No | Project description |
| `image` | file | No | Cover image (JPEG, PNG, GIF, WebP, max 5 MB) |

**Response:** `201 Created`

### GET `/api/projects/:id`

Get project details including vibes, cuts, and members.

**Response:** `200 OK`

### PUT `/api/projects/:id`

Update project name, description, or image.

**Response:** `200 OK`

### DELETE `/api/projects/:id`

Delete a project and all its contents. Requires Admin role.

**Response:** `200 OK`

## Members

### POST `/api/projects/:id/invite`

Invite a user to the project by email.

**Body:**

```json
{
  "email": "bandmate@example.com",
  "role": "MEMBER"
}
```

**Response:** `201 Created`

### DELETE `/api/projects/:id/members/:userId`

Remove a member from the project. Requires Admin role.

**Response:** `200 OK`

## Vibes

### POST `/api/projects/:projectId/vibes`

Create a new vibe within a project.

**Body:**

```json
{
  "name": "Sunset Groove"
}
```

**Response:** `201 Created`

### PUT `/api/vibes/:id`

Update a vibe's name or image.

**Response:** `200 OK`

### DELETE `/api/vibes/:id`

Delete a vibe and all its cuts.

**Response:** `200 OK`

### PUT `/api/vibes/reorder`

Reorder vibes within a project.

**Body:**

```json
{
  "vibeIds": ["uuid-1", "uuid-2", "uuid-3"]
}
```

**Response:** `200 OK`

## Cuts

### POST `/api/vibes/:vibeId/cuts`

Create a new cut within a vibe.

**Body:**

```json
{
  "name": "Demo v1"
}
```

**Response:** `201 Created`

### PUT `/api/cuts/:id`

Update a cut's name.

**Response:** `200 OK`

### DELETE `/api/cuts/:id`

Delete a cut and its associated files.

**Response:** `200 OK`

### PUT `/api/cuts/:id/move`

Move a cut to a different vibe (used by drag-and-drop).

**Body:**

```json
{
  "targetVibeId": "uuid"
}
```

**Response:** `200 OK`

## Access Control

All project endpoints enforce membership checks:

- Only project members can access project data
- Admin-only actions (delete project, manage members) require the `ADMIN` role
- Access checks are consolidated in middleware for consistent enforcement
