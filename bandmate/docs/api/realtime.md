---
sidebar_position: 6
title: Real-Time Events
---

# Real-Time Events

BandMate uses [Socket.io](https://socket.io/) for real-time bidirectional communication between the server and connected clients.

## Connection

The client connects to the Socket.io server at the same origin as the API:

```typescript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  withCredentials: true,  // Send cookies for authentication
});
```

### Authentication

WebSocket connections are authenticated using **cookies** set during login. This approach was chosen over token-based WebSocket auth because:

- It works reliably after OAuth redirects
- Cookies are sent automatically with the connection handshake
- No need to pass tokens through query parameters

## Events

### Server to Client

These events are emitted by the server and received by connected clients:

| Event | Payload | Description |
|-------|---------|-------------|
| `file:uploaded` | File object | A new file was uploaded to a project |
| `comment:created` | Comment object | A new comment was posted on a cut |
| `comment:reply` | Reply object | A reply was added to a comment |
| `cut:created` | Cut object | A new cut was created |
| `cut:moved` | `{ cutId, fromVibeId, toVibeId }` | A cut was moved between vibes |
| `cut:deleted` | `{ cutId }` | A cut was deleted |
| `vibe:created` | Vibe object | A new vibe was created |
| `activity:new` | Activity object | New activity feed item |
| `notification:new` | Notification object | New notification for the user |
| `member:joined` | Member object | A new member joined the project |

### Client to Server

| Event | Payload | Description |
|-------|---------|-------------|
| `join:project` | `{ projectId }` | Subscribe to events for a specific project |
| `leave:project` | `{ projectId }` | Unsubscribe from project events |

## Rooms

Socket.io rooms are used to scope events to specific projects:

- When a user opens a project, the client emits `join:project`
- The server adds the socket to the project's room
- Events for that project are broadcast only to sockets in that room
- When the user navigates away, the client emits `leave:project`

## Activity Feed Updates

The activity feed receives real-time updates through the `activity:new` event. Activities are created automatically when:

- Files are uploaded
- Comments are posted
- Cuts are created, deleted, or moved
- Vibes are created or deleted
- Members join or leave

Each activity includes:
- The action type
- The actor (user who performed the action)
- The target (what was affected)
- A timestamp
- Deep link information for navigation

## Error Handling

Socket.io automatically handles:
- **Reconnection** -- If the connection drops, it reconnects with exponential backoff
- **Buffering** -- Events emitted during disconnection are buffered and sent on reconnect
- **Fallback** -- Falls back to HTTP long-polling if WebSocket is not available

## Frontend Context

The frontend manages the Socket.io connection through a `SocketContext` React context provider:

- The connection is established when the user authenticates
- It automatically joins/leaves project rooms as the user navigates
- Event listeners are set up for real-time updates to the UI
- The connection is cleaned up on logout
