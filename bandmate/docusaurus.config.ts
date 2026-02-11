import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'BandMate',
  tagline: 'Your band\'s digital studio for collaborative music production',
  favicon: 'img/logo.png',

  future: {
    v4: true,
  },

  url: 'https://grimothy.github.io',
  baseUrl: '/BandMate_site/',

  organizationName: 'Grimothy',
  projectName: 'BandMate_site',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
           // editUrl removed to hide 'Edit this page'
          
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    './src/plugins/githubReleasesPlugin.ts',
  ],

  themeConfig: {
    image: 'img/logo.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'BandMate',
      logo: {
        alt: 'BandMate Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/installation',
          label: 'Installation',
          position: 'left',
        },
        {
          to: '/docs/configuration',
          label: 'Configuration',
          position: 'left',
        },
        {
          to: '/docs/changelog',
          label: 'Changelog',
          position: 'left',
        },
        {
          href: 'https://github.com/Grimothy/BandMate',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://ko-fi.com/mrgrimothy',
          label: '☕ Support',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Installation',
              to: '/docs/installation',
            },
            {
              label: 'Configuration',
              to: '/docs/configuration',
            },
          ],
        },
        {
          title: 'Guides',
          items: [
            {
              label: 'User Guide',
              to: '/docs/category/user-guide',
            },
            {
              label: 'Deployment',
              to: '/docs/deployment',
            },
            {
              label: 'Architecture',
              to: '/docs/architecture',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Grimothy/BandMate',
            },
            {
              label: 'Issues',
              href: 'https://github.com/Grimothy/BandMate/issues',
            },
            {
              label: 'Releases',
              href: 'https://github.com/Grimothy/BandMate/releases',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: '☕ Buy Me a Coffee',
              href: 'https://ko-fi.com/mrgrimothy',
            },
            {
              label: 'Contributing',
              to: '/docs/contributing',
            },
          ],
        },
      ],
      copyright: `Copyright \u00A9 ${new Date().getFullYear()} BandMate. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'yaml', 'docker', 'nginx'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
