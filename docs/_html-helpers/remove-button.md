---
layout: page
title: Remove button
category: HTML helpers
---

Used by other helpers to add a small icon which should allow that item to be removed and uses data-attributes to contain information about what object should be removed.

## Example usage

{% raw %}
```twig
{{
    html.remove_button({
        'target': '#itemToRemove'
    })
}}
```
{% endraw %}

Would output following markup for you to hook into with your javascript.

```html
<button 
    type="button" 
    class="remove-button" 
    data-toggle="tooltips" 
    data-placement="right" 
    title="Remove this item" 
    data-action="remove" 
    data-action-target="#itemToRemove"
    data-original-title="Remove this item"
>
    <i class="icon-remove-sign"></i>
</button>
```

And look like this:

<div><p data-height="55" data-theme-id="24005" data-slug-hash="ORNEzP" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ORNEzP/">docs - html - remove button</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Options

Option  | Type   | Description
------- | ------ | -------------------------------------------------------------
class   | string | A space separated list of class names
id      | string | A unique identifier, if required
target  | string | CSS Selector of the item to be removed, will be turned into the `data-action-target` attribute
type    | string | Can be `button` (default), `link`, `input`, `submit`
data-*  | string | Data attributes, eg: `'data-foo': 'bar'`

