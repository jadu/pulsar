---
layout: page
title: Button dropdown
category: HTML helpers
---

Show a dropdown/dropup menu when the button is clicked.

## Example usage

{% raw %}
```twig
{{
    html.button_dropdown({
        'label': 'Drop Down',
        'items': [
            html.link({ 'label': 'foo', 'href': '#foo' }),
            html.link({ 'label': 'bar', 'href': '#bar' })
        ]
    })
}}
```
{% endraw %}

<div><p data-height="140" data-theme-id="24005" data-slug-hash="XjdJPp" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/XjdJPp/">docs - html - button dropdown</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Options

Option    | Type   | Description
--------- | ------ | -----------------------------------------------------------
caret     | bool   | Whether to show the caret arrow in the label (default true)
class     | string | A space separated list of class names (applied to the button)
direction | string | `down` (default) or `up`
id        | string | A unique identifier, if required (applied to the button)
items     | array  | An array of items to put in the dropdown list (usually links)
label     | string | The button label
data-*    | string | Data attributes, eg: `'data-foo': 'bar'` (applied to the button)

## Menu items

Pass a list of `html.link` items to the `menu_items` parameter to be used as the dropdown/up menu, remember you can chain together icons, labels and badges in the link label too.

{% raw %}
```twig
{{
    html.button_dropdown({
        'label': 'Drop Down',
        'items': [
            html.link({ 'label': 'foo', 'href': '#foo' }),
            html.link({ 'label': 'bar', 'href': '#bar' })
        ]
    })
}}
```
{% endraw %}

<p data-height="240" data-theme-id="24005" data-slug-hash="xEVbNP" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/xEVbNP/">docs - html - button dropdown items</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Dropup

Change the placement of the menu with the `direction` option.

{% raw %}
```twig
{{
    html.button_dropdown({
        'direction': 'up',
        'label': 'Drop Up',
        'items': [
            html.link({ 'label': 'foo', 'href': '#foo' }),
            html.link({ 'label': 'bar', 'href': '#bar' })
        ]
    })
}}
```
{% endraw %}

<div><p data-height="145" data-theme-id="24005" data-slug-hash="BLKyvZ" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/BLKyvZ/">docs - html - button dropup</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Divider

Separate menu items with a horizontal line.

{% raw %}
```twig
{{
    html.button_dropdown({
        'label': 'Drop Down',
        'items': [
            html.link({ 'label': 'foo' }),
            html.divider(),
            html.link({ 'label': 'bar' })
        ]
    })
}}
```
{% endraw %}

<div><p data-height="150" data-theme-id="24005" data-slug-hash="pEyvYg" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/pEyvYg/">docs - html - button dropdown divider</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>
