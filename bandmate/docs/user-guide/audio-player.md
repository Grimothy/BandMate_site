---
sidebar_position: 2
title: Audio Player & Waveforms
---

# Audio Player & Waveforms

BandMate includes a built-in audio player with interactive waveform visualization powered by [WaveSurfer.js](https://wavesurfer.xyz/).

## Waveform Display

When you open a cut, its audio file is rendered as an interactive waveform. The waveform shows:

- The full amplitude of the track over time
- A playback cursor showing current position
- Comment markers at timestamped positions
- A progress bar indicating how far through the track you are

### Interacting with the Waveform

- **Click anywhere** on the waveform to jump to that position
- **Click and drag** to scrub through the audio
- **Hover** over comment markers to see previews

## Playback Controls

The audio player provides standard controls:

| Control | Action |
|---------|--------|
| Play/Pause | Start or pause playback |
| Seek Forward | Jump forward in the track |
| Seek Backward | Jump backward in the track |

## Media Session API (Lock Screen Controls)

BandMate integrates with the [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API), which means you can control playback from:

- Your phone's lock screen
- Desktop media controls (macOS, Windows)
- Bluetooth device buttons

### What's Displayed

- **Track title** (cut name)
- **Artist** (project name)
- **Album artwork** (vibe image, falling back to project image)
- **Progress bar** with current position (on supported platforms)

### Browser Support

| Browser | Support Level |
|---------|--------------|
| Chrome | Full support |
| Edge | Full support |
| Safari | Full support (iOS 15+) |
| Firefox | Partial (no position state) |

## Audio Cleanup

BandMate properly manages audio resources:

- Navigating away from a cut automatically stops playback
- WaveSurfer instances are destroyed when the component unmounts
- AudioContext is properly closed to free system resources
- No audio continues playing in the background unexpectedly

## Supported Audio Formats

| Format | Extension |
|--------|-----------|
| MP3 | `.mp3` |
| WAV | `.wav` |
| OGG | `.ogg` |
| FLAC | `.flac` |
| AAC | `.aac` |
| M4A | `.m4a` |

The maximum file size for audio uploads is **100 MB**.

## Stem Playback

Stems uploaded as ZIP packages are stored separately from regular audio cuts. While stems aren't played directly in the waveform viewer, they can be downloaded by any project member for local mixing.

As of v1.4.0, stem ZIP files can be uploaded directly from the cut files tab alongside regular audio files.
