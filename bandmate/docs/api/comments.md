---
sidebar_position: 5
title: Comments API
---

# Comments API

Endpoints for timestamped comments and replies on cuts.

## List Comments

### GET `/api/cuts/:cutId/comments`

Get all comments for a cut, ordered by timestamp.

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "text": "The bridge section needs more reverb",
    "timestamp": 127.5,
    "createdAt": "2026-02-10T14:30:00Z",
    "user": {
      "id": "uuid",
      "name": "User Name",
      "avatarUrl": "..."
    },
    "replies": [
      {
        "id": "uuid",
        "text": "Agreed, I'll add some in the next mix",
        "createdAt": "2026-02-10T15:00:00Z",
        "user": {
          "id": "uuid",
          "name": "Other User",
          "avatarUrl": "..."
        }
      }
    ]
  }
]
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Comment UUID |
| `text` | string | Comment content |
| `timestamp` | number | Position in the audio track (seconds) |
| `createdAt` | string | ISO 8601 timestamp |
| `user` | object | Author info (id, name, avatarUrl) |
| `replies` | array | Threaded replies to this comment |

## Create Comment

### POST `/api/cuts/:cutId/comments`

Add a timestamped comment to a cut.

**Body:**

```json
{
  "text": "The bridge section needs more reverb",
  "timestamp": 127.5
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | Yes | Comment content |
| `timestamp` | number | Yes | Position in the track (seconds from start) |

**Response:** `201 Created`

The comment is broadcast to all connected project members via WebSocket.

## Reply to Comment

### POST `/api/comments/:commentId/replies`

Add a reply to an existing comment.

**Body:**

```json
{
  "text": "Agreed, I'll add some in the next mix"
}
```

**Response:** `201 Created`

Replies are also broadcast via WebSocket and trigger notifications for the original comment author.

## Delete Comment

### DELETE `/api/comments/:id`

Delete a comment. Only the comment author or a project admin can delete comments.

**Response:** `200 OK`

## Waveform Integration

Comments are displayed as markers on the audio waveform in the frontend:
- Each comment's `timestamp` corresponds to a position on the waveform
- Clicking a marker scrolls to that comment in the comment list
- Clicking a comment in the list jumps the playback position to that timestamp
- Deep links from notifications navigate directly to the relevant comment
