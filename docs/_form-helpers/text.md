---
layout: page
title: Text
category: Form helpers
---

Generates a text input field allowing users to input data, with a variety of options for additional help and guidance information.

## Example usage

{% code_example form_helpers/text %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputText" class="control__label">First name</label>
        <div class="controls">
            <input id="inputText" name="inputText" type="text" class="form__control">
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
error       | string | Text to explain an error/validation condition. Also adds error state styling
guidance     | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help         | string | Additional guidance information to be displayed next to the input
id           | string | Passed to the `<label>` element as a `for` attribute, and the `<input>` as the unique identifier
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
id          | string | Passed to the `<label>` element as a `for` attribute, and the `<input>` as the unique identifier
name        | string | The name of this control
placeholder | string | A short hint that describes the expected value
required    | bool   | Adds `required` and `aria-required="true"` attributes
value       | string | Specifies the value of the input
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`

Any other options not listed here will be applied to the input.

## Validation states

### Error

Use the `error` option when a form needs to highlight invalid or missing input, the required classes will be added automatically and error messages will be appended with the <i class="icon-warning-sign"></i> icon so the error message doesn't rely on colour alone. <sup>[<a href="https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-without-color">1.4.1 Use of color &mdash; Level A</a>]</sup>

{% code_example form_helpers/text-error %}

<div class="pulsar-example form">
    <div class="form__group has-error">
        <label for="inputTextError" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextError" name="inputTextError" type="text" class="form__control">
            <span class="help-block is-error"><i class="icon-warning-sign"></i> Please enter a name</span>
        </div>
    </div>

    <p class="screenreader">
        <q><var>First Name</var> edit, blank</q>
    </p>
</div>

### Success

The `has-success` can highlight fields that have been successfully updated.

{% code_example form_helpers/text-success %}

<div class="pulsar-example form">
    <div class="form__group has-success">
        <label for="inputTextSuccess" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextSuccess" name="inputTextSuccess" type="text" class="form__control">
            <span class="help-block">Optional help text</span>
        </div>
    </div>

    <p class="screenreader">
        <q><var>First Name</var> edit, blank</q>
    </p>
</div>

### Changed

If a field value is changed by an interaction elsewhere in an interface, use the `has-changed` class to highlight the field.

{% code_example form_helpers/text-changed %}

<div class="pulsar-example form">
    <div class="form__group has-changed">
        <label for="inputTextChanged" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextChanged" name="inputTextChanged" type="text" class="form__control">
            <span class="help-block">Optional help text</span>
        </div>
    </div>

    <p class="screenreader">
        <q><var>First Name</var> edit, blank</q>
    </p>
</div>

## Disabled fields

Add the `'disabled': true` attribute to prevent a field from being edited or interacted with.

{% code_example form_helpers/text-disabled %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextDisabled" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextDisabled" disabled name="inputTextDisabled" type="text" class="form__control">
            <span class="help-block">Optional help text</span>
        </div>
    </div>

    <p class="screenreader">
        <i class="icon icon-warning"></i> Will not be announced to most screen readers
    </p>
</div>

## Widths

The main input can use 1-9 columns of the 12 column grid, the first three columns are reserved for the label element and by default, text inputs use 4 columns unless modified.

![Illustration of the default 3+4 column layout]({{ site.baseurl }}/assets/image_examples/form-grid-4.png)

![Illustration of the default 3+9 column layout]({{ site.baseurl }}/assets/image_examples/form-grid-9.png)

the width can be modified by passing the required column class via the `class` attribute. Only the input width will be modified, additions like labels and help text will be unaffected.

{% code_example form_helpers/text-col %}

<div class="pulsar-example form">
    <div class="form__group form__control-col--1">
        <label for="inputTextColOne" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextColOne" name="inputTextColOne" type="text" class="form__control">
            <span class="help-block">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--2">
        <label for="inputTextColOne" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextColOne" name="inputTextColOne" type="text" class="form__control">
            <span class="help-block">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--3">
        <label for="inputTextColOne" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextColOne" name="inputTextColOne" type="text" class="form__control">
            <span class="help-block">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--4">
        <label for="inputTextColOne" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextColOne" name="inputTextColOne" type="text" class="form__control">
            <span class="help-block">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--5">
        <label for="inputTextColOne" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextColOne" name="inputTextColOne" type="text" class="form__control">
            <span class="help-block">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--6">
        <label for="inputTextColOne" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextColOne" name="inputTextColOne" type="text" class="form__control">
            <span class="help-block">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--7">
        <label for="inputTextColOne" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextColOne" name="inputTextColOne" type="text" class="form__control">
            <span class="help-block">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--8">
        <label for="inputTextColOne" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextColOne" name="inputTextColOne" type="text" class="form__control">
            <span class="help-block">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--9">
        <label for="inputTextColOne" class="control__label">First name</label>
        <div class="controls">
            <input id="inputTextColOne" name="inputTextColOne" type="text" class="form__control">
            <span class="help-block">Optional help text</span>
        </div>
    </div>
</div>

## Accessibility

To maintain compliance with WCAG 2.0 AA, a form element must have a related label element, the easiest way to achieve this is to always pass an `id` attribute to form helpers.

### Screenreader examples

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
