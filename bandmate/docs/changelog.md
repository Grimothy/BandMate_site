---
sidebar_position: 9
title: Changelog
---

# Changelog

Complete release history for BandMate. See the [GitHub Releases](https://github.com/Grimothy/BandMate/releases) page for full details and downloadable assets.

## v1.4.0 -- 2026-02-10 {#v140}

**Stem ZIP Upload Support**

- Users can upload stem ZIP files directly from the cut files tab
- File input accepts `.zip` files alongside audio files
- Automatic file type detection: audio files categorized as CUT, ZIP files as STEM
- UI button label updated to "Upload Audio or Stems"

## v1.3.4 -- 2026-02-09 {#v134}

**Activity Management & Drag-and-Drop**

- Activity dismissal with undo functionality
- Bulk dismissal operations for clearing the activity feed
- Deep linking from notifications to specific comments and content
- Drag-and-drop interface for moving cuts between vibes
- Build fix: removed unused import that was causing build failures

## v1.3.3 -- 2026-02-06 {#v133}

**Mobile ActionSheet & Backend Optimization**

- Mobile-friendly ActionSheet component for touch interactions
- Prisma singleton pattern for efficient database connections
- Rate limiting on API endpoints
- Consolidated access checks for improved security and performance

## v1.3.2 -- 2026-02-04 {#v132}

**Activity Feed System**

- Activity feed UI in sidebar with real-time updates via WebSocket
- Backend activity tracking: database model, service layer, API endpoints
- Activity creation hooks for automatic event tracking
- Comprehensive test coverage for the activity system
- OAuth authentication fix: cookie-based auth for WebSocket connections

## v1.3.1 -- 2026-02-03 {#v131}

**Audio Playback Fix**

- Fixed audio continuing to play when navigating away from the FileExplorer
- Proper cleanup of WaveSurfer instances on component unmount

## v1.3.0 -- 2026-02-02 {#v130}

**Media Session API Support**

- `useMediaSession` hook for lock screen playback controls
- Track metadata display (title, artist, album artwork) on mobile lock screens
- Progress bar with position state on supported platforms
- Play/pause, seek forward/backward from OS media controls
- Fallback to project image when vibe image is unavailable
- Backend endpoints now include project image in responses

## Release 2026-02-02 {#release-20260202}

**Shared Links Fix**

- Fixed shared file links working in incognito mode
- Improved authentication handling for public pages

## v1.2.2 -- 2026-02-02 {#v122}

**UI Updates**

- General UI improvements and refinements
- Code quality: addressed ref capture timing, Sonar warnings
- WaveSurfer properly pauses/destroys and closes AudioContext on unmount

## v1.2.1 -- 2026-02-02 {#v121}

**Bug Fixes**

- Fixed infinite page refresh loop on login
- Fixed React re-render loops in AuthContext and SocketContext
- Fixed storage display not loading on initialization
- Storage display now visible on all screen sizes

## v1.2.0 -- 2026-02-01 {#v120}

**Storage Display & Avatar Support**

- Storage usage indicator in sidebar with breakdown by file type
- User avatars from OAuth providers displayed throughout the app
- Colored initials fallback when no avatar is available
- New API endpoint: `GET /api/files/storage`
- Auth middleware now includes `avatarUrl` in the user object
- Cookie security: Secure flag only enforced when `APP_URL` uses HTTPS

## v1.1.0 -- 2026-01-31 {#v110}

**Invitations, OAuth & Reverse Proxy**

- User invitation system for project collaboration
- Google OAuth integration for single sign-on
- Reverse proxy support via `APP_URL` environment variable
- Simplified environment configuration
- Updated documentation with configuration tables

## v1.0.0 -- 2026-01-31 {#v100}

**Initial Release**

BandMate's first stable release with the complete feature set:

- Project organization with Projects, Vibes, and Cuts hierarchy
- Audio file management with waveform visualization (WaveSurfer.js)
- Real-time collaboration via WebSocket (Socket.io)
- JWT authentication with refresh tokens
- Timestamped comments on audio tracks with reply threads
- File Explorer for browsing all files across projects
- Notification system with toast notifications and notification center
- User management with role-based permissions
- Docker deployment with multi-stage builds and health checks
- Support for MP3, WAV, FLAC, OGG, AAC, M4A audio formats
- Stem upload support (ZIP, up to 500 MB)
- Image upload for project and vibe covers

## v0.1.0 -- 2026-01-30 {#v010}

**Project Inception**

- Initial project setup with basic structure
- README with project description and setup instructions
