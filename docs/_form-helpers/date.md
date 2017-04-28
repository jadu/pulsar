---
layout: page
title: Date
category: Form helpers
---

Generates a text input field which will show a date picker when focused.

## Example usage

{% code_example form_helpers/date %}

<p data-height="300" data-theme-id="24005" data-slug-hash="LRkpBE" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/LRkpBE/">docs - form - date</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Options applied to parent wrapper

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
class       | string | A space separated list of class names
guidance    | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help        | string | Additional guidance information to be displayed next to the input
label       | string | Text for the `<label>` companion element
required    | bool   | Visually indicates that the field must be completed
show-label  | bool | Control visibility of the `<label>` element without affecting layout (default: true)

## Options applied to input

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
autofocus   | bool   | Whether the field should have input focus on page load
disabled    | bool   | Stops the element from being interactive if true
form        | string | Specific one or more forms this label belongs to
id          | string | A unique identifier, if required
name        | string | The name of this control
placeholder | string | A short hint that describes the expected value
required    | bool   | Adds `required` and `aria-required="true"` attributes
value       | string | Specifies the value of the input
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`

Any other options not listed here will be applied to the input.
