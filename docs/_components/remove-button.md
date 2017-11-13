---
layout: page
title: Remove button
category: Components
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

<div class="pulsar-example">
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
</div>

## Options

Option  | Type   | Description
------- | ------ | -------------------------------------------------------------
class   | string | A space separated list of class names
id      | string | A unique identifier, if required
target  | string | CSS Selector of the item to be removed, will be turned into the `data-action-target` attribute
type    | string | Can be `button` (default), `link`, `input`, `submit`
data-*  | string | Data attributes, eg: `'data-foo': 'bar'`

