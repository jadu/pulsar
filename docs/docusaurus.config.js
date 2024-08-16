// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pulsar',
  tagline: 'The design system and user interface framework for Jadu',
  url: 'https://jadu.github.io/',
  baseUrl: '/pulsar/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  organizationName: 'jadu',
  projectName: 'pulsar',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: ['docusaurus-plugin-sass'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: {
          showReadingTime: true
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],

  themeConfig:
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false
      },
      prism: {
        theme: prismThemes.dracula,
        additionalLanguages: ['twig']
      },
      navbar: {
        title: 'Pulsar',
        logo: {
          alt: 'My Site Logo',
          src: 'img/pulsar-brand.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'guides/getting-started',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/jadu/pulsar',
            label: 'GitHub',
            position: 'right',
          },
        ],
      }
    }),
};

module.exports = config;
