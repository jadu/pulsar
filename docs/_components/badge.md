---
layout: page
title: Badge
category: Components
---

Highlight new or unread items. Limited usage is recommended, mainly for displaying numeric values in combination with other data to provide context. Do not use in place of labels, or any other similar element.

{% code_example html_helpers/badge %}

## Options

Option | Type   | Description
------ | ------ | --------------------------------------------------------------
class  | string | CSS classes, space separated
id     | string | A unique identifier, if required
label  | string | The value to display, usually an integer
data-* | string | Data attributes, eg: `'data-foo': 'bar'`

## Variations

Badges accept the normal state variations through the `class` option.

{% code_example html_helpers/badge-class %}

<div><p data-height="65" data-theme-id="24005" data-slug-hash="ZpWEBV" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ZpWEBV/">docs - html - badges</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Badged buttons

Badges within buttons will inherit the parent button styling without the need to define a specific badge style, which is nice.

{% code_example html_helpers/badge-buttons %}

<div><p data-height="130" data-theme-id="24005" data-slug-hash="ORNJbm" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ORNJbm/">docs - html - badges in buttons</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>
