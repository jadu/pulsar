---
layout: page
title: Select
category: Form helpers
---

Generates a select input.

## Example usage

{% code_example form_helpers/select %}

<div class="pulsar-example form">
    <div class="form__group">
        <label class="control__label">Pick a colour</label>
        <div class="controls">
            <select class="form__control select">
                <option value="">Choose</option>
                <option value="colour_red">Red</option>
                <option value="colour_blue">Blue</option>
            </select>
        </div>
    </div>
</div>

## Options applied to parent wrapper

Option       | Type    | Description
------------ | ------- | --------------------------------------------------------
append       | string  | Text or markup to include after the input element
append_type  | string  | Use only when appending a button. `button` is the only valid value
class        | string  | A space separated list of class names
guidance     | string  | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help         | string  | Additional guidance information to be displayed next to the input
label        | string  | Text for the `<label>` companion element
prepend      | string  | Text or markup to include before the input element
prepend_type | string  | Use only when prepending a button. `button`is the only valid value
required     | bool    | Visually indicates that the field must be completed
show-label   | bool    | Control visibility of the `<label>` element without affecting layout (default: true)

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

<div class="pulsar-example form">
    <div class="form__group has-error">
        <label class="control__label">Pick a colour</label>
        <div class="controls">
            <select aria-describedby="guid-1244863091" aria-invalid="true" class="form__control select">
                <option value="">Choose</option>
                <option value="colour_red">Red</option>
                <option value="colour_blue">Blue</option>
            </select>
            <span class="help-block is-error" role="alert" id="guid-1244863091"><i aria-hidden="true" class="icon-warning-sign"></i> Something went wrong</span>
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

## Accessibility

To maintain compliance with WCAG 2.0 AA, a form element must have a related label element, the easiest way to achieve this is to always pass an `id` attribute to form helpers. Form helpers will automatically add `aria-describedby="guid-<random-number>"` to inputs and an `id` to help blocks and errors. Additionally, `aria-invalid="true"` will be added to inputs when an error is passed.
