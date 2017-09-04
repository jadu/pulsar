---
layout: page
title: Textarea
category: Form helpers
---

Generates a `<textarea>` with options to control the number of rows (the height)
of the element.

## Example usage

{% code_example form_helpers/textarea %}

<p data-height="105" data-theme-id="24005" data-slug-hash="mAERWZ" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/mAERWZ/">docs - form - textarea</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Options applied to parent wrapper

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
class       | string | A space separated list of class names
guidance    | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help        | string | Additional guidance information to be displayed next to the input
label       | string | Text for the `<label>` companion element
required    | bool   | Visually indicates that the field must be completed
show-label  | bool.  | Control visibility of the `<label>` element without affecting layout (default: true)

## Options applied to input

Option      | Type    | Description
----------- | ------- | --------------------------------------------------------
autofocus   | bool    | Whether the field should have input focus on page load
form        | string  | Specific one or more forms this label belongs to
id          | string  | A unique identifier, if required
name        | string  | The name of this control
placeholder | string  | A short hint that describes the expected value
required    | bool    | Adds `required` and `aria-required="true"` attributes
rows        | integer | The height, in rows (default `2`)
value       | string  | Specifies the value of the input
data-*      | string  | Data attributes, eg: `'data-foo': 'bar'`

*Any other options not listed here will be applied to the input.

## Error state

{% raw %}
```twig
{{
    form.textarea({
        'label': 'Textarea',
        'error': 'Something went wrong',
        ...
```
{% endraw %}

<p data-height="130" data-theme-id="24005" data-slug-hash="qaNRAG" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/qaNRAG/">docs - form - textarea error</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Rows

The height of a textarea can be increased by defining a number of `rows` that suits your expected input. If you expect a lot of content, provide more rows.

{% raw %}
```twig
{{
    form.textarea({
        'label': 'Large textarea',
        'id': 'foo',
        'rows': 5
    })
}}
```
{% endraw %}

<p data-height="212" data-theme-id="24005" data-slug-hash="kkXgRQ" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/kkXgRQ/">docs - form - textarea</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

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
