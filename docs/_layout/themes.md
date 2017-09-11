---
layout: page
title: Themes
category: Layout
---

There are currently two main colour palletes that can be used to modify the compiled Sass files

| File                    | Reason |
| ----------------------- | ------ |
| _palette.base.scss      | The default colour palette for Pulsar |
| _palette.projector.scss | A darkened colour palette to cope with the extra brightness of projected displays |

## Creating new palettes

* Copy an existing palette like `_palette.base.scss`, and make changes to the colour values, give it a suitable name (eg: `_palette.protonopia.scss`)
* Create a new set of grunt `replace` rules in the gruntfile, using the task to replace the `palette.base` string with your new palette name `palette.protonopia`.

```javascript
replace: {
    protonopia: {
        src: ['stylesheets/pulsar.scss'],
        dest: 'stylesheets/pulsar-theme-protonopia.scss',
        replacements: [{
            from: 'palette.base',
            to: 'palette.protonopia'
        }]
    },
```

* Create other replace rules for the required IE stylesheets
* Anytime the regular grunt tasks are run, they will also compile a new set of `pulsar-theme-protonipia.css` files in the `/css` directory

## Using theme files in products

The base theme will be used by default, unless a theme constant has been set in the view, the way this is defined will vary from product to product, but in simplest terms you will need to add:

```php
define('theme', 'projector');
```

before the call to `$template->render();` (in Lexicon this would be in `/app/app.php`).

This constant will then be used in `base.html.twig` where the theme string will be interpolated into the css file string like so:

At the top of the file:

{% raw %}
```twig
{% set themeFile = '' %}
{% if constant_defined('theme') %}
    {% set themeFile = '-theme-' ~ get_constant('theme') %}
{% endif %}
```
{% endraw %}

And then in the CSS imports:

{% raw %}
```css
<!--[if IE 7]>
    <link rel="stylesheet" type="text/css" href="{{ cssPath ~ 'pulsar-ie7' ~ themeFile ~ '.min.css' }}" /><![endif]-->
<!--[if IE 8]>
    <link rel="stylesheet" type="text/css" href="{{ cssPath ~ 'pulsar-ie8' ~ themeFile ~ '.min.css' }}" /><![endif]-->
<!--[if IE 9]>
    <link rel="stylesheet" type="text/css" href="{{ cssPath ~ 'pulsar-ie9' ~ themeFile ~ '.min.css' }}" /><![endif]-->
<!--[if gt IE 9]><!-->
    <link rel="stylesheet" type="text/css" href="{{ cssPath ~ 'pulsar' ~ themeFile ~ '.css' }}" /> <!--<![endif]-->
```
{% endraw %}
