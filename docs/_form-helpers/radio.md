---
layout: page
title: Radio
category: Form helpers
---

Generates a radio input field. There are various different options available to control the position of the radio and labels.

## Example usage

{% code_example form_helpers/radio %}

<div class="pulsar-example form">
    <div class="form__group form-radio">
        <label for="inputRadioLeft" class="control__label">Default radio</label>
        <div class="controls">
            <input id="inputRadioLeft" name="inputRadioLeft" checked="" type="radio" class="form__control radio">
        </div>
    </div>
</div>

## Options applied to parent wrapper

Option     | Type   | Description
---------- | ------ | ------------------------------------------------------------
class      | string | A space separated list of class names
guidance   | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help       | string | Additional guidance information to be displayed next to the input
label      | string | Text for the `<label>` companion element
required   | bool   | Visually indicates that the field must be completed
show-label | bool   | Control visibility of the `<label>` element without affecting layout (default: true)

## Options applied to input

Option   | Type   | Description
-------- | ------ | ------------------------------------------------------------
form     | string | Specific one or more forms this label belongs to
id       | string | A unique identifier, if required
name     | string | The name of this control
required | bool   | Adds `required` and `aria-required="true"` attributes
selected | bool   | Whether the input is checked
value    | string | Specifies the value of the input
data-*   | string | Data attributes, eg: `'data-foo': 'bar'`

Any other options not listed here will be applied to the input.

## Error state

{% raw %}
```twig
{{
    form.radio({
        'label': 'Default radio',
        'error': 'Something went wrong',
        ...
```
{% endraw %}

<div class="pulsar-example form">
    <div class="form__group has-error form-radio">
        <label for="inputRadioLeft" class="control__label">Default radio</label>
        <div class="controls">
            <input id="inputRadioLeft" name="inputRadioLeft" checked="" type="radio" aria-describedby="guid-12345678" class="form__control radio">
            <span class="help-block is-error" id="guid-12345678"><i class="icon-warning-sign"></i> Something went wrong</span>
        </div>
    </div>
</div>

## Label alignment

Labels follow the regular Pulsar form flow and are positioned down the left. Clicking the label will toggle the input.

{% raw %}
```twig
{{
    form.radio({
        'label': 'Default radio',
        'id': 'foo',
        'name': 'bar'
    })
}}
```
{% endraw %}

<div class="pulsar-example form">
    <div class="form__group form-radio">
        <label for="inputRadioLeft" class="control__label">Default radio</label>
        <div class="controls">
            <input id="inputRadioLeft" name="inputRadioLeft" checked="" type="radio" class="form__control radio">
        </div>
    </div>
</div>

## Radio inline

Creates a <label> element with the radio placed inside, this allows the radio to be positioned either before or after the label value through the input_placement option.

Option          | Type | Description
--------------- | ------ | -------------------------------
input_placement | string | `left` (default), `right` position of the input vs the label value

{% raw %}
```twig
{{
    form.radio_inline({
        'label': 'Radio inline',
        'id': 'foo',
        'name': 'bar'
    })
}}
```
{% endraw %}

<div class="pulsar-example form">
    <div class="form__group form-radio-inline">
        <div class="controls">
            <label for="inputRadioRight" class="control__label"><input id="inputRadioRight" name="inputRadioInline" checked="" type="radio" class="form__control radio">Radio inline</label>
        </div>
    </div>
</div>

{% raw %}
```twig
{{
    form.radio_inline({
        'label': 'Radio on the right',
        'id': 'foo',
        'name': 'foo',
        'input_placement': 'right'
    })
}}
```
{% endraw %}

<div class="pulsar-example form">
    <div class="form__group form-radio-inline">
        <div class="controls">
            <label for="inputRadioRight" class="control__label">Radio on the right <input id="inputRadioRight" name="inputRadioInline" checked="" type="radio" class="form__control radio"></label>
        </div>
    </div>
</div>

## Indented radio

Using `form.radio_inline` will cause the radio input to not follow the normal flow of a regular pulsar form, if you want to maintain form alignment, use the `form__group--indent` class to restore the position.

<div class="pulsar-example form">
    <div class="form__group form-radio-inline">
        <div class="controls">
            <label for="inputRadioRight" class="control__label"><input id="inputRadioRight" name="inputRadioInline" checked="" type="radio" class="form__control radio">Radio inline</label>
        </div>
    </div>
    <div class="form__group form-radio-inline form__group--indent">
        <div class="controls">
            <label for="inputRadioIndented" class="control__label"><input id="inputRadioIndented" name="inputRadioInline" checked="" type="radio" class="form__control radio">Radio inline &amp; indented</label>
        </div>
    </div>
</div>

## Alternative styling

Depending on your UI needs, you can display radios as [choice blocks](/choice.md) or [button groups](/form-button_group.md). See their documentation for further details.

###### Choice block

<div class="pulsar-example form">
    <div class="form__group form-choice choice--block form__group--medium">
        <label class="control__label">Choice block</label>
        <div class="controls">
            <label class="control__label"><input value="bold" name="foo" type="radio" class="form__control radio"><i class="icon-bold"></i> Bold</label>
            <label class="control__label"><input value="italic" name="foo" type="radio" class="form__control radio"><i class="icon-italic"></i> Italic</label>
            <label class="control__label"><input value="underline" name="foo" type="radio" class="form__control radio"><i class="icon-underline"></i> Underline</label>
        </div>
    </div>
</div>

###### Button group

<div class="pulsar-example form">
    <div class="form__group  form__button-group">
        <label class="control__label">Band</label>
        <div class="controls btn__group">
            <input id="am" name="bands" type="radio" class="form__control radio"><label for="am" class="control__label">AM</label>
            <input id="fm" name="bands" type="radio" class="form__control radio"><label for="fm" class="control__label">FM</label>
            <input id="mw" name="bands" type="radio" class="form__control radio"><label for="mw" class="control__label">MW</label>
        </div>
    </div>
</div>

## Accessibility

To maintain compliance with WCAG 2.0 AA, a form element must have a related label element, the easiest way to achieve this is to always pass an `id` attribute to form helpers. Form helpers will automatically add `aria-describedby="guid-<random-number>"` to inputs and an `id` to help blocks and errors. Additionally, `aria-invalid="true"` will be added to inputs when an error is passed.
