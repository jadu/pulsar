---
layout: page
title: Toggle switch
category: Form helpers
---

Generates a Toggle switch styled checkbox input field.

## Example usage

{% raw %}
```twig
{{
    form.toggle_switch({
        'checked': false,
        'id': 'foo',
        'label': 'Turn me on?',
        'name': 'toggle'
    })
}}
```
{% endraw %}

<p data-height="230" data-theme-id="24005" data-slug-hash="GZprKG" data-default-tab="result" data-user="pulsar" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/GZprKG/">Toggle switch</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

The indeterminate state can only be set via JavaScript. If you're using toggles in your own components, we'll presume you're going to manage this.

```javascript
var toggle = document.getElementById("toggle");
toggle.indeterminate = true;
```

## Options applied to parent wrapper

Option        | Type   | Description
------------- | ------ | -------------------------------------------------------
class         | string | A space separated list of class names
guidance      | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help          | string | Additional guidance information to be displayed next to the input
label         | string | Text for the `<label>` companion element
required      | bool   | Visually indicates that the field must be completed

## Options applied to input

Option        | Type   | Description
------------- | ------ | -------------------------------------------------------
checked       | bool   | Whether the input is checked
form          | string | Specify one or more forms this label belongs to
id            | string | A unique identifier, will also be applied as the label's `for` attribute
indeterminate | bool   | Shows the checkbox as [-], overrides the value of `checked`
name          | string | The name of this control
required      | bool   | Adds `required` and `aria-required="true"` attributes
value         | string | Specifies the value of the input
data-*        | string | Data attributes, eg: `'data-foo': 'bar'`

Any other options not listed here will be applied to the input.
