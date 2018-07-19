---
layout: page
title: Choice
category: Form helpers
---

Displayed as a question with multiple answers, each of which has its own label and can allow either singular (checkboxes) or multiple (radios) choice.

If using radios you should always set a default `checked` option.

<div class="pulsar-example form">
    <div class="form__group form-choice form__group--medium">
        <label class="control__label">Assign blame to</label>
        <div class="controls">
            <label class="control__label">
                <input value="sun" name="foo" checked type="radio" class="form__control radio">
                <span class="form-choice__label">Sunshine</span>
            </label>
            <label class="control__label">
                <input value="moon" namse="foo" type="radio" class="form__control radio">
                <span class="form-choice__label">Moonlight</span>
            </label>
            <label class="control__label">
                <input value="good" name="foo" type="radio" class="form__control radio">
                <span class="form-choice__label">Good times</span>
            </label>
            <label class="control__label">
                <input value="boogie" name="foo" type="radio" class="form__control radio">
                <span class="form-choice__label">Boogie</span>
            </label>
        </div>
    </div>
</div>

The choice helper will will automatically adhere to Pulsar's form styleguide by switching to a [select2](select2.md) element if more than 5 options are provided.

## Example usage

{% code_example form_helpers/choice %}

## Options

Option     | Type   | Description
---------- | ------ | -------------------------------------------------------
class      | string | A space separated list of class names
guidance   | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help       | string | Additional guidance information to be displayed next to the input
label      | string | Text for the main `<label>` companion element
optimize   | string | `auto` use a select2 element if number of `options` is greater than 5 (default)<br />`few` force the use of checkboxes/radios regardless of the number of options  <br />`many` force the use of select2 regardless of the number of options
options    | array  | An array of option hashes that will be passed to the [checkbox](checkbox.md) or  [radio](radio.md) helper, see their documentation for specifics
required.  | bool   | Visually indicates that the field must be completed, will not be displayed if `type` is radio as they're implicitly required
multiple   | bool   | If `true`, uses checkboxes instead of radios, or passes the `multiple` attribute to the select2 element
show-label | bool   | Control visibility of the `<label>` element without affecting layout (default: true)

## Disabled Options

You can disable individual choices by adding the `disabled` attribute to the option, or options, you need.

Add the `'disabled': true` option to disable the field on load. See the [disabling elements styleguide](styleguides/disabling_elements/) for more information about how to disable elements via javascript. Provide help text or information within the UI where possible to explain why elements are disabled.

{% code_example form_helpers/choice-disabled %}

<div class="pulsar-example form">
    <div class="form__group form-choice form__group--medium">
        <label class="control__label">Assign blame to</label>
        <div class="controls">
        <label class="control__label">
            <input value="sun" checked type="radio" class="form__control radio">
            <span class="form-choice__label">Sunshine</span>
        </label>
        <label class="control__label">
            <input value="moon" disabled type="radio" class="form__control radio">
            <span class="form-choice__label">Moonlight</span>
        </label>
        <label class="control__label">
            <input value="good" type="radio" class="form__control radio">
            <span class="form-choice__label">Good times</span>
        </label>
        <label class="control__label">
            <input value="boogie" type="radio" class="form__control radio">
            <span class="form-choice__label">Boogie</span>
        </label>
        </div>
    </div>
</div>

## Choice Block

Block styling is available for the choice helper, add the `choice--block` modifier class. Pass a standard [form width modifier](styleguide-forms.md) to the choice helper's `class` option to control the width of all options.

{% raw %}
```twig
{{
    form.choice({
        'label': 'Blocky options',
        'class': 'choice--block form__group--medium',
        'options': [ ... ]
    })
}}
```
{% endraw %}

<div class="pulsar-example form">
    <div class="form__group form-choice choice--block form__group--medium">
      <label class="control__label">Radios
        </label><div class="controls"><label class="control__label"><input value="bold" name="foo" type="radio" class="form__control radio"><i class="icon-bold"></i> Bold
        </label><label class="control__label is-selected"><input value="italic" name="foo" type="radio" checked="" class="form__control radio"><i class="icon-italic"></i> Italic
        </label><label class="control__label"><input value="underline" name="foo" type="radio" class="form__control radio"><i class="icon-underline"></i> Underline
        </label></div></div>
</div>

Add `choice--block choice--block-inline` to lay the options out horizontally.

<div class="pulsar-example form">
    <div class="form__group form-choice choice--block choice--block-inline form__group--small">
      <label class="control__label">Radios
        </label><div class="controls"><label class="control__label is-selected"><input value="bold" checked="" name="foo" type="radio" class="form__control radio">Yes
        </label><label class="control__label"><input value="underline" name="foo" type="radio" class="form__control radio">No
        </label></div></div>
</div>

## Accessibility

To maintain compliance with WCAG 2.0 AA, a form element must have a related label element, the easiest way to achieve this is to always pass an `id` attribute to form helpers. Form helpers will automatically add `aria-describedby="guid-<random-number>"` to inputs and an `id` to help blocks and errors. Additionally, `aria-invalid="true"` will be added to inputs when an error is passed.
