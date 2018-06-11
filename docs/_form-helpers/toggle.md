---
layout: page
title: Toggle switch
category: Form helpers
---

Generates a Toggle switch styled checkbox input field.

## Example usage

{% raw %}
```twig
{{
    form.toggle_switch({
        'checked': false,
        'id': 'foo',
        'label': 'Turn me on?',
        'name': 'toggle'
    })
}}
```
{% endraw %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="toggle1" class="control__label">Toggle</label>
        <div class="controls">
            <input label="Toggle" id="toggle1" type="checkbox" class="form__control toggle-switch" name="toggle1">
            <label for="toggle1" class="control__label toggle-switch-label">
                <span class="hide">Toggle</span>
            </label>
        </div>
    </div>
    <div class="form__group">
        <label for="toggle2" class="control__label">Toggle (checked)</label>
        <div class="controls">
            <input label="Toggle" id="toggle2" type="checkbox" class="form__control toggle-switch" name="toggle2" checked="checked">
            <label for="toggle2" class="control__label toggle-switch-label">
                <span class="hide">Toggle</span>
            </label>
        </div>
    </div>
    <div class="form__group">
        <label for="toggle3" class="control__label">Toggle (indeterminate)</label>
        <div class="controls">
            <input label="Toggle" id="toggle3" type="checkbox" class="form__control toggle-switch" name="toggle3">
            <label for="toggle3" class="control__label toggle-switch-label">
                <span class="hide">Toggle</span>
            </label>
        </div>
    </div>
</div>
<script type="text/javascript">
    var toggle = document.getElementById("toggle3");
    toggle.indeterminate = true;
</script>

The indeterminate state can only be set via JavaScript. If you're using toggles in your own components, we'll presume you're going to manage this.

```javascript
var toggle = document.getElementById("toggle");
toggle.indeterminate = true;
```

## Options applied to parent wrapper

Option        | Type   | Description
------------- | ------ | -------------------------------------------------------
class         | string | A space separated list of class names
guidance      | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help          | string | Additional guidance information to be displayed next to the input
label         | string | Text for the `<label>` companion element
required      | bool   | Visually indicates that the field must be completed

## Options applied to input

Option        | Type   | Description
------------- | ------ | -------------------------------------------------------
checked       | bool   | Whether the input is checked
disabled      | bool   | Stops the element from being interactive if true
form          | string | Specify one or more forms this label belongs to
id            | string | A unique identifier, will also be applied as the label's `for` attribute
indeterminate | bool   | Shows the checkbox as [-], overrides the value of `checked`
name          | string | The name of this control
required      | bool   | Adds `required` and `aria-required="true"` attributes
value         | string | Specifies the value of the input
data-*        | string | Data attributes, eg: `'data-foo': 'bar'`

Any other options not listed here will be applied to the input.

## Disabled state

Add the `'disabled': true` option to disable the field on load. See the [disabling elements styleguide](styleguides/disabling_elements/) for more information about how to disable elements via javascript. Provide help text or information within the UI where possible to explain why elements are disabled.

{% code_example form_helpers/toggle-disabled %}

<div class="pulsar-example form">
    <div class="form__group form__group--toggle">
    <label class="control__label">Toggle switch</label>
    <div class="controls">
        <input id="foo" name="bar" disabled type="checkbox" class="form__control toggle-switch is-disabled">
        <label for="foo" class="control__label toggle-switch-label">
            <span class="hide">Toggle switch</span>
        </label>
    </div>
</div>

</div>

## Accessibility

To maintain compliance with WCAG 2.0 AA, a form element must have a related label element, the easiest way to achieve this is to always pass an `id` attribute to form helpers. Form helpers will automatically add `aria-describedby="guid-<random-number>"` to inputs and an `id` to help blocks and errors. Additionally, `aria-invalid="true"` will be added to inputs when an error is passed.
