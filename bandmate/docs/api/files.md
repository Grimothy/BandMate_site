---
sidebar_position: 4
title: Files API
---

# Files API

Endpoints for uploading, downloading, sharing, and managing files.

## Upload

### POST `/api/files/upload`

Upload a file to a cut.

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | file | Yes | The file to upload |
| `cutId` | string | Yes | The cut to attach the file to |
| `name` | string | No | Display name for the file |

The file type is automatically detected:
- Audio files (`.mp3`, `.wav`, `.ogg`, `.flac`, `.aac`, `.m4a`) are categorized as **CUT** type
- ZIP files (`.zip`) are categorized as **STEM** type
- Image files are categorized as **IMAGE** type

**Size limits:**

| Type | Max Size |
|------|----------|
| Audio | 100 MB |
| Stems (ZIP) | 500 MB |
| Images | 5 MB |

**Response:** `201 Created`

```json
{
  "id": "uuid",
  "name": "Final Mix.mp3",
  "type": "CUT",
  "size": 8532410,
  "mimeType": "audio/mpeg",
  "url": "/uploads/files/uuid.mp3",
  "uploadedBy": {
    "id": "uuid",
    "name": "User Name",
    "avatarUrl": "..."
  },
  "createdAt": "2026-02-10T00:00:00Z"
}
```

## Download

### GET `/api/files/:id/download`

Download a file. Requires project membership.

**Response:** File binary with appropriate `Content-Type` and `Content-Disposition` headers.

## Sharing

### POST `/api/files/:id/share`

Generate a secure share link for a file.

**Response:** `201 Created`

```json
{
  "shareUrl": "https://bandmate.yourdomain.com/share/token-string",
  "token": "token-string"
}
```

### GET `/api/share/:token`

Access a shared file using a share token. No authentication required.

**Response:** File binary or file metadata depending on the request.

## Storage

### GET `/api/files/storage`

Get storage usage statistics for the authenticated user.

**Response:** `200 OK`

```json
{
  "totalSize": 524288000,
  "fileCount": 42,
  "breakdown": {
    "audio": {
      "size": 419430400,
      "count": 35
    },
    "stems": {
      "size": 104857600,
      "count": 7
    }
  }
}
```

For admin users, the response includes site-wide storage totals across all users.

## Delete

### DELETE `/api/files/:id`

Delete a file. Removes both the database record and the file from disk.

**Response:** `200 OK`
