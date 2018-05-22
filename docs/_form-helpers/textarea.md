---
layout: page
title: Textarea
category: Form helpers
---

Generates a `<textarea>` with options to control the number of rows (the height)
of the element as well as additional help and guidance information.

A textarea will default to two rows in height to differentiate themselves from regular [text inputs]({{ site.baseurl }}/form-helpers/text).

## Example usage

###### Simple

{% code_example form_helpers/textarea %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextarea" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextarea" name="inputTextarea" rows="2" class="form__control textarea"></textarea>
        </div>
    </div>

    <p class="screenreader">
        <q><var>Description</var> edit multi-line, blank</q>
    </p>
</div>

###### Fully loaded

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextareaBravo" class="control__label">
            Description
            <span class="required-indicator" rel="tooltip" data-toggle="tooltips" title="required">*</span>
            <i data-container="body" data-content="Guidance text to give more information about expected input" data-placement="top" rel="clickover" aria-hidden="true" class="icon-question-sign input-group-guidance" title=""></i>
        </label>
        <div class="controls">
            <textarea id="inputTextareaBravo" name="inputTextareaBravo" rows="2" aria-describedby="guid-12345678" class="form__control textarea"></textarea>
            <span class="help-block" id="guid-12345678">Optional help text</span>
        </div>
    </div>

    <p class="screenreader">
        <q><var>Description</var> star edit, required, invalid entry, multi-line, blank</q>
    </p>
</div>

## Options applied to parent wrapper

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
class       | string | A space separated list of class names
error       | string | Text to explain an error/validation condition. Also adds error state styling
guidance    | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help        | string | Additional guidance information to be displayed next to the input
id          | string | Passed to the `<label>` element as a `for` attribute, and the `<input>` as the unique identifier
label       | string | Text for the `<label>` companion element
required    | bool   | Visually indicates that the field must be completed
show-label  | bool   | Control visibility of the `<label>` element without affecting layout (default: true)

## Options applied to input

Option      | Type    | Description
----------- | ------- | --------------------------------------------------------
autofocus   | bool    | Whether the field should have input focus on page load
disabled    | bool    | Stops the element from being interactive if true
form        | string  | Specific one or more forms this label belongs to
id          | string  | A unique identifier for the `<input>`, also added to the `<label>` as the `for` attribute
name        | string  | The name of this control
placeholder | string  | A short hint that describes the expected value
required    | bool    | Adds `required` and `aria-required="true"` attributes
rows        | integer | The height, in rows (default `2`)
value       | string  | Specifies the value of the input
data-*      | string  | Data attributes, eg: `'data-foo': 'bar'`

* Any other options not listed here will be applied to the input.

## Validation states

Use the `error` option when a form needs to highlight invalid or missing input, the required classes will be added automatically and error messages will be appended with the <i class="icon-warning-sign"></i> icon so the error message doesn't rely on colour alone. <sup>[<a href="https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-without-color">1.4.1 Use of color &mdash; Level A</a>]</sup>

### Error

{% code_example form_helpers/textarea-error %}

<div class="pulsar-example form">
    <div class="form__group has-error">
        <label for="inputTextareaError" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaError" name="inputTextareaError" rows="2" aria-describedby="guid-34567890" aria-invalid="true" class="form__control textarea"></textarea>
            <span class="help-block is-error" id="guid-34567890"><i class="icon-warning-sign"></i> Please enter a description</span>
        </div>
    </div>

    <p class="screenreader">
        <q><var>Description</var> edit multi-line, invalid entry. Please enter a description</q>
    </p>
</div>

### Success

The `has-success` can highlight fields that have been successfully updated.

{% code_example form_helpers/textarea-success %}

<div class="pulsar-example form">
    <div class="form__group has-success">
        <label for="inputTextareaSuccess" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaSuccess" name="inputTextareaSuccess" rows="2" aria-describedby="guid-45678901" class="form__control textarea"></textarea>
            <span class="help-block" id="guid-45678901">Optional help text</span>
        </div>
    </div>

    <p class="screenreader">
        <q><var>Description</var> edit multi-line, blank. Optional help text.</q>
    </p>
</div>

### Changed

If a field value is changed by an interaction elsewhere in an interface, use the `has-changed` class to highlight the field.

{% code_example form_helpers/textarea-changed %}

<div class="pulsar-example form">
    <div class="form__group has-changed">
        <label for="inputTextareaChanged" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaChanged" name="inputTextareaChanged" rows="2" aria-describedby="guid-56789012" class="form__control textarea"></textarea>
            <span class="help-block" id="guid-56789012">Optional help text</span>
        </div>
    </div>

    <p class="screenreader">
        <q><var>Description</var> edit multi-line, blank. Optional help text</q>
    </p>
</div>

## Rows

The height of a textarea can be increased by defining a number of `rows` that suits your expected input. If you expect a lot of content, provide more rows.

{% code_example form_helpers/textarea-rows %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextareaRows" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaRows" rows="5" class="form__control textarea"></textarea>
        </div>
    </div>

    <p class="screenreader">
        <q><var>Description</var> edit multi-line, blank</q>
    </p>
</div>

## Widths

The main input can use 1-9 columns of the 12 column grid, the first three columns are reserved for the label element and by default, text inputs use 4 columns unless modified.

![Illustration of the default 3+4 column layout]({{ site.baseurl }}/assets/image_examples/form-grid-4.png)

![Illustration of the default 3+9 column layout]({{ site.baseurl }}/assets/image_examples/form-grid-9.png)

the width can be modified by passing the required column class via the `class` attribute. Only the input width will be modified, additions like labels and help text will be unaffected.

{% code_example form_helpers/textarea-col %}

<div class="pulsar-example form">
    <div class="form__group form__control-col--1">
        <label for="inputTextareaWidthOne" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaWidthOne" rows="2" aria-describedby="guid-11111111" class="form__control textarea"></textarea>
            <span class="help-block" id="guid-11111111">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--2">
        <label for="inputTextareaWidthTwo" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaWidthTwo" rows="2" aria-describedby="guid-22222222" class="form__control textarea"></textarea>
            <span class="help-block" id="guid-22222222">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--3">
        <label for="inputTextareaWidthThree" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaWidthThree" rows="2" aria-describedby="guid-33333333" class="form__control textarea"></textarea>
            <span class="help-block" id="guid-33333333">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--4">
        <label for="inputTextareaWidthFour" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaWidthFour" rows="2" aria-describedby="guid-44444444" class="form__control textarea"></textarea>
            <span class="help-block" id="guid-44444444">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--5">
        <label for="inputTextareaWidthFive" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaWidthFive" rows="2" aria-describedby="guid-55555555" class="form__control textarea"></textarea>
            <span class="help-block" id="guid-55555555">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--6">
        <label for="inputTextareaWidthSix" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaWidthSix" rows="2" aria-describedby="guid-66666666" class="form__control textarea"></textarea>
            <span class="help-block" id="guid-66666666">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--7">
        <label for="inputTextareaWidthSeven" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaWidthSeven" rows="2" aria-describedby="guid-77777777" class="form__control textarea"></textarea>
            <span class="help-block" id="guid-77777777">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--8">
        <label for="inputTextareaWidthEight" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaWidthEight" rows="2" aria-describedby="guid-88888888" class="form__control textarea"></textarea>
            <span class="help-block" id="guid-88888888">Optional help text</span>
        </div>
    </div>
    <div class="form__group form__control-col--9">
        <label for="inputTextareaWidthNine" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaWidthNine" rows="2" aria-describedby="guid-99999999" class="form__control textarea"></textarea>
            <span class="help-block" id="guid-99999999">Optional help text</span>
        </div>
    </div>
</div>

## Accessibility

To maintain compliance with WCAG 2.0 AA, a form element must have a related label element, the easiest way to achieve this is to always pass an `id` attribute to form helpers. Form helpers will automatically add `aria-describedby="guid-<random-number>"` to inputs and an `id` to help blocks and errors. Additionally, `aria-invalid="true"` will be added to inputs when an error is passed.

### Screenreader examples

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextareaSimple" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaSimple" rows="2" class="form__control textarea"></textarea>
        </div>
    </div>

    <p class="screenreader">
        <q><var>First name</var> edit multi-line, multi-line, blank</q>
    </p>
</div>

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextareaRequired" class="control__label">Description <span class="required-indicator" rel="tooltip" data-toggle="tooltips" title="required">*</span></label>
        <div class="controls">
            <textarea id="inputTextareaRequired" required aria-required="true" rows="2" class="form__control textarea"></textarea>
        </div>
    </div>

    <p class="screenreader">
        <q><var>First name</var> star edit multi-line, required, invalid entry, blank</q>
    </p>
</div>

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextareaWithValue" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaWithValue" rows="2" class="form__control textarea">Pulsar</textarea>
        </div>
    </div>

    <p class="screenreader">
        <q><var>Description</var>, edit multi-line, <var>Pulsar</var></q>
    </p>
</div>

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextareaWithPlaceholder" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaWithPlaceholder" placeholder="Be descriptive" rows="2" class="form__control textarea"></textarea>
        </div>
    </div>

    <p class="screenreader">
        <q><var>Description</var>, edit multi-line, <var>Be descriptive</var>, blank</q>
    </p>
</div>

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputTextareaWithHelp" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaWithHelp" rows="2" aria-describedby="guid-12121212" class="form__control textarea"></textarea>
            <span class="help-block" id="guid-12121212">Be descriptive</span>
        </div>
    </div>

    <p class="screenreader">
        <q><var>Description</var>, edit multi-line, blank. Be descriptive.</q>
    </p>
</div>

<div class="pulsar-example form">
    <div class="form__group has-error">
        <label for="inputTextareaWithError" class="control__label">Description</label>
        <div class="controls">
            <textarea id="inputTextareaWithError" rows="2" aria-describedby="guid-23232323" aria-invalid="true" class="form__control textarea"></textarea>
            <span class="help-block is-error" id="guid-23232323"><i aria-hidden="true" class="icon-warning-sign"></i> Please complete this field</span>
        </div>
    </div>

    <p class="screenreader">
        <q><var>Description</var>, edit multi-line, invalid entry. Please complete this field.</q>
    </p>
</div>
