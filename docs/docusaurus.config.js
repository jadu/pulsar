module.exports = {
<<<<<<< Updated upstream
  title: 'My Site',
  tagline: 'The tagline of my site',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  plugins: ['docusaurus-plugin-sass'],
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/palenight'),
    },
    navbar: {
      title: 'My Site',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
=======
      copyright: `Copyright © ${new Date().getFullYear()} Jadu.`,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            'https://github.com/facebook/docusaurus/edit/master/website/',
=======
            'https://github.com/jadu/pulsar/edit/master/website/',
>>>>>>> Stashed changes
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
<<<<<<< Updated upstream
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
=======
            'https://github.com/jadu/pulsar/edit/master/website/blog/',
>>>>>>> Stashed changes
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
};
