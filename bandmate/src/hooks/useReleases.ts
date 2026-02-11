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
  const pluginData = globalData['github-releases'] as { releases: ReleasesData } | undefined;
  
  return pluginData?.releases ?? null;
}

export function useLatestRelease(): ReleaseInfo | null {
  const releases = useReleases();
  return releases?.latest ?? null;
}