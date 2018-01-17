---
layout: page
title: Button Group
category: Form helpers
---

Group a series of related buttons together on a single line. Great for creating toolbars.

## Example usage

{% code_example form_helpers/button-group %}

Example using `'type': 'radio'` allowing singular choice.

<div class="pulsar-example form">
    <div class="form__group form__button-group">
        <div class="controls btn__group">
            <input id="btn-grp-radio-1" name="bands" type="radio" class="form__control radio" /><!--
         --><label for="btn-grp-radio-1" class="control__label">AM</label><!--
         --><input id="btn-grp-radio-1" name="bands" type="radio" class="form__control radio" /><!--
         --><label for="btn-grp-radio-1" class="control__label">FM</label><!--
         --><input id="btn-grp-radio-1" name="bands" type="radio" class="form__control radio" /><!--
         --><label for="btn-grp-radio-1" class="control__label">MW</label>
        </div>
    </div>
</div>

The array of options within `items` will be passed to the helper `type` you choose. You should consult the documentation for [radio](/form-helpers/radio/), [checkbox](/form-helpers/checkbox/) or [button](/form-helpers/button/) for a full list of available item options.

## Options

Option     | Type   | Description
---------- | ------ | -------------------------------------------------------------
buttons    | array  | An array of `html.button()` elements
class      | string | Classes to be applied to the button group (not the buttons inside it)
id         | string | A unique identifier, if required
items      | array  | An array of options to pass to the specified `type` helper
show-label | bool   | Control visibility of the `<label>` element without affecting layout (default: true)
type       | string | The type of input to create `radio` (default), `checkbox` or `button`
data-*     | string | Data attributes, eg: `'data-foo': 'bar'`

## Input types

The inputs used within button groups can be changed to suit your need, supply `radio`, `checkbox` or `button` to the `type` attribute. Normally you would use radio for a 'select one' situation, and checkboxes for 'select multiple'.

##  Example with icons

{% code_example form_helpers/button-group-icons %}

Example using `'type': 'checkbox'` allowing multiple choice.

<div class="pulsar-example form">
    <div class="form__group form__button-group">
        <div class="controls btn__group">
            <input id="btn-grp-checkbox-1" name="bands" type="checkbox" class="form__control checkbox" /><!--
         --><label for="btn-grp-checkbox-1" class="control__label"><i class="icon-align-left"></i></label><!--
         --><input id="btn-grp-checkbox-2" name="bands" type="checkbox" class="form__control checkbox" /><!--
         --><label for="btn-grp-checkbox-2" class="control__label"><i class="icon-align-center"></i></label><!--
         --><input id="btn-grp-checkbox-3" name="bands" type="checkbox" class="form__control checkbox" /><!--
         --><label for="btn-grp-checkbox-3" class="control__label"><i class="icon-align-right"></i></label><!--
         --><input id="btn-grp-checkbox-4" name="bands" type="checkbox" class="form__control checkbox" /><!--
         --><label for="btn-grp-checkbox-4" class="control__label"><i class="icon-align-justify"></i></label>
        </div>
    </div>
</div>
