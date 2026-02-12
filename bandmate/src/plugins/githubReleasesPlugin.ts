/**
 * Docusaurus plugin to fetch GitHub releases at build time
 * This fetches the latest release info automatically when the site builds
 * Also auto-generates the changelog.md file from GitHub releases
 */

import type {Plugin} from '@docusaurus/types';
import * as fs from 'fs';
import * as path from 'path';

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  html_url: string;
}

interface ReleaseData {
  latest: {
    version: string;
    tagName: string;
    name: string;
    date: string;
    fullDate: string;
    url: string;
    notes: string;
  };
  allReleases: Array<{
    version: string;
    tagName: string;
    name: string;
    date: string;
    url: string;
    notes: string;
  }>;
  contributors: Array<{
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
  }>;
}

export default function githubReleasesPlugin(): Plugin {
  return {
    name: 'github-releases',

    async loadContent() {
      try {
        // Fetch releases from GitHub API
        console.log('[github-releases] Fetching releases from GitHub API...');
        const releaseRes = await fetch('https://api.github.com/repos/Grimothy/BandMate/releases', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Docusaurus-Plugin'
          }
        });

        // Fetch contributors from GitHub API
        console.log('[github-releases] Fetching contributors from GitHub API...');
        const contributorsRes = await fetch('https://api.github.com/repos/Grimothy/BandMate/contributors', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Docusaurus-Plugin'
          }
        });

        console.log(`[github-releases] Releases response status: ${releaseRes.status}`);
        console.log(`[github-releases] Contributors response status: ${contributorsRes.status}`);

        if (!releaseRes.ok || !contributorsRes.ok) {
          console.warn('[github-releases] Could not fetch data, using fallback');
          return getFallbackData();
        }

        const releases: GitHubRelease[] = await releaseRes.json();
        const contributorsData = await contributorsRes.json();
        
        // Filter out bots and non-human contributors
        const excludedLogins = ['copilot', 'actions-user', 'github-actions[bot]', 'github-actions'];
        const filteredContributors = Array.isArray(contributorsData) 
          ? contributorsData.filter((c: any) => !excludedLogins.includes(c.login.toLowerCase()))
          : [];

        console.log(`[github-releases] Found ${releases.length} releases, ${filteredContributors.length} contributors (filtered from ${contributorsData.length})`);

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
        
        const data = {
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
          })),
          contributors: filteredContributors.map((c: any) => ({
            login: c.login,
            avatar_url: c.avatar_url,
            html_url: c.html_url,
            contributions: c.contributions
          }))
        };

        // Generate changelog from releases
        await generateChangelog(releases);
        
        return data;
      } catch (error) {
        console.warn('Failed to fetch GitHub releases or contributors:', error);
        return getFallbackData();
      }
    },
    
    async contentLoaded({content, actions}: {content: ReleaseData; actions: any}) {
      const {setGlobalData} = actions;
      console.log(`[github-releases] Setting global data with version: ${content.latest.tagName}`);
      setGlobalData({releases: content});
    },
  };
}

async function generateChangelog(releases: GitHubRelease[]): Promise<void> {
  console.log('[github-releases] Generating changelog from GitHub releases...');
  
  try {
    // Get the project root (bandmate directory)
    const docsPath = path.join(process.cwd(), 'docs', 'changelog.md');
    
    // Build the changelog content
    let changelog = `---
sidebar_position: 9
title: Changelog
---

# Changelog

Complete release history for BandMate. See the [GitHub Releases](https://github.com/Grimothy/BandMate/releases) page for full details and downloadable assets.

`;

    // Add each release to the changelog
    for (const release of releases) {
      const version = release.tag_name.replace(/^v/, '');
      const date = new Date(release.published_at);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      const anchorId = release.tag_name.toLowerCase().replace(/[^a-z0-9]+/g, '');
      
      changelog += `## ${release.tag_name} -- ${formattedDate} {#${anchorId}}

`;
      
      if (release.name && release.name !== release.tag_name) {
        changelog += `**${release.name}**

`;
      }
      
      // Process the release body - convert GitHub markdown to Docusaurus format
      let body = release.body || '*No release notes provided.*';
      
      // Clean up the body - remove any empty lines at the start
      body = body.trim();
      
      // Add the body with proper formatting
      if (body) {
        changelog += `${body}\n\n`;
      }
    }
    
    // Write the changelog file
    fs.writeFileSync(docsPath, changelog, 'utf-8');
    console.log(`[github-releases] Changelog updated with ${releases.length} releases`);
  } catch (error) {
    console.warn('[github-releases] Failed to generate changelog:', error);
  }
}

function getFallbackData(): ReleaseData {
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
    allReleases: [],
    contributors: [
      {
        login: 'Grimothy',
        avatar_url: 'https://github.com/Grimothy.png',
        html_url: 'https://github.com/Grimothy',
        contributions: 1
      }
    ]
  };
}
