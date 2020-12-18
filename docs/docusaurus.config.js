module.exports = {
  title: 'Pulsar',
  tagline: 'The design system for Jadu',
  url: 'https://pulsar.docs.jadu.net',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'jadu', // Usually your GitHub org/user name.
  projectName: 'pulsar', // Usually your repo name.
  plugins: ['docusaurus-plugin-sass'],
  scripts: [
    '/static/bundle.js'
  ],
  themeConfig: {
    prism: {
      additionalLanguages: ['twig'],
      theme: require('prism-react-renderer/themes/palenight')
    },
    navbar: {
      title: 'Pulsar',
      logo: {
        alt: 'My Site Logo',
        src: 'img/pulsar-brand.svg',
      },
      items: [
        {
          to: 'docs/guides/getting-started',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Jadu.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/jadu/pulsar/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/jadu/pulsar/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
};
