import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/pulsar/__docusaurus/debug',
    component: ComponentCreator('/pulsar/__docusaurus/debug', 'cf7'),
    exact: true
  },
  {
    path: '/pulsar/__docusaurus/debug/config',
    component: ComponentCreator('/pulsar/__docusaurus/debug/config', '15f'),
    exact: true
  },
  {
    path: '/pulsar/__docusaurus/debug/content',
    component: ComponentCreator('/pulsar/__docusaurus/debug/content', '78f'),
    exact: true
  },
  {
    path: '/pulsar/__docusaurus/debug/globalData',
    component: ComponentCreator('/pulsar/__docusaurus/debug/globalData', 'a49'),
    exact: true
  },
  {
    path: '/pulsar/__docusaurus/debug/metadata',
    component: ComponentCreator('/pulsar/__docusaurus/debug/metadata', 'f1d'),
    exact: true
  },
  {
    path: '/pulsar/__docusaurus/debug/registry',
    component: ComponentCreator('/pulsar/__docusaurus/debug/registry', '51a'),
    exact: true
  },
  {
    path: '/pulsar/__docusaurus/debug/routes',
    component: ComponentCreator('/pulsar/__docusaurus/debug/routes', 'ecd'),
    exact: true
  },
  {
    path: '/pulsar/blog',
    component: ComponentCreator('/pulsar/blog', '2a8'),
    exact: true
  },
  {
    path: '/pulsar/blog/archive',
    component: ComponentCreator('/pulsar/blog/archive', 'e77'),
    exact: true
  },
  {
    path: '/pulsar/blog/hello-world',
    component: ComponentCreator('/pulsar/blog/hello-world', '6a1'),
    exact: true
  },
  {
    path: '/pulsar/blog/hola',
    component: ComponentCreator('/pulsar/blog/hola', 'ed2'),
    exact: true
  },
  {
    path: '/pulsar/blog/tags',
    component: ComponentCreator('/pulsar/blog/tags', '78f'),
    exact: true
  },
  {
    path: '/pulsar/blog/tags/docusaurus',
    component: ComponentCreator('/pulsar/blog/tags/docusaurus', '24d'),
    exact: true
  },
  {
    path: '/pulsar/blog/tags/facebook',
    component: ComponentCreator('/pulsar/blog/tags/facebook', 'd3b'),
    exact: true
  },
  {
    path: '/pulsar/blog/tags/hello',
    component: ComponentCreator('/pulsar/blog/tags/hello', '004'),
    exact: true
  },
  {
    path: '/pulsar/blog/tags/hola',
    component: ComponentCreator('/pulsar/blog/tags/hola', 'dea'),
    exact: true
  },
  {
    path: '/pulsar/blog/welcome',
    component: ComponentCreator('/pulsar/blog/welcome', '4bc'),
    exact: true
  },
  {
    path: '/pulsar/docs',
    component: ComponentCreator('/pulsar/docs', '6ca'),
    routes: [
      {
        path: '/pulsar/docs/',
        component: ComponentCreator('/pulsar/docs/', '0b1'),
        exact: true
      },
      {
        path: '/pulsar/docs/components/badge',
        component: ComponentCreator('/pulsar/docs/components/badge', '331'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/block-list',
        component: ComponentCreator('/pulsar/docs/components/block-list', 'ba0'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/breadcrumb',
        component: ComponentCreator('/pulsar/docs/components/breadcrumb', 'e09'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/button',
        component: ComponentCreator('/pulsar/docs/components/button', 'b39'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/button-group',
        component: ComponentCreator('/pulsar/docs/components/button-group', 'e9e'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/card',
        component: ComponentCreator('/pulsar/docs/components/card', 'baf'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/datatable',
        component: ComponentCreator('/pulsar/docs/components/datatable', '30a'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/dropdown-button',
        component: ComponentCreator('/pulsar/docs/components/dropdown-button', 'b5d'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/dropzone',
        component: ComponentCreator('/pulsar/docs/components/dropzone', 'fef'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/flash-message',
        component: ComponentCreator('/pulsar/docs/components/flash-message', 'eec'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/icon',
        component: ComponentCreator('/pulsar/docs/components/icon', '0b7'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/label',
        component: ComponentCreator('/pulsar/docs/components/label', 'a9f'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/link',
        component: ComponentCreator('/pulsar/docs/components/link', '695'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/link-list',
        component: ComponentCreator('/pulsar/docs/components/link-list', '144'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/list',
        component: ComponentCreator('/pulsar/docs/components/list', '420'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/loading-spinner',
        component: ComponentCreator('/pulsar/docs/components/loading-spinner', '10a'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/media',
        component: ComponentCreator('/pulsar/docs/components/media', 'ac5'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/metadata',
        component: ComponentCreator('/pulsar/docs/components/metadata', '51f'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/modal',
        component: ComponentCreator('/pulsar/docs/components/modal', 'b8d'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/pagination',
        component: ComponentCreator('/pulsar/docs/components/pagination', 'f17'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/panel',
        component: ComponentCreator('/pulsar/docs/components/panel', '17a'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/progress-bar',
        component: ComponentCreator('/pulsar/docs/components/progress-bar', 'ba9'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/progress-list',
        component: ComponentCreator('/pulsar/docs/components/progress-list', '882'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/remove-button',
        component: ComponentCreator('/pulsar/docs/components/remove-button', 'a98'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/status',
        component: ComponentCreator('/pulsar/docs/components/status', '327'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/table',
        component: ComponentCreator('/pulsar/docs/components/table', 'fac'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/components/tooltips',
        component: ComponentCreator('/pulsar/docs/components/tooltips', '874'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/doc2',
        component: ComponentCreator('/pulsar/docs/doc2', '72f'),
        exact: true
      },
      {
        path: '/pulsar/docs/doc3',
        component: ComponentCreator('/pulsar/docs/doc3', '230'),
        exact: true
      },
      {
        path: '/pulsar/docs/forms/button-group',
        component: ComponentCreator('/pulsar/docs/forms/button-group', '196'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/checkbox',
        component: ComponentCreator('/pulsar/docs/forms/checkbox', '61f'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/choice',
        component: ComponentCreator('/pulsar/docs/forms/choice', 'ca5'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/color',
        component: ComponentCreator('/pulsar/docs/forms/color', '830'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/compound',
        component: ComponentCreator('/pulsar/docs/forms/compound', '9cd'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/content',
        component: ComponentCreator('/pulsar/docs/forms/content', '0fd'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/creating-a-form',
        component: ComponentCreator('/pulsar/docs/forms/creating-a-form', '287'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/date',
        component: ComponentCreator('/pulsar/docs/forms/date', 'ce3'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/error-summary',
        component: ComponentCreator('/pulsar/docs/forms/error-summary', 'cb7'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/fieldset',
        component: ComponentCreator('/pulsar/docs/forms/fieldset', 'd6f'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/file',
        component: ComponentCreator('/pulsar/docs/forms/file', 'e61'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/hidden',
        component: ComponentCreator('/pulsar/docs/forms/hidden', '211'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/password',
        component: ComponentCreator('/pulsar/docs/forms/password', '290'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/radio',
        component: ComponentCreator('/pulsar/docs/forms/radio', 'e39'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/range',
        component: ComponentCreator('/pulsar/docs/forms/range', '10f'),
        exact: true
      },
      {
        path: '/pulsar/docs/forms/repeater',
        component: ComponentCreator('/pulsar/docs/forms/repeater', 'c8d'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/select',
        component: ComponentCreator('/pulsar/docs/forms/select', 'f56'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/select2',
        component: ComponentCreator('/pulsar/docs/forms/select2', 'eeb'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/text',
        component: ComponentCreator('/pulsar/docs/forms/text', '352'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/textarea',
        component: ComponentCreator('/pulsar/docs/forms/textarea', '925'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/time',
        component: ComponentCreator('/pulsar/docs/forms/time', '4c8'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/forms/toggle-switch',
        component: ComponentCreator('/pulsar/docs/forms/toggle-switch', '3fe'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/guides/accessibility',
        component: ComponentCreator('/pulsar/docs/guides/accessibility', '924'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/guides/browsers',
        component: ComponentCreator('/pulsar/docs/guides/browsers', '001'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/guides/colour-and-state',
        component: ComponentCreator('/pulsar/docs/guides/colour-and-state', 'e08'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/guides/design-tokens',
        component: ComponentCreator('/pulsar/docs/guides/design-tokens', 'fd8'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/guides/disabling-elements',
        component: ComponentCreator('/pulsar/docs/guides/disabling-elements', 'ae2'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/guides/error-messages',
        component: ComponentCreator('/pulsar/docs/guides/error-messages', 'da5'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/guides/getting-started',
        component: ComponentCreator('/pulsar/docs/guides/getting-started', '4e1'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/guides/helpers',
        component: ComponentCreator('/pulsar/docs/guides/helpers', '4a3'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/mdx',
        component: ComponentCreator('/pulsar/docs/mdx', '0db'),
        exact: true
      },
      {
        path: '/pulsar/docs/patterns/actionsbar',
        component: ComponentCreator('/pulsar/docs/patterns/actionsbar', '3cb'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/patterns/common-form',
        component: ComponentCreator('/pulsar/docs/patterns/common-form', '302'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/patterns/common-list',
        component: ComponentCreator('/pulsar/docs/patterns/common-list', '03b'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/patterns/disabled-ui',
        component: ComponentCreator('/pulsar/docs/patterns/disabled-ui', 'a12'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/patterns/filter-bar',
        component: ComponentCreator('/pulsar/docs/patterns/filter-bar', '8cd'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/patterns/integrations',
        component: ComponentCreator('/pulsar/docs/patterns/integrations', '598'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/patterns/masterswitch',
        component: ComponentCreator('/pulsar/docs/patterns/masterswitch', 'b2b'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/patterns/no-results',
        component: ComponentCreator('/pulsar/docs/patterns/no-results', 'b81'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/patterns/piano',
        component: ComponentCreator('/pulsar/docs/patterns/piano', '348'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/patterns/rules',
        component: ComponentCreator('/pulsar/docs/patterns/rules', '9f0'),
        exact: true,
        sidebar: "someSidebar"
      },
      {
        path: '/pulsar/docs/patterns/table-detail',
        component: ComponentCreator('/pulsar/docs/patterns/table-detail', '215'),
        exact: true,
        sidebar: "someSidebar"
      }
    ]
  },
  {
    path: '/pulsar/',
    component: ComponentCreator('/pulsar/', '940'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
