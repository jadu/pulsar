---
layout: page
title: Loading spinner
category: HTML helpers
---

Give feedback to the user that something is happening or that information is
being retrieved from the server.

Adding the `hide` class will allow you to place the loading markup in the DOM on
pageload for you to toggle with javascript.

## Example usage

{% code_example html_helpers/loading %}

<div><p data-height="50" data-theme-id="24005" data-slug-hash="RGapYB" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/RGapYB/">docs - html - loading</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Options

Option | Type   | Description
-----  | ------ | --------------------------------------------------------------
class  | string | CSS classes, space separated
id     | string | A unique identifier, if required
data-* | string | Data attributes, eg: `'data-foo': 'bar'`
