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
        console.log('[github-releases] Fetching releases from GitHub API...');
        const response = await fetch('https://api.github.com/repos/Grimothy/BandMate/releases', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Docusaurus-Plugin'
          }
        });

        console.log(`[github-releases] API response status: ${response.status}`);

        if (!response.ok) {
          console.warn(`[github-releases] Could not fetch GitHub releases (status ${response.status}), using fallback`);
          return getFallbackData();
        }

        const releases: GitHubRelease[] = await response.json();
        console.log(`[github-releases] Found ${releases.length} releases`);

        if (releases.length === 0) {
          console.warn('[github-releases] No releases found, using fallback');
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
      console.log(`[github-releases] Setting global data with version: ${content.latest.tagName}`);
      setGlobalData({releases: content});
    },
  };
}

function getFallbackData() {
  console.log('[github-releases] Using fallback data for v1.4.1');
  return {
    latest: {
      version: '1.4.1',
      tagName: 'v1.4.1',
      name: 'BandMate v1.4.1',
      date: 'Feb 2026',
      fullDate: '2026-02-11',
      url: 'https://github.com/Grimothy/BandMate/releases/tag/v1.4.1',
      notes: ''
    },
    allReleases: []
  };
}