---
layout: page
title: Select
category: Form helpers
---

Generates a select input.

## Example usage

{% code_example form_helpers/select %}

<p data-height="110" data-theme-id="24005" data-slug-hash="meVKpx" data-default-tab="result" data-embed-version="2" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/meVKpx/'>form - select</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Options applied to parent wrapper

Option      | Type    | Description
----------- | ------- | --------------------------------------------------------
class       | string  | A space separated list of class names
guidance    | string  | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help        | string  | Additional guidance information to be displayed next to the input
label       | string  | Text for the `<label>` companion element
required    | bool    | Visually indicates that the field must be completed
show-label  | bool | Control visibility of the `<label>` element without affecting layout (default: true)

## Options applied to the input

Option      | Type    | Description
----------- | ------- | --------------------------------------------------------
disabled    | string  | Stops the element from being interactive if value = 'disabled'
form        | string  | Specific one or more forms this label belongs to
id          | string  | A unique identifier, if required
multiple    | boolean | Whether multiple options can be selected
name        | string  | The name of this control
options     | hash    | The `<option>` items
required    | bool    | Adds `required` and `aria-required="true"` attributes
selected    | string  | The `id` of the item in `options` that should be initially selected
size        | int     | The number of items to display when the list is shown
data-*      | string  | Data attributes, eg: `'data-foo': 'bar'`

Any other options not listed here will be applied to the input.

## <option> attributes

Option      | Type    | Description
----------- | ------- | ---------------------------------------------------
disabled    | boolean | If true, prevents the option from being selectable
label       | string  | Text label for the `<option>`
value       | string  | Value for the `<option>`

{% raw %}
```twig
{{
    form.select({
        'label': 'Example options',
        'id': 'example-options',
        'options': [
            {
                'label': 'Normal option',
                'value': 'foo'
            },
            {
                'label': 'Disabled option',
                'value': 'bar',
                'disabled': true
            }
        ]
    })
}}
```
{% endraw %}

## Using optgroups

Your options can be arranged within `optgroups` by using the optgroup syntax.

{% code_example form_helpers/select-optgroup %}

## Error state

{% raw %}
```twig
{{
    form.select({
        'label': 'Pick a colour',
        'error': 'Something went wrong',
        ...
```
{% endraw %}

<p data-height="110" data-theme-id="24005" data-slug-hash="ALXXWd" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ALXXWd/">form - select error</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Loading state

Add the [loading spinner](loading.md) markup via Javascript after the select element to communicate that the user's selection is causing something else to happen on the page.

If a select element's options are being loaded or updated, the placeholder should be changed to 'Loading...' and the field disabled until this is complete.

<p data-height="80" data-theme-id="24005" data-slug-hash="vNXdox" data-embed-version="2" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/vNXdox/'>vNXdox</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Widths

The main input can use 1-9 columns of the 12 column grid (where 3 are used for the main label), the width can be modified by passing the required column class via the `class` attribute.

* `.form__content--col-1`
* `.form__content--col-2`
* `.form__content--col-3`
* `.form__content--col-4` (default)
* `.form__content--col-5`
* `.form__content--col-6`
* `.form__content--col-7`
* `.form__content--col-8`
* `.form__content--col-9`
