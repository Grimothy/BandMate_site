---
sidebar_position: 9
title: Changelog
---

# Changelog

Complete release history for BandMate. See the [GitHub Releases](https://github.com/Grimothy/BandMate/releases) page for full details and downloadable assets.

## v1.4.2 -- 02/11/2026 {#v142}

**BandMate v1.4.2**

## What's New in v1.4.2

### 🚀 New Features

#### Improved Shared Audio Player UI/UX
- Redesigned shared audio player with immersive, centered layout
- Added `hideMetadata` prop to AudioPlayer component for cleaner mobile view
- Removed duplicate album art and track info on mobile
- Moved download button to header (subtle icon)
- Improved responsive padding across all screen sizes
- Consistent centered design for both mobile and desktop
- Better spacing and larger album art (320×320px desktop)

### 🔧 Infrastructure

#### Add Release Command Tooling
- Added release management command for automated versioning

---

**Full Changelog**: https://github.com/Grimothy/BandMate/compare/v1.4.1...v1.4.2

## v1.4.1 -- 02/10/2026 {#v141}

**BandMate v1.4.1**

Bug fix release - workflow consolidation and README updates

## V1.4.0 -- 02/10/2026 {#v140}

**v1.4.0**

# BandMate Release Notes

Complete release history for the BandMate project - a collaborative music production platform for bands and musicians.

---

## Table of Contents

- [Overview](#overview)
- [v1.4.0 (Latest) - 2026-02-10](#v140-latest---2026-02-10)
- [v1.3.0 - 2026-02-09](#v130---2026-02-09)
- [v1.2.0 - 2026-02-06](#v120---2026-02-06)
- [v1.1.0 - 2026-02-04](#v110---2026-02-04)
- [v1.0.0 - 2026-02-02](#v100---2026-02-02)
- [v0.9.0 - 2026-02-01](#v090---2026-02-01)
- [v0.8.0 - 2026-01-31](#v080---2026-01-31)
- [Project Inception - 2026-01-30](#project-inception---2026-01-30)

---

## Overview

BandMate is a full-stack collaborative music production platform designed to help bands and musicians organize, share, and collaborate on their music projects. The application provides a structured way to manage musical projects through Projects → Vibes → Cuts hierarchy.

### Key Technologies
- **Frontend:** React, TypeScript, Tailwind CSS, WaveSurfer.js
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL
- **Real-time:** Socket.io for live updates and notifications
- **Authentication:** OAuth (Google), JWT
- **File Storage:** Local filesystem with upload management
- **Deployment:** Docker, Docker Compose

---

## v1.4.0 (Latest) - 2026-02-10

### 🚀 New Features

#### Stem ZIP Upload Support
- **Commit:** 30430c1
- **Description:** Users can now upload stem ZIP files directly from the cut files tab
- **Changes:**
  - Updated file input to accept `.zip` files alongside audio files
  - Automatic file type detection (audio → CUT type, ZIP → STEM type)
  - Updated UI button label to "Upload Audio or Stems"

---

## v1.3.0 - 2026-02-09

### 🚀 New Features

#### Activity Dismissal & Deep Linking
- **Commit:** 490b89b
- **Description:** Enhanced activity feed with dismissal capabilities and deep linking
- **Features:**
  - Activity dismissal with undo functionality
  - Bulk dismissal operations
  - Deep linking to specific comments from notifications
  - Cut moving activities tracked and displayed

#### Drag-and-Drop Cut Moving
- **Commit:** 05e2c02
- **Description:** Implemented drag-and-drop functionality for moving cuts between vibes
- **Benefits:** Improved workflow for reorganizing cuts within projects

### 🐛 Bug Fixes

#### Build Fix
- **Commit:** 7d3948b
- **Description:** Removed unused `dismissActivity` import that was breaking the build

---

## v1.2.0 - 2026-02-06

### 🚀 New Features

#### Mobile-Friendly ActionSheet Menus
- **Commit:** 83939b6
- **Description:** Implemented responsive ActionSheet component for mobile devices
- **Benefits:** Better user experience on mobile with touch-friendly menu interactions

### ⚡ Performance Improvements

#### Backend Optimization
- **Commit:** aecb593
- **Description:** Major performance improvements to backend infrastructure
- **Changes:**
  - Implemented Prisma singleton pattern for database connections
  - Added rate limiting to API endpoints for security
  - Consolidated access checks for better security and performance

### 🔧 Infrastructure

#### Test File Management
- **Commit:** a4a0ebd
- **Description:** Added configuration to ignore test upload files from backend tests

#### CI/CD Adjustments
- **Commit:** da13448
- **Description:** Removed CI workflow configuration temporarily

---

## v1.1.0 - 2026-02-04

### 🚀 New Features

#### Activity Feed System
- **Commits:** 31542ba, 7277311, 76e1f0f
- **Description:** Comprehensive activity tracking and notification system
- **Components:**
  - **Backend (31542ba):** Database model, service layer, API endpoints, and activity creation hooks
  - **Frontend (7277311):** Activity feed UI in sidebar with real-time updates via WebSocket
  - **Testing (76e1f0f):** Comprehensive test coverage and bug fixes

### 🐛 Bug Fixes

#### OAuth Authentication
- **Commit:** 2612605
- **Description:** Fixed OAuth user activity notifications
- **Technical Details:** Changed from localStorage-based to cookie-based authentication for WebSocket connections

### 📚 Documentation

#### Mobile App Development Guide
- **Commit:** 4e069fa
- **Description:** Added comprehensive mobile app development guide for future mobile application

### 🔧 Infrastructure

#### CI/CD Updates
- **Commits:** 93ab5b5, 27868d7, 4d1c803
- **Description:** Temporarily disabled backend tests in CI to resolve build issues while tests are being refactored

---

## v1.0.0 - 2026-02-02

### 🚀 New Features

#### Media Session API Support
- **Commit:** 189e099
- **Description:** Added Media Session API support for lock screen media controls
- **Benefits:** Users can control playback from device lock screen and see now-playing information

### 🐛 Bug Fixes

#### Audio Player Fixes
- **Commit:** 5734a95
- **Description:** Fixed audio continuing to play when navigating away from FileExplorer

#### Shared File Links
- **Commit:** da4be0f
- **Description:** Fixed shared file links to work in incognito mode

#### Code Quality Improvements
- **Commits:** c7309c6, 8c1ea02, 34a47de
- **Description:** 
  - Addressed code review feedback on ref capture timing
  - Fixed Sonar warnings (readonly props, parseFloat/isFinite, globalThis)
  - Ensured WaveSurfer properly pauses/destroys and closes AudioContext on unmount

### ✨ UI Updates
- **Commit:** 4d180d3
- **Description:** General UI improvements and refinements

---

## v0.9.0 - 2026-02-01

### 🚀 New Features

#### Storage Display & Avatar Support
- **Commit:** 7afdee1
- **Description:** Added storage display in sidebar and avatar support throughout the app
- **Features:**
  - Storage usage indicator in sidebar
  - User avatars displayed across the application
  - Profile image support

#### Admin Storage Dashboard
- **Commits:** a6fa47d, 776545a
- **Description:** 
  - Admins can see total site storage usage
  - Users see only their own upload storage

### 🐛 Bug Fixes

#### Auth Context Fixes
- **Commits:** 343e54d, 165978f, dbe97d9
- **Description:**
  - Fixed infinite re-render loop in AuthContext and SocketContext
  - Prevented auth refresh loop on login page
  - Ensured storage refresh is called on auth initialization

---

## v0.8.0 - 2026-01-31

### 🚀 New Features

#### Configuration & Infrastructure
- **Commits:** 71705f1, cd463de
- **Description:** 
  - Simplified configuration management
  - Added reverse proxy support for deployment flexibility
  - Environment-based configuration

#### Invitations & OAuth
- **Description:** 
  - User invitation system for project collaboration
  - OAuth integration (Google) for authentication
  - Email-based invitation flow

### 📚 Documentation

#### README Updates
- **Commits:** a817308, 9080778
- **Description:** 
  - Revamped README with branding and feature details
  - Added project introduction with images
  - Comprehensive setup instructions

---

## Project Inception - 2026-01-30

### 🎉 Initial Commit
- **Commit:** e0486b0
- **Date:** 2026-01-30
- **Description:** Initial project setup with basic structure

### 📚 Documentation
- **Commit:** 65cf03b
- **Description:** Added README.md with project description and setup instructions

---

## Feature Highlights by Category

### 🎵 Audio Features
- Multi-track audio playback with WaveSurfer.js
- Waveform visualization with comment markers
- Media Session API integration (lock screen controls)
- Audio file upload and management
- Comment timestamps linked to audio positions
- Lyrics editor synchronized with audio playback

### 📁 File Management
- Hierarchical organization: Projects → Vibes → Cuts
- Support for audio files (MP3, WAV, etc.) and ZIP stem packages
- File upload with drag-and-drop
- Public/private sharing with tokenized links
- Storage usage tracking and quotas

### 👥 Collaboration
- User authentication (OAuth + JWT)
- Project invitations and member management
- Role-based access control (Admin, Member)
- Real-time notifications via WebSocket
- Activity feed with dismissal and deep linking
- Comment system with replies and timestamps

### 📱 Mobile Experience
- Responsive design with Tailwind CSS
- Mobile-friendly ActionSheet menus
- Touch-optimized interactions
- Mobile-specific UI components

### 🔒 Security
- Rate limiting on API endpoints
- Consolidated access checks
- Secure file sharing with expiring tokens
- Cookie-based authentication for WebSocket

### ⚡ Performance
- Prisma singleton for database optimization
- Lazy loading of audio components
- Optimized re-renders in React components
- Efficient file upload handling

---

## Version History Summary

| Version | Date | Key Features |
|---------|------|--------------|
| v1.4.0 | 2026-02-10 | Stem ZIP upload support |
| v1.3.0 | 2026-02-09 | Activity dismissal, drag-and-drop, deep linking |
| v1.2.0 | 2026-02-06 | Mobile ActionSheet, backend optimization |
| v1.1.0 | 2026-02-04 | Activity feed system, OAuth fixes |
| v1.0.0 | 2026-02-02 | Media Session API, audio fixes |
| v0.9.0 | 2026-02-01 | Storage display, avatars, auth fixes |
| v0.8.0 | 2026-01-31 | Configuration, invitations, OAuth |
| v0.1.0 | 2026-01-30 | Initial project setup |

---

## Contributors

- **@Grimothy** - Project Creator & Lead Developer

---

## Links

- **Repository:** https://github.com/Grimothy/BandMate
- **Documentation:** See README.md
- **Issues:** https://github.com/Grimothy/BandMate/issues

---

**Thank you for using BandMate! 🎵 Keep creating music together.**

*Last Updated: 2026-02-10*

## v1.3.4 -- 02/09/2026 {#v134}

# Release Notes - v1.3.4

## Release Date: February 9, 2026

### What's New ✨

**Activity Management Enhancements**

Activity Dismissal & Undo: Added bulk dismissal and individual undo functionality for activities
Deep Linking: Implemented deep linking for activity notifications to direct users to relevant content
Cut Movement: Enhanced cut management with the ability to move cuts between vibes
Drag-and-Drop Functionality

**Inter-Vibe Drag-and-Drop**
Implemented drag-and-drop interface for moving cuts between different vibes, improving workflow efficiency
Bug Fixes 🔧

**Build Fix**
 Removed unused dismissActivity import that was causing build failures
Changes 📝

**Commits: 4 commits since v1.3.3**
Files Changed: 68 files modified across frontend and backend
Test Status: Backend tests remain temporarily disabled in Docker configuration
Full Changelog: [V1.3.3...v1.3.4](https://github.com/Grimothy/BandMate/compare/V1.3.3...v1.3.4)

## V1.3.3 -- 02/06/2026 {#v133}

**v1.3.3**

**Full Changelog**: https://github.com/Grimothy/BandMate/compare/V1.3.2...V1.3.3

## V1.3.2 -- 02/04/2026 {#v132}

**v1.3.3**

## What's Changed
* Add activity feed to sidebar for project activity tracking by @Copilot in https://github.com/Grimothy/BandMate/pull/10


**Full Changelog**: https://github.com/Grimothy/BandMate/compare/v1.3.2...V1.3.2

## v1.3.2 -- 02/03/2026 {#v132}

## What's Changed
* Experimental by @Grimothy in https://github.com/Grimothy/BandMate/pull/8


**Full Changelog**: https://github.com/Grimothy/BandMate/compare/v1.3.1...v1.3.2

## v1.3.1 -- 02/03/2026 {#v131}

## What's Changed
* Stop audio playback on AudioPlayer unmount by @Copilot in https://github.com/Grimothy/BandMate/pull/7

## New Contributors
* @Copilot made their first contribution in https://github.com/Grimothy/BandMate/pull/7

**Full Changelog**: https://github.com/Grimothy/BandMate/compare/v20260202.153733...v1.3.1

## v20260202.153733 -- 02/02/2026 {#v20260202153733}

**Release 2026-02-02**

Fix for shared file links in incognito mode

- Fixed issue where shared links would redirect to login in incognito windows
- Improved authentication handling for public pages
- Various UI improvements and new components added

## 1.2.2 -- 02/02/2026 {#122}

## What's Changed
* Ui updates by @Grimothy in https://github.com/Grimothy/BandMate/pull/6


**Full Changelog**: https://github.com/Grimothy/BandMate/compare/v1.3.0...1.2.2

## v1.3.0 -- 02/02/2026 {#v130}

**v1.3.0 - Media Session API Support**

## What's New

### Media Session API for Lock Screen Controls
- Added `useMediaSession` hook for mobile lock screen playback controls
- Display track metadata (title, artist, album, artwork) on mobile lock screens  
- Show progress bar with position state on supported devices (iOS 15+, Android, macOS, Windows)
- Support play/pause, seek forward/backward actions from OS media controls
- Optional `onPreviousTrack`/`onNextTrack` callbacks for future playlist support

### Improvements
- Fall back to project image when vibe image is not available
- Backend endpoints now include project image in responses
- Proper cleanup of media session handlers on component unmount

### Browser Support
| Browser | Support |
|---------|---------|
| Chrome | Full |
| Edge | Full |
| Safari | Full (iOS 15+) |
| Firefox | Partial (no position state) |

---
**Full Changelog**: https://github.com/Grimothy/BandMate/compare/v1.2.1...v1.3.0

## v1.2.1 -- 02/01/2026 {#v121}

**v1.2.1 - Bug Fixes**

## Bug Fixes

- **Fix infinite page refresh loop on login**: Prevent auth token refresh interceptor from triggering on `/auth/*` endpoints, and avoid redirecting to login if already on login page
- **Fix React re-render loops**: Stabilize useEffect dependencies in AuthContext and SocketContext to prevent socket reconnection and state update loops
- **Fix storage display not loading**: Ensure `refreshStorage()` is called during auth initialization so the sidebar storage display populates correctly
- **Show storage on all screen sizes**: Remove desktop-only restriction from StorageDisplay component

## Full Changelog
https://github.com/Grimothy/BandMate/compare/v1.2.0...v1.2.1

## v1.2.0 -- 02/01/2026 {#v120}

**v1.2.0 - Storage Display & Avatar Support**

## What's New in v1.2.0

### Storage Display in Sidebar
A new storage indicator has been added to the sidebar, giving users visibility into their uploaded file usage.

**Features:**
- Displays total storage used by the current user
- Shows breakdown by file type:
  - **Audio files** (cuts) - shown with green indicator
  - **Stem files** (zips) - shown with blue indicator
- Displays total file count
- Updates on page refresh
- Hidden on mobile devices for a clean, compact UI

### Avatar Support Throughout the App
User avatars (from OAuth providers like Google) are now displayed consistently throughout the application.

**Where avatars appear:**
- Header user dropdown
- Admin Users list
- Comments and replies on cuts
- File upload attribution ("Uploaded by")
- Falls back to colored initials when no avatar is available

### Technical Improvements
- **New API endpoint:** `GET /api/files/storage` returns storage usage statistics
- **Auth middleware enhancement:** Now includes `avatarUrl` in the authenticated user object
- **Cookie security fix:** Secure flag is now only enforced when `APP_URL` uses HTTPS, improving local development experience

## Upgrade Notes
No database migrations required. Simply pull the latest changes and restart your server.

---

**Full Changelog:** https://github.com/Grimothy/BandMate/compare/v1.1.0...v1.2.0

## v1.1.0 -- 01/31/2026 {#v110}

## What's New

### Features
- **User Invitations** - Invite band members via email with customizable permissions
- **Google OAuth** - Optional single sign-on support
- **Reverse Proxy Support** - New `APP_URL` environment variable for deployments behind nginx/Traefik

### Improvements
- Simplified environment configuration with better documentation
- Updated `docker-compose.yml` with clearer options and comments
- Improved README with features list and configuration tables

### Configuration
See the updated [README](https://github.com/Grimothy/BandMate#configuration) for all environment variables.

**Full Changelog**: https://github.com/Grimothy/BandMate/compare/1.0.0...v1.1.0

## 1.0.0 -- 01/31/2026 {#100}

**Welcome to BandMate**

# 🎸 BandMate - Your Band's New Digital Studio
Hey there, music makers! Welcome to BandMate  - the collaboration platform that's about to make your band's creative workflow smoother than a jazz bassline. 🎵

## ✨ What's Under the Hood?

### 🎯 Smart Project Organization

Projects are your band's creative spaces - think of them as your digital rehearsal studios
Vibes live inside projects - these are your song ideas, themes, or experimental jam sessions
Cuts are the individual takes within each vibe - every version, every iteration, beautifully organized
Drag-and-drop reordering because life's too short for manual sorting

###🎧 Audio Management That Actually Works

Upload audio files and stems with ease (supports MP3, WAV, FLAC, OGG, and more!)
Real-time waveform visualization using Wavesurfer.js - see your music, not just hear it
Label your files with custom names so "final_FINAL_v3_actually_final.mp3" becomes a thing of the past
Support for stems (upload those multi-track ZIP files up to 500MB!)
File size limits that make sense: 100MB for regular audio, 500MB for stems
### 👥 Real-Time Collaboration

WebSocket-powered live updates - see changes as they happen, no refresh needed
Instant notifications when bandmates upload new files or make changes
Share files with external collaborators using secure share links
Role-based permissions: Admins and Members with granular project access controls

### 🔐 Authentication & Security

JWT-based authentication with refresh tokens for secure, persistent sessions
Cookie-based auth that just works™
Admin panel for user management
Per-project member permissions (some folks can create vibes, some can't - you decide!)

### 🎨 Beautiful, Modern UI

React 18 with TypeScript for that buttery-smooth experience
Tailwind CSS styling that looks good and loads fast
Radix UI components for accessible, polished interfaces
Vite for lightning-fast development and builds
Responsive design - works on your laptop, tablet, or phone

### 📁 File Explorer

Browse all your audio files across all projects in one place
Filter by project, vibe, or cut
Hierarchical view showing your entire creative catalog
Quick actions for editing, deleting, and sharing files
💬 Comments & Feedback

Leave timestamped comments on audio files
Collaborate asynchronously - drop feedback whenever inspiration strikes
Never lose track of what needs fixing or what's working

### 🔔 Smart Notifications

Real-time toast notifications when stuff happens
Notification center to review what you missed
Links directly to the relevant content
Automatic cleanup of old notifications (because nobody needs 6-month-old updates)

### 🐳 Production-Ready Deployment

Docker support with multi-stage builds
Health check endpoints
Automatic database migrations and seeding
Environment-based configuration
Nginx-ready static file serving

## 🛠️ Technical Stack (For the Nerds 🤓)

### Frontend:

React 18 + TypeScript
Vite (blazing fast!)
Tailwind CSS + Radix UI
Socket.io client
Axios for API calls
Backend:

Node.js + Express
TypeScript throughout
Prisma ORM (SQLite by default, scales to PostgreSQL)
Socket.io for real-time magic
Multer for file uploads
JWT authentication
Database Models:

Users → Projects (many-to-many with permissions)
Projects → Vibes → Cuts → Files
Comments, Notifications, Share Tokens
Refresh Tokens for secure sessions

## 🚀 What This Means For You
No more:

🚫 Confusing Dropbox folders with 47 versions of the same file
🚫 "Did you hear the latest mix?" followed by sending the wrong link
🚫 Lost feedback buried in text message threads
🚫 Wondering who uploaded what and when
Just:

✅ Organized projects with clear structure
✅ Real-time updates when your bandmates make changes
✅ Beautiful waveforms and intuitive playback
✅ Secure sharing with people outside your core team
✅ A single source of truth for your band's creative work

## 🎉 Ready to Rock?
BandMate is production-ready and waiting for your band to make some noise. Whether you're tracking demos in your bedroom or collaborating across continents, we've got you covered.

Now stop reading these release notes and go make some music! 🎸🥁🎹

Full Changelog: https://github.com/Grimothy/BandMatev2/commits/1.0.0

