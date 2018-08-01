---
layout: page
title: File
category: Form helpers
---

Generates a file input.

## Example usage

{% code_example form_helpers/file %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputFile" class="control__label">File input</label>
        <div class="controls">
            <input id="inputFile" name="inputFile" type="file" class="form__control file">
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

## Disabled state

Add the `'disabled': true` option to disable the field on load. See the [disabling elements styleguide](styleguides/disabling_elements/) for more information about how to disable elements via javascript. Provide help text or information within the UI where possible to explain why elements are disabled.

{% code_example form_helpers/file-disabled %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputFile" class="control__label">File input</label>
        <div class="controls">
            <input id="inputFile" name="inputFile" disabled type="file" class="form__control file">
        </div>
    </div>
</div>

## Accessibility

To maintain compliance with WCAG 2.0 AA, a form element must have a related label element, the easiest way to achieve this is to always pass an `id` attribute to form helpers. Form helpers will automatically add `aria-describedby="guid-<random-number>"` to inputs and an `id` to help blocks and errors. Additionally, `aria-invalid="true"` will be added to inputs when an error is passed.

## Widths

The file input can use 1-9 columns of the 12 column grid (where 3 are used for the main label), the width can be modified by passing the required column class via the `class` attribute.

Because the file attribute is mostly styled by the browser, using small widths will likely cause unwanted visual styling by cuttung off either the filename, or part of the 'browse' button.

* `.form__content--col-1`
* `.form__content--col-2`
* `.form__content--col-3`
* `.form__content--col-4` (default)
* `.form__content--col-5`
* `.form__content--col-6`
* `.form__content--col-7`
* `.form__content--col-8`
* `.form__content--col-9`
