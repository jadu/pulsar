---
layout: page
title: Button group
category: HTML helpers
---

Group a series of related buttons together on a single line. Great for creating toolbars.

## Example usage

{% raw %}
```twig
{{
    html.button_group({
        'buttons': [
            html.button({ 'label': 'foo' }),
            html.button({ 'label': 'bar' }),
            html.button({ 'label': 'baz' })
        ]
    })
}}
```
{% endraw %}

<div><p data-height="65" data-theme-id="24005" data-slug-hash="ozxgEo" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ozxgEo/">docs - html - button group</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Options

Option  | Type   | Description
------- | ------ | -------------------------------------------------------------
buttons | array  | An array of `html.button()` elements
class   | string | Classes to be applied to the button group (not the buttons inside it)
id      | string | A unique identifier, if required
data-*  | string | Data attributes, eg: `'data-foo': 'bar'`

##  Example with icons

{% raw %}
```twig
{{
    html.button_group({
        buttons: [
            html.button({ 'label': html.icon('align-left') }),
            html.button({ 'label': html.icon('align-center') }),
            html.button({ 'label': html.icon('align-right') }),
            html.button({ 'label': html.icon('align-justify') })
        ]
    })
}}
```
{% endraw %}

<div><p data-height="65" data-theme-id="24005" data-slug-hash="ZpWYoO" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ZpWYoO/">docs - html - button group with icons</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>
