---
layout: page
title: Button group
category: Components
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

<div class="pulsar-example">
    <div class="btn__group">
        <button class="btn">Foo</button><button class="btn">Bar</button><button class="btn">Baz</button>
    </div>
</div>

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

<div class="pulsar-example">
    <div class="btn__group"><button class="btn"><i class="icon-align-left"></i></button><button class="btn"><i class="icon-align-center"></i></button><button class="btn"><i class="icon-align-right"></i></button><button class="btn"><i class="icon-align-justify"></i></button></div>
</div>
