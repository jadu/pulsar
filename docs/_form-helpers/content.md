---
layout: page
title: Content
category: Form helpers
---

Generates a paragraph of text where an input would normally be positioned within a form while still allowing a regular form label to illustrate it.

Useful for presenting non-editable information within a form where you'd prefer not to use a disabled input.

## Example usage

{% code_example form_helpers/content %}

<p data-height="90" data-theme-id="24005" data-slug-hash="8ee5353bcb656212de2d2a63e29f0db5" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/8ee5353bcb656212de2d2a63e29f0db5/'>docs - form - content</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Options applied to parent wrapper

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
class       | string | A space separated list of class names
guidance    | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help        | string | Additional guidance information to be displayed next to the input
label       | string | Text for the `<label>` companion element

## Options applied to paragraph

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
id          | string | A unique identifier, will also be used as the label's `for` attribute
value       | string | Specifies the value of the input
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`

Any other options not listed here will be applied to the paragraph.
