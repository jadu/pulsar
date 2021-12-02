module.exports = {
  title: 'Pulsar',
  tagline: 'The design system for the Jadu platform',
  url: 'https://jadu.github.io',
  baseUrl: '/pulsar/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'jadu', // Usually your GitHub org/user name.
  projectName: 'pulsar', // Usually your repo name.
  plugins: ['docusaurus-plugin-sass'],
  themeConfig: {
    prism: {
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
          to: '/docs/guides/getting-started',
          activeBasePath: 'docs',
          label: 'Documentation',
          position: 'left',
        },
        {
          href: 'https://github.com/jadu/pulsar',
          label: 'GitHub',
          position: 'left',
        },
        {
          to: 'https://medium.com/pulsar',
          label: 'Blog',
          position: 'left'
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Jadu, Inc. Built with Docusaurus.`,
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
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
};
