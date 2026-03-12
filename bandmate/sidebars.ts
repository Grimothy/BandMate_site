import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // Public-facing user documentation
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'User Guide',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'User Guide',
        description: 'Learn how to use BandMate to organize projects, collaborate with bandmates, and manage audio files.',
        slug: '/category/user-guide',
      },
      items: [
        'user-guide/projects-vibes-cuts',
        'user-guide/audio-player',
        'user-guide/collaboration',
        'user-guide/messaging',
        'user-guide/file-management',
      ],
    },
    'selfhosted-setup',
    'roadmap',
    'changelog',
  ],

  // Internal technical documentation — not linked from the site navigation.
  // Access directly via URL (e.g. /docs/installation) or the sidebar when
  // referenced explicitly in a page's front matter with `sidebar: internalSidebar`.
  internalSidebar: [
    'installation',
    'configuration',
    'deployment',
    'architecture',
    'contributing',
    {
      type: 'category',
      label: 'API Reference',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'API Reference',
        description: 'Complete API documentation for BandMate, including authentication, projects, files, comments, and real-time events.',
        slug: '/category/api-reference',
      },
      items: [
        'api/overview',
        'api/authentication',
        'api/projects',
        'api/files',
        'api/comments',
        'api/realtime',
      ],
    },
  ],
};

export default sidebars;
