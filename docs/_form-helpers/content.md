---
layout: page
title: Content
category: Form helpers
---

Generates a paragraph of text where an input would normally be positioned within a form while still allowing a regular form label to illustrate it.

Useful for presenting non-editable information within a form where you'd prefer not to use a disabled input.

## Example usage

{% code_example form_helpers/content %}

<div class="pulsar-example form">
    <div class="form__group">
        <label class="control__label">it’s the remix to ignition</label>
        <div class="controls"><p>Hot and fresh out the kitchen</p></div>
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
raw         | bool   | Instead of wrapping the value in a `<p>`, just render the value/helper instead (default: false)
show-label  | bool   | Control visibility of the `<label>` element without affecting layout (default: true)

## Options applied to paragraph (if `raw` is `false`)

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
id          | string | A unique identifier, will also be used as the label's `for` attribute
value       | string | Specifies the value of the input
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`

Any other options not listed here will be applied to the paragraph, unless `raw` is used, then they will not be used anywhere.

## Widths

The content paragraph can use 1-9 columns of the 12 column grid (where 3 are used for the main label), the width can be modified by passing the required column class via the `class` attribute.

* `.form__content--col-1`
* `.form__content--col-2`
* `.form__content--col-3`
* `.form__content--col-4` (default)
* `.form__content--col-5`
* `.form__content--col-6`
* `.form__content--col-7`
* `.form__content--col-8`
* `.form__content--col-9`
