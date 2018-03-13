---
layout: page
title: Getting started
---

This is a quick guide to using Pulsar in a standalone project. This guide does not relate to Continuum products.

<h2>Download</h2>

### PHP / Composer

Pulsar needs to be brought into your project as a dependency, for PHP projects we recommend using Composer.

```bash
composer install jadu/pulsar --save-dev --prefer-dist
```

This will install Pulsar to your `/vendors` directory. We're going to assume you're familiar with using Composer for this quick guide.

Pulsar has a lot of files, like tooling and tests, that aren't strictly required for a working project, the `--prefer-dist` flag will use the `.gitattributes` file included within Pulsar to only bring in the essentials.

### Direct download

Download a zipped archive of the Pulsar package and place it somewhere in your project directory. We recommend keeping Pulsar files self-contained somewhere like `/path-to-project/pulsar`.

[https://github.com/jadu/pulsar/archive/develop.zip](https://github.com/jadu/pulsar/archive/develop.zip)

### Pulsar Fonts

Jadu's chosen typeface is Proxima Nova, due to licensing restrictions this is not included in the Public GitHub repository.

There is a pulsar-fonts repository on Jadu's GitLab, which can be pulled in via Composer or directly downloded. It should be placed as a sibling directory next to the Pulsar directory, so:

```bash
/your-project
    └── /pulsar
    └── /pulsar-fonts
```
or
```bash
/your-project
    └── /vendor
        └── /jadu
            └── /pulsar
            └── /pulsar-fonts
```

## Directory Structure

Whether you use Composer or you directly clone the Pulsar GitHub repo, you'll need to make sure these files and folders are made web-readable.

If you use Composer you can use a task runner like grunt-copy which runs the task on a successful `composer install` or `composer update` automatically, placing them into a directory of your choice.

```bash
/your-project
    └── /pulsar
        └── /images/*
        └── /libs
            └── /font-awesome/*
            └── /html5shiv/html5shuv.min.js
            └── /normalize-css/normalize.css
            └── /nwmatcher/src/nwmatcher.js
            └── /respond/dest/respond.min.js
            └── /select2/dist/css/select2.css
            └── /selectivizr/selectivizr.js
    └── /pulsar-fonts/src/*
```

# Setup

### HTML Setup

You will need to include Pulsar's CSS and javascript into your pages, making sure the files point to the correct location of the Pulsar directory in your project.

{% code_example layouts/head %}

### Compiling Sass

You will need to create your own primary Sass file and import whichever pieces of Pulsar you need to achieve your UI. This also allows you to create your own Sass files and include them in the compiled output.

An example, ultra basic Sass file would look like this:

```scss
$ie-version: 12 !default;

// Third party plugins
@import '../libs/normalize-css/normalize.css';
@import '../libs/select2/dist/css/select2.css';

// Font awesome
$fa-font-path: '../libs/font-awesome/fonts';
$fa-css-prefix: 'icon';
@import '../../../../vendor/jadu/pulsar/libs/font-awesome/scss/font-awesome';

// Mixins
@import 'mixin.border-radius';
@import 'mixin.clear-fix';
@import 'mixin.content-box';
@import 'mixin.css-arrow';
@import 'mixin.hide-text';
@import 'mixin.inline-block';
@import 'mixin.label-variant';
@import 'mixin.media-queries';
@import 'mixin.mixins-to-organise';
@import 'mixin.responsive-utilities';

// Config
@import 'config.variables';

$font-path: '../../pulsar-fonts/src/';
@import 'config.fonts';

@import 'config.branding';

// Functions
@import 'function.math';
@import 'function.color-luminance';
@import 'function.pick-best-color';
@import 'function.color';

// Base colour palette
@import 'palette.base';

// Apply palette to components
@import 'config.theme';

// Structure
@import 'structure.grid';
@import 'structure.columns';
@import 'structure.scaffolding';
@import 'structure.type';
@import 'structure.forms';

// Layouts
@import 'layout.settings';
@import 'layout.sidebar';
@import 'layout.signin';
@import 'layout.tabs';

/* ------------------------------------------------------------------------- *\
    If you're theming Pulsar and want to include your own variables, colours or
    mixins you should @import them here.
\* ------------------------------------------------------------------------- */
// Third party libraries
@import 'libraries/library.colorpicker';

// Objects
@import 'objects/_object.box';
@import 'objects/_object.media';

// Components
@import 'component.actionsbar';
@import 'component.badges';
@import 'component.block-list';
@import 'component.breadcrumb';
@import 'component.button-groups';
@import 'component.buttons';
@import 'component.close';
@import 'component.datepicker';
@import 'component.daterange';
@import 'component.dropdowns';
@import 'component.edit-button';
@import 'component.flash';
@import 'component.footer';
@import 'component.forms';
@import 'component.icons';
@import 'component.input-groups';
@import 'component.labels';
@import 'component.lists';
@import 'component.loading';
@import 'component.login';
@import 'component.metadata';
@import 'component.modals';
@import 'component.navigation';
@import 'component.nav-list';
@import 'component.navbars';
@import 'component.pagination';
@import 'component.panels';
@import 'component.popovers';
@import 'component.progress-bars';
@import 'component.progress-lists';
@import 'component.range-slider';
@import 'component.remove-button';
@import 'component.search';
@import 'component.select2';
@import 'component.signin';
@import 'component.tab-help';
@import 'component.tab-panel';
@import 'component.tables';
@import 'component.datatables';
@import 'component.toggle-switch';
@import 'component.toolbar';
@import 'component.tooltips';
@import 'component.calendar';

/* ------------------------------------------------------------------------- *\
    If you're extending Pulsar and want to include your own layouts/modules etc
    you should @import them here.
\* ------------------------------------------------------------------------- */

// Utilities
@import 'utility.highlight';
@import 'utility.utilities';
@import 'utility.misc';
@import 'utility.states';
```

Your Sass task (using Grunt or similar) should accept a list of include paths, you can pass the path to your own scss directory as well as the Pulsar directories within `/vendor` (or wherever you choose to put it).

We choose to keep Pulsar scss files within `/vendor` as they shouldn't be modified, you should add your own stylesheets, or open a pull request in the Pulsar repo to implement any required changes.

```javascript
example: {
    options: {
        includePaths: [
            'scss',
            'vendor/jadu/pulsar/stylesheets',
            'vendor/jadu/pulsar-fonts/src'
        ]
    },
    ...
```

# Core Layout

There are a handful of consistent user interface elements that should be included on all Pulsar UIs. These include:

![Pulsar Base UI - Greybox model](https://jadu.mybalsamiq.com/mockups/6441630.png?key=4ea972e5603e57bd4af80ece9e4d9f280b45b076)

Documentation to follow
