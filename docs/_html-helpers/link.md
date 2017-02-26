---
layout: page
title: Link
category: HTML helpers
---

Creates a simple HTML link, often used inside other helpers.

## Example usage

{% code_example html_helpers/link %}

<div><p data-height="65" data-theme-id="24005" data-slug-hash="LRNVGB" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/LRNVGB/">docs - html - link</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Options

Option | Type   | Description
------ | ------ | --------------------------------------------------------------
class  | string | CSS classes, space separated
href   | string | The URL attribute
icon   | string | An icon to place before the label
id     | string | A unique identifier, if required
label  | string | The link text label
data-* | string | Data attributes, eg: `'data-foo': 'bar'`

## Icons

Use icons to add extra meaning to your links.

{% code_example html_helpers/link-icon-after %}

<div><p data-height="65" data-theme-id="24005" data-slug-hash="WGwvwA" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/WGwvwA/">docs - html - link with icon</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

{% code_example html_helpers/link-icon-before %}

<div><p data-height="65" data-theme-id="24005" data-slug-hash="LRNVNB" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/LRNVNB/">docs - html - link with icon before</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

