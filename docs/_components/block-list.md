---
layout: page
title: Block list
category: Components
---

A simple way to present lists of information using whatever markup scheme is most appropriate for the data. Markup can be based around `ul` (default), `ol`, `div`  or `link` elements.

## Example usage

{% code_example html_helpers/block-list %}

<p data-height="268" data-theme-id="24005" data-slug-hash="zGQryX" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/zGQryX/'>zGQryX</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

List items can be a singular block-level element, or a collection of elements in a wrapper.

## Options

Option | Type   | Description
------ | ------ | --------------------------------------------------------------
class  | string | CSS classes, space separated
footer | string | String/Markup to display in the footer row
header | string | String/Markup to display in the header row
id     | string | A unique identifier, if required
items  | array  | An `options` hash which will added as attributes to the `div`, `li` or `a` element (defined by `type`)
type   | string | Markup scheme to use: `ul` (default), `ol`, `div` or `link`
data-* | string | Data attributes, eg: `'data-foo': 'bar'`


### Example using `link` markup scheme

{% code_example html_helpers/block-list-links %}

### Example using `div` markup scheme

{% code_example html_helpers/block-list-divs %}

## Header / Footer

Add an optional header and/or footer row to your block list.

{% raw %}
```twig
{{
    html.block_list({
        'header': 'My Header',
        'footer': 'My Footer',
        'items': [ ... ]
    })
}}
```
{% endraw %}

## Modifiers

### Selected item

Use `.is-selected` on a `block-list__item` to highlight a currently selected item.

<p data-height="268" data-theme-id="24005" data-slug-hash="jPoVPp" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/jPoVPp/'>Block list - selected item</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Disabled items

Use `.is-disabled` on a `block-list__item` to add visually disabled styling to an item. If using the `link` scheme, the links won't be clickable.

### States

<p data-height="268" data-theme-id="24005" data-slug-hash="zGQKgQ" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/zGQKgQ/'>zGQKgQ</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Variations

### Underlined

`.block-list--underlined`

<p data-height="268" data-theme-id="24005" data-slug-hash="jPoWdx" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/jPoWdx/'>jPoWdx</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Bordered

`.block-list--bordered`

<p data-height="268" data-theme-id="24005" data-slug-hash="mJYVoO" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/mJYVoO/'>mJYVoO</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Full width

`.block-list--full`

<p data-height="268" data-theme-id="24005" data-slug-hash="doEpKy" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/doEpKy/'>doEpKy</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Horizontal

`.block-list--horizontal`

<p data-height="429" data-theme-id="24005" data-slug-hash="ZGNpRM" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/ZGNpRM/'>Block list - horizontal</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


### Contrast

`.block-list--contrast`

<p data-height="509" data-theme-id="24005" data-slug-hash="eNadxb" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/eNadxb/'>Block list - contrast</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

