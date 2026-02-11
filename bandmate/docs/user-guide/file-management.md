---
sidebar_position: 4
title: File Management & Storage
---

# File Management & Storage

BandMate provides comprehensive file management for audio files, stems, and images.

## File Types & Limits

| File Type | Max Size | Accepted Formats | Category |
|-----------|----------|-----------------|----------|
| Audio | 100 MB | MP3, WAV, OGG, FLAC, AAC, M4A | CUT |
| Stems | 500 MB | ZIP | STEM |
| Images | 5 MB | JPEG, PNG, GIF, WebP | IMAGE |

### Automatic Type Detection

When uploading files from the cut files tab, BandMate automatically detects the file type:
- Audio files (`.mp3`, `.wav`, etc.) are categorized as **CUT** type
- ZIP files (`.zip`) are categorized as **STEM** type

This was introduced in v1.4.0, allowing you to upload both audio and stems from the same interface.

## File Explorer

The File Explorer provides a unified view of all your audio files across all projects:

- Browse files organized by project, vibe, and cut
- Hierarchical tree view showing your entire catalog
- Quick actions: edit, delete, share
- Filter by project or search by name

## Uploading Files

### Audio Files

1. Navigate to a cut
2. Open the **Files** tab
3. Click **Upload Audio or Stems**
4. Select one or more files
5. Files are uploaded and automatically categorized

### Stem Packages

Stems are uploaded as ZIP files containing individual track stems (e.g., vocals, drums, bass, guitar). Upload them the same way as audio files -- BandMate detects the `.zip` extension and categorizes them as stems.

### Project Images

Project and vibe cover images can be set from their respective settings panels. Images are used as:
- Project thumbnails on the dashboard
- Vibe headers
- Album artwork in Media Session API (lock screen controls)

## Sharing Files

### Secure Share Links

You can share individual files with people outside your project:

1. Click the share icon on any file
2. A tokenized link is generated
3. Share the link with anyone -- they can access the file without logging in
4. Links work in incognito mode (fixed in v1.0.0)

Share links use secure tokens for access control.

## Storage Display

The sidebar shows a storage usage indicator:

- **Total storage used** by the current user
- **Breakdown by file type:**
  - Audio files (green indicator)
  - Stem files (blue indicator)
- **Total file count**

### Admin View

Administrators see additional storage information:
- Total site-wide storage usage across all users
- Per-user storage breakdown

Regular users only see their own upload storage.

## Data Persistence

When running with Docker, BandMate stores data in two locations:

| Volume | Path | Contains |
|--------|------|----------|
| `data` | `/app/data` | SQLite database (`bandmate.db`) |
| `uploads` | `/app/uploads` | All uploaded files |

:::warning Backup These Volumes
Always mount these as Docker volumes and include them in your backup strategy. Without volume mounts, data is lost when the container is recreated.
:::

### Backup Strategy

```bash
# Stop the container to ensure data consistency
docker stop bandmate

# Back up the data directory
tar -czf bandmate-backup-$(date +%Y%m%d).tar.gz ./data ./uploads

# Restart
docker start bandmate
```

## API Endpoint

Storage information is available via the API:

```
GET /api/files/storage
```

Returns storage usage statistics for the authenticated user (or all users for admins).
