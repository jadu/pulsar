---
layout: page
title: Link list
category: Components
---

A specialised method to create a list of links without the need to manually call multiple `html.link` helpers.

Lists are purposely left unstyled, but you can use [block lists](block_list.md) if you need nicer styling.

## Example usage

{% code_example html_helpers/link-list %}

<div><p data-height="80" data-theme-id="24005" data-slug-hash="zKqkPK" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/zKqkPK/">docs - html - link list</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Options

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
active_item | int    | The index of the active item, will have the `.is-active` class applied
class       | string | CSS classes, space separated
id          | string | A unique identifier, if required
items       | hash   | A hash of links formatted by `{ label: href }`
type        | string | `ul` (default), `ol`
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`
