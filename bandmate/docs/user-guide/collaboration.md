---
sidebar_position: 3
title: Collaboration
---

# Collaboration

BandMate is built for real-time collaboration. This page covers comments, invitations, notifications, and the activity feed.

## Timestamped Comments

The core of BandMate's collaboration is timestamped comments on audio tracks.

### Leaving a Comment

1. Open a cut with an audio file
2. Click on the waveform at the position you want to reference
3. Type your comment in the input field
4. Submit the comment

The comment is pinned to that exact timestamp. Other users see a marker on the waveform and can click it to jump to that moment.

### Reply Threads

Comments support threaded replies. Click **Reply** on any comment to start a discussion. This keeps feedback organized -- each conversation stays attached to its specific timestamp.

### Deep Linking

When you receive a notification about a comment, clicking it takes you directly to:
- The correct project
- The correct vibe and cut
- The exact comment, scrolled into view

This was introduced in v1.3.0 and makes it easy to respond to feedback without hunting through the interface.

## User Invitations

### Inviting Members

1. Open the project you want to invite someone to
2. Go to project settings or the members panel
3. Enter the person's email address
4. Choose a role:
   - **Admin** -- Full control over the project
   - **Member** -- Can upload, comment, and create vibes/cuts
5. Send the invitation

If email is configured, the invited user receives an email with a link to join. If email is not configured, you'll need to share the invitation link manually.

### Permissions

| Action | Admin | Member |
|--------|-------|--------|
| Upload files | Yes | Yes |
| Create vibes/cuts | Yes | Yes |
| Leave comments | Yes | Yes |
| Delete content | Yes | No |
| Manage members | Yes | No |
| Edit project settings | Yes | No |

## Activity Feed

The activity feed tracks everything happening in your projects. It appears in the sidebar and shows:

- New file uploads
- Comments and replies
- Cut creation and deletion
- Cuts moved between vibes
- Member joins and invitations

### Activity Dismissal

Activities can be dismissed individually or in bulk:

- **Single dismiss:** Click the dismiss button on any activity item
- **Bulk dismiss:** Use the "Dismiss all" option to clear the feed
- **Undo:** Accidentally dismissed something? Use the undo option that appears briefly after dismissal

### Real-Time Updates

The activity feed updates in real-time via WebSocket connections. When a bandmate uploads a file or leaves a comment, you see it immediately without refreshing the page.

## Notifications

BandMate sends notifications for important events:

- New comments on your cuts
- New file uploads in your projects
- Invitation responses
- Activity in projects you're a member of

Notifications appear as:
1. **Toast notifications** -- Brief pop-ups for immediate awareness
2. **Notification center** -- A persistent list you can review later
3. **Email notifications** -- If email is configured in your deployment

## Authentication Options

### Standard Login

BandMate uses JWT (JSON Web Token) authentication with:
- **Access tokens** for API requests
- **Refresh tokens** for persistent sessions
- **Cookie-based auth** for WebSocket connections

### Google OAuth

When enabled, users can sign in with their Google account:
- Avatars are automatically imported from Google
- Accounts are linked by email address
- Both standard and OAuth login can be used simultaneously

See [Configuration](/docs/configuration#google-oauth-optional) for setup instructions.
