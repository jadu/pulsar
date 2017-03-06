---
layout: page
title: Favicon
category: Layout
---

Each Continuum product has a dedicated set of favicons. The `grunt realFavicon` task generates all the required variations for different browsers and devices, as well as the code necessary to create 'tiles' on Windows Mobile.

<p data-height="130" data-theme-id="24005" data-slug-hash="jWwqXY" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/jWwqXY/'>jWwqXY</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Grunt task

```javascript
grunt realFavicon
```

The grunt task generates all the required images and metadata files for each product and creates a HTML file to be included in your base templates. The initial idea is that products will simply `@import` this file, though there may be the need to update the resulting filepaths for a specific product in the grunt task.

All resulting files should be comitted to the repository.

**This task is also run by the `grunt build` task**

## Source images

All output images are generated from the source SVGs.

```
/images/favicons/src/favicon-cms.svg
/images/favicons/src/favicon-xfp.svg
/images/favicons/src/favicon-cxm.svg
/images/favicons/src/favicon-cp.svg
```

## Output images

Generated icon variations and related files are placed in the following directories.

```
/images/favicons/cms
/images/favicons/xfp
/images/favicons/cxm
/images/favicons/cp
```

## Output HTML

Metadata for including favicons in the page should be included in the `<head>` of a product's base layout.

```
/views/pulsar/components/favicons-cms.html
/views/pulsar/components/favicons-xfp.html
/views/pulsar/components/favicons-cxm.html
/views/pulsar/components/favicons-cp.html
```

###### Example

```html
<link rel="apple-touch-icon" sizes="57x57" href="/images/favicons/cms/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/images/favicons/cms/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/images/favicons/cms/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/images/favicons/cms/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/images/favicons/cms/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/images/favicons/cms/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/images/favicons/cms/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/images/favicons/cms/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/cms/apple-touch-icon-180x180.png">
<link rel="icon" type="image/png" href="/images/favicons/cms/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/images/favicons/cms/favicon-194x194.png" sizes="194x194">
<link rel="icon" type="image/png" href="/images/favicons/cms/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="/images/favicons/cms/android-chrome-192x192.png" sizes="192x192">
<link rel="icon" type="image/png" href="/images/favicons/cms/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="/images/favicons/cms/manifest.json">
<link rel="mask-icon" href="/images/favicons/cms/safari-pinned-tab.svg" color="#15a6d1">
<link rel="shortcut icon" href="/images/favicons/cms/favicon.ico">
<meta name="msapplication-TileColor" content="#15a6d1">
<meta name="msapplication-TileImage" content="/images/favicons/cms/mstile-144x144.png">
<meta name="msapplication-config" content="/images/favicons/cms/browserconfig.xml">
<meta name="theme-color" content="#ffffff">```

## Badging the Favicon

You can add an alert bubble to the favicon to indicate the number of outstanding tasks the user needs to complete.

### Basic usage

```javascript
tinycon.setBubble(5);
```

the `tinycon` library should be available in the global scope to any javascript UI components.

Not all browsers will display this bubble, it is an enhancement for modern browsers only, some browsers will degrade to showing the number in the browser title bar only.

### Browser support

Due to browser limitations, favicons can only be changed post-render in Chrome, Firefox and Opera. Other browsers will show the number within the title bar.

###### Favicon bubble

* Chrome 15+
* Firefox 9+

###### Title update

* Internet Explorer
* Safari
