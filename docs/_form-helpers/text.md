---
layout: page
title: Text
category: Form helpers
---

Generates a text input.

## Example usage

{% code_example form_helpers/text %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="foo" class="control__label">First name</label>
        <div class="controls">
            <input id="foo" name="inputText" type="text" class="form__control">
        </div>
    </div>

    <p class="screenreader">
        <q><var>First name</var> edit, blank</q>
    </p>
</div>

## Options applied to parent wrapper

Option       | Type   | Description
------------ | ------ | ---------------------------------------------------------
append       | string | Text or markup to include after the input element
append_type  | string | Use only when appending a button. `button` is the only valid value
class        | string | A space separated list of class names
guidance     | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help         | string | Additional guidance information to be displayed next to the input
label        | string | Text for the `<label>` companion element
prepend      | string | Text or markup to include before the input element
prepend_type | string | Use only when prepending a button. `button`is the only valid value
required     | bool   | Visually indicates that the field must be completed
show-label   | bool   | Control visibility of the `<label>` element without affecting layout (default: true)

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

## Error state

{% raw %}
```twig
{{
    form.checkbox({
        'label': 'Default checkbox',
        'error': 'Something went wrong',
        ...
```
{% endraw %}

<div class="pulsar-example form">
    <div class="form__group has-error">
        <label for="inputTextWithError" class="control__label">First name</label>
        <div class="controls">
            <input id="inputText" name="inputTextWithError" type="text" class="form__control">
            <span class="help-block is-error"><i class="icon-warning-sign"></i> Something went wrong</span>
        </div>
    </div>

    <p class="screenreader">
        <q><var>First Name</var> edit, blank</q>
    </p>
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

## Screenreader examples

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextSimple" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextSimple" name="inputText" type="text" class="form__control">
        </div>
    </div>

    <p class="screenreader">
        <q><var>First name</var> edit, blank</q>
    </p>
</div>

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextRequired" class="control__label">First name <span class="required-indicator" rel="tooltip" data-toggle="tooltips" title="required">*</span></label>
        <div class="controls">
            <input id="inputTextRequired" required aria-required="true" name="inputText" type="text" class="form__control">
        </div>
    </div>

    <p class="screenreader">
        <q><var>First name</var> star edit, required, invalid entry, blank</q>
    </p>
</div>

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextWithValue" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextWithValue" name="inputText" type="text" class="form__control" value="Pulsar">
        </div>
    </div>

    <p class="screenreader">
        <q><var>First name</var> edit, <var>Pulsar</var></q>
    </p>
</div>

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextWithPlaceholder" class="control__label">Date of birth</label>
        <div class="controls">
            <input id="inputTextWithPlaceholder" name="inputText" type="text" class="form__control" placeholder="DD/MM/YYYY">
        </div>
    </div>

    <p class="screenreader">
        <q><var>Date of birth</var> edit, <var>dee-dee slash em-em slash eee-aye</var>, blank</q>
    </p>
</div>

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextWithHelp" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextWithHelp" name="inputTextWithHelp" type="text" class="form__control">
            <span class="help-block">You may enter more than one</span>
        </div>
    </div>

    <p class="screenreader">
        <q><var>First Name</var> edit, blank</q>
    </p>
</div>

<div class="pulsar-example form">
    <div class="form__group has-error">
        <label for="inputTextWithError" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextWithError" type="text" class="form__control">
            <span class="help-block is-error"><i aria-hidden="true" class="icon-warning-sign"></i> Please complete this field</span>
        </div>
    </div>

    <p class="screenreader">
        <q><var>First Name</var> edit, blank</q>
    </p>
</div>
