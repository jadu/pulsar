---
layout: page
title: Checkbox
category: Form helpers
---

Generates a checkbox input field. There are various different options available to control the position of the checkbox and labels.

## Example usage

{% code_example form_helpers/checkbox %}

<div class="pulsar-example form">
    <div class="form__group form-checkbox">
        <label for="inputCheckboxLeft" class="control__label">Default checkbox</label>
        <div class="controls">
            <input id="inputCheckboxLeft" name="inputCheckboxLeft" checked="" type="checkbox" class="form__control checkbox">
        </div>
    </div>
</div>

## Options applied to parent wrapper

Option             | Type   | Description
------------------ | ------ | -------------------------------------------------------
class              | string | A space separated list of class names
error              | string | Text to explain an error/validation condition. Also adds error state styling
guidance           | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help               | string | Additional guidance information to be displayed next to the input
required           | bool | Visually indicates that the field must be completed
show-label | bool | Control visibility of the `<label>` element without affecting layout (default: true)

## Options applied to input

Option          | Type   | Description
--------------- | ------ | -------------------------------------------------------
checked         | bool | Whether the input is checked
form            | string | Specify one or more forms this label belongs to
id              | string | A unique identifier, will also be used as the label's `for` attribute
indeterminate   | bool | Shows the checkbox as [-], overrides the value of `checked`
input_placement | string | left (default) / right position of the input vs the label value
label           | string | Text for the `<label>` companion element
name            | string | The name of this control
required        | bool | Adds `required` and `aria-required="true"` attributes
value           | string | Specifies the value of the input
data-*          | string | Data attributes, eg: `'data-foo': 'bar'`

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
    <div class="form__group form-checkbox has-error">
        <label for="inputCheckboxLeft" class="control__label">Default checkbox</label>
        <div class="controls">
            <input id="inputCheckboxLeft" name="inputCheckboxLeft" checked="" type="checkbox" class="form__control checkbox" aria-invalid="true" aria-describedby="guid-12345678">
            <span class="help-block is-error" id="guid-12345678"><i class="icon-warning-sign"></i> Something went wrong</span>
        </div>
    </div>
</div>

## Label alignment

Labels follow the regular Pulsar form flow and are positioned down the left. Clicking the label will toggle the input.

{% raw %}
```twig
{{
    form.checkbox({
        'label': 'Default checkbox',
        'id': 'foo',
        'name': 'foo'
    })
}}
```
{% endraw %}

<div class="pulsar-example form">
    <div class="form__group form-checkbox">
        <label for="inputCheckboxLeft" class="control__label">Default checkbox</label>
        <div class="controls">
            <input id="inputCheckboxLeft" name="inputCheckboxLeft" checked="" type="checkbox" class="form__control checkbox">
        </div>
    </div>
</div>

## Checkbox inline

Creates a `<label>` element with the checkbox placed inside, this allows the checkbox to be positioned either before or after the label value through the `input_placement` option.

Option          | Type   | Description
--------------- | ------ | -----------------------------------------------------
input_placement | string | `left` (default), `right` position of the input vs the label value

{% raw %}
```twig
{{
    form.checkbox_inline({
        'label': 'Checkbox inline',
        'id': 'foo',
        'name': 'foo'
    })
}}
```
{% endraw %}

<div class="pulsar-example form">
    <div class="form__group form-checkbox-inline">
        <div class="controls">
            <label for="inputCheckboxRight" class="control__label">
                <input id="inputCheckboxRight" name="inputCheckboxInline" checked="" type="checkbox" class="form__control checkbox">Checkbox inline
            </label>
        </div>
    </div>
</div>

{% raw %}
```twig
{{
    form.checkbox_inline({
        'label': 'Checkbox on the right',
        'id': 'foo',
        'name': 'foo',
        'input_placement': 'right'
    })
}}
```
{% endraw %}

<div class="pulsar-example form">
    <div class="form__group form-checkbox-inline">
        <div class="controls">
            <label for="inputCheckboxRight" class="control__label">Checkbox on the right <input id="inputCheckboxRight" name="inputCheckboxInline" checked="" type="checkbox" class="form__control checkbox"></label>
        </div>
    </div>
</div>

## Indented checkbox

Using `form.checkbox_inline` will cause the checkbox input to not follow the normal flow of a regular pulsar form, if you want to maintain form alignment, use the `form__group--indent` class to restore the position.

<div class="pulsar-example form">
    <div class="form__group form-checkbox-inline">
        <div class="controls">
            <label for="inputCheckboxRight" class="control__label">
                <input id="inputCheckboxRight" name="inputCheckboxInline" checked="" type="checkbox" class="form__control checkbox">Checkbox inline</label>
        </div>
    </div>
    <div class="form__group form-checkbox-inline form__group--indent">
        <div class="controls">
            <label for="inputCheckboxIndented" class="control__label">
                <input id="inputCheckboxIndented" name="inputCheckboxInline" checked="" type="checkbox" class="form__control checkbox">Checkbox inline &amp; indented</label>
        </div>
    </div>
</div>

## Alternative styling

Depending on your UI needs, you can display checkboxes as [choice blocks](/choice.md), [button groups](/form-button_group.md) or [toggle switches](/toggle_switch.md). See their documentation for further details.

###### Choice block

<div class="pulsar-example form">
    <div class="form__group form-choice choice--block">
        <label class="control__label">Choice block</label>
        <div class="controls">
            <label class="control__label">
                <input value="bold" name="foo" type="checkbox" class="form__control checkbox"><i class="icon-bold"></i> Bold
            </label>
            <label class="control__label">
                <input value="italic" name="foo" type="checkbox" class="form__control checkbox"><i class="icon-italic"></i> Italic
            </label>
            <label class="control__label">
                <input value="underline" name="foo" type="checkbox" class="form__control checkbox"><i class="icon-underline"></i> Underline
            </label>
        </div>
    </div>
</div>

###### Button group

<div class="pulsar-example form">
    <div class="form__group form__button-group">
        <label class="control__label">Band</label>
        <div class="controls btn__group">
            <input id="am" name="bands" type="checkbox" class="form__control checkbox"><label for="am" class="control__label">AM</label><!--
            --><input id="fm" name="bands" type="checkbox" class="form__control checkbox"><label for="fm" class="control__label">FM</label><!--
            --><input id="mw" name="bands" type="checkbox" class="form__control checkbox"><label for="mw" class="control__label">MW</label>
        </div>
    </div>
</div>

###### Toggle switch

<div class="pulsar-example form">
    <div class="form__group">
        <label for="toggletest" class="control__label">Toggle</label>
        <div class="controls">
            <input label="Toggle" id="toggletest" type="checkbox" class="form__control toggle-switch">
            <label for="toggletest" class="control__label toggle-switch-label"><span class="hide">Toggle</span></label>
        </div>
    </div>
</div>

## Accessibility

To maintain compliance with WCAG 2.0 AA, a form element must have a related label element, the easiest way to achieve this is to always pass an `id` attribute to form helpers. Form helpers will automatically add `aria-describedby="guid-<random-number>"` to inputs and an `id` to help blocks and errors. Additionally, `aria-invalid="true"` will be added to inputs when an error is passed.
