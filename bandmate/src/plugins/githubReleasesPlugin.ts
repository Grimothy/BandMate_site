/**
 * Docusaurus plugin to fetch GitHub releases at build time
 * This fetches the latest release info automatically when the site builds
 */

import type {Plugin} from '@docusaurus/types';

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  html_url: string;
}

export default function githubReleasesPlugin(): Plugin {
  return {
    name: 'github-releases',
    
    async loadContent() {
      try {
        // Fetch releases from GitHub API
        const response = await fetch('https://api.github.com/repos/Grimothy/BandMate/releases', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Docusaurus-Plugin'
          }
        });
        
        if (!response.ok) {
          console.warn('Could not fetch GitHub releases, using fallback');
          return getFallbackData();
        }
        
        const releases: GitHubRelease[] = await response.json();
        
        if (releases.length === 0) {
          return getFallbackData();
        }
        
        // Sort by date (newest first)
        releases.sort((a, b) => 
          new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        );
        
        const latest = releases[0];
        const version = latest.tag_name.replace(/^v/, '');
        
        // Format date nicely (e.g., "Feb 2026")
        const date = new Date(latest.published_at);
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        });
        
        return {
          latest: {
            version,
            tagName: latest.tag_name,
            name: latest.name,
            date: formattedDate,
            fullDate: latest.published_at,
            url: latest.html_url,
            notes: latest.body
          },
          allReleases: releases.map(r => ({
            version: r.tag_name.replace(/^v/, ''),
            tagName: r.tag_name,
            name: r.name,
            date: new Date(r.published_at).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            }),
            url: r.html_url,
            notes: r.body
          }))
        };
      } catch (error) {
        console.warn('Failed to fetch GitHub releases:', error);
        return getFallbackData();
      }
    },
    
    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData({releases: content});
    },
  };
}

function getFallbackData() {
  return {
    latest: {
      version: '1.4.0',
      tagName: 'v1.4.0',
      name: 'v1.4.0',
      date: 'Feb 2026',
      fullDate: '2026-02-10',
      url: 'https://github.com/Grimothy/BandMate/releases/tag/v1.4.0',
      notes: ''
    },
    allReleases: []
  };
}