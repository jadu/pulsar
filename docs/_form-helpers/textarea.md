---
layout: page
title: Textarea
category: Form helpers
---

Generates a `<textarea>` with options to control the number of rows (the height)
of the element.

## Example usage

{% code_example form_helpers/textarea %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="foo" class="control__label">Textarea</label>
        <div class="controls">
            <textarea id="foo" rows="2" class="form__control textarea"></textarea>
        </div>
    </div>
</div>

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

* Any other options not listed here will be applied to the input.

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

<div class="pulsar-example form">
    <div class="form__group has-error">
        <label for="foo" class="control__label">Textarea</label>
        <div class="controls">
            <textarea id="foo" rows="2" class="form__control textarea"></textarea>
            <span class="help-block is-error"><i class="icon-warning-sign"></i> Something went wrong</span>
        </div>
    </div>
</div>

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

<div class="pulsar-example form">
    <div class="form__group">
        <label for="foo" class="control__label">Large textarea</label>
        <div class="controls">
            <textarea id="foo" rows="5" class="form__control textarea"></textarea>
        </div>
    </div>
</div>

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
