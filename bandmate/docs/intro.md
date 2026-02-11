---
sidebar_position: 1
slug: /intro
title: Introduction
---

# Introduction

BandMate is a self-hosted, collaborative music production platform designed for bands and musicians. It provides a structured workspace where you can organize projects, upload audio files and stems, visualize waveforms, leave timestamped feedback, and collaborate in real-time with your bandmates.

## Why BandMate?

If you've ever shared music files through Dropbox, Google Drive, or group chats, you know the pain:

- Folders full of `final_mix_v3_ACTUALLY_FINAL.mp3`
- Feedback buried in text threads with no way to reference a specific moment
- No clear organization for which version is which
- Files scattered across multiple platforms

BandMate solves all of this with a purpose-built platform for band collaboration.

## Core Concepts

BandMate organizes your music using a three-level hierarchy:

| Level | What It Represents | Example |
|-------|-------------------|---------|
| **Project** | Your band's workspace | "Summer EP" |
| **Vibe** | A song idea or theme | "Sunset Groove" |
| **Cut** | An individual take or mix | "Demo v1", "Final Master" |

This hierarchy mirrors how bands actually think about their music, making it natural to find and manage every version of every idea.

## Key Features

- **Real-time collaboration** via WebSockets -- see changes as they happen
- **Audio waveform visualization** with WaveSurfer.js
- **Timestamped comments** pinned to exact moments in tracks
- **File management** for audio (MP3, WAV, FLAC, etc.), stems (ZIP), and images
- **User invitations** with role-based permissions (Admin, Member)
- **Activity feed** with notifications and deep linking
- **Media Session API** for lock screen playback controls
- **Google OAuth** for optional single sign-on
- **Self-hosted** with Docker -- your data stays on your server

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite, Tailwind CSS, Radix UI |
| Backend | Node.js, Express, TypeScript, Prisma ORM |
| Database | SQLite (default), PostgreSQL (optional) |
| Real-time | Socket.io |
| Auth | JWT + optional Google OAuth |
| Audio | WaveSurfer.js |
| Deployment | Docker, Docker Compose |

## Next Steps

- **[Installation](/docs/installation)** -- Get BandMate running in under a minute
- **[Configuration](/docs/configuration)** -- Customize environment variables
- **[User Guide](/docs/category/user-guide)** -- Learn how to use BandMate
