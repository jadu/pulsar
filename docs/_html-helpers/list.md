---
layout: page
title: List
category: HTML helpers
---

Pass an array of items and have them rendered as a simple unordered or ordered list, this is
particularly useful when chained with other helpers.

Lists are purposely left unstyled, but you can use [block lists](block_list.md) if you need nicer styling.

## Example usage

{% code_example html_helpers/list %}

<div>
<p data-height="75" data-theme-id="24005" data-slug-hash="qakOqW" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/qakOqW/">docs - html - list</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>

## Options

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
active_item | int    | The index of the active item, will have the `.is-active` class applied
class       | string | CSS classes, space separated
id          | string | A unique identifier, if required
items       | array  | An array of items to be rendered as a list
type        | string | `ul` (default), `ol`
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`

## Block list

Add prettier styling around your lists with the `.block-list` variations. See the [block list page](block_list.md) for more information.

<div><p data-height="175" data-theme-id="24005" data-slug-hash="mAPZkB" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/mAPZkB/">docs - html - block list regular</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>
