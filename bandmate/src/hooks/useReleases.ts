import useGlobalData from '@docusaurus/useGlobalData';

interface ReleaseInfo {
  version: string;
  tagName: string;
  name: string;
  date: string;
  fullDate: string;
  url: string;
  notes: string;
}

interface ReleasesData {
  latest: ReleaseInfo;
  allReleases: ReleaseInfo[];
}

export function useReleases(): ReleasesData | null {
  const globalData = useGlobalData();
  // Docusaurus wraps plugin data in { default: { releases: ... } }
  const pluginData = globalData['github-releases'] as { default?: { releases?: ReleasesData } } | undefined;
  
  return pluginData?.default?.releases ?? null;
}

export function useLatestRelease(): ReleaseInfo | null {
  const releases = useReleases();
  return releases?.latest ?? null;
}