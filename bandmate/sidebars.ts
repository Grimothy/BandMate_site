import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'installation',
    'configuration',
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
        'user-guide/file-management',
      ],
    },
    // 'architecture',      // hidden
    'deployment',
    // {
    //   type: 'category',  // API Reference hidden
    //   label: 'API Reference',
    //   collapsed: true,
    //   link: {
    //     type: 'generated-index',
    //     title: 'API Reference',
    //     description: 'Complete API documentation for BandMate, including authentication, projects, files, comments, and real-time events.',
    //     slug: '/category/api-reference',
    //   },
    //   items: [
    //     'api/overview',
    //     'api/authentication',
    //     'api/projects',
    //     'api/files',
    //     'api/comments',
    //     'api/realtime',
    //   ],
    // },
    'roadmap',
    'contributing',
    'changelog',
  ],
};

export default sidebars;
