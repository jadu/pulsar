---
layout: page
title: Choice
category: Form helpers
---

Displayed as a question with multiple answers, each of which has its own label and can allow either singular (checkboxes) or multiple (radios) choice.

<div class="pulsar-example form">
    <div class="form__group form-choice form__group--medium">
        <label class="control__label">Assign blame to</label>
        <div class="controls">

          <label class="control__label"><input value="sunshine" name="foo" type="radio" class="form__control radio">Sunshine</label>

          <label class="control__label"><input value="italic" name="foo" type="radio" class="form__control radio">Moonlight</label>

          <label class="control__label"><input value="italic" name="foo" type="radio" class="form__control radio">Good times</label>

          <label class="control__label is-selected"><input value="underline" name="foo" type="radio" checked="" class="form__control radio">Boogie</label>

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

## Disabled options

You can disable individual choices by adding the `disabled` attribute to the option, or options, you need.

{% raw %}
```twig
{{
    form.choice({
        'label': 'Do you like me?',
        'id': 'foo',
        'options': [
            {
                'label': 'Sunshine',
                'value': 'sun'
            },
            {
                'label': 'Moonlight',
                'value': 'moon',
                'disabled': true
            },
            {
                'label': 'Good times',
                'value': 'good'
            },
            {
                'label': 'Boogie',
                'value': 'boogie'
            }
        ]
    })
}}
```
{% endraw %}

<div class="pulsar-example form">
    <div class="form__group form-choice form__group--medium">
        <label class="control__label">Assign blame to</label>
        <div class="controls">

          <label class="control__label"><input value="sunshine" name="foo" type="radio" class="form__control radio"><span class="form-choice__label">Sunshine</span></label>

          <label class="control__label"><input value="italic" name="foo" type="radio" class="form__control radio" disabled="disabled"><span class="form-choice__label">Moonlight</span></label>

          <label class="control__label"><input value="italic" name="foo" type="radio" class="form__control radio"><span class="form-choice__label">Good times</span></label>

          <label class="control__label is-selected"><input value="underline" name="foo" type="radio" checked="" class="form__control radio"><span class="form-choice__label">Boogie</span></label>

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
