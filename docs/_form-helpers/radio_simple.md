---
layout: page
title: Radio simple
category: Form helpers
---

Creates a radio input with a sibling label element, this allows other macros
like [form.button_group](form-button_group.md) to use the input’s `:checked` state to modify the
label through the use of the sibling `+` CSS selector.

This helper does not include the extra markup or classes used for a normal Pulsar form layout.

## Example usage

{% code_example form_helpers/radio-simple %}

## Options applied to input

Option          | Type   | Description
--------------- | ------ | -----------------------------------------------------
data            | hash   | Data attributes by key/value
form            | string | Specific one or more forms this label belongs to
help            | string | Additional guidance information to be displayed next to the input
id              | string | A unique identifier, will also be used as the label's `for` attribute
name            | string | The name of this control
required        | bool   | Adds `required` and `aria-required="true"` attributes
selected        | bool   | Whether this radio button should be selected
value           | string | Specifies the value of the input

## Options applied to label

Option          | Type   | Description
--------------- | ------ | -----------------------------------------------------
class           | string | A space separated list of class names
label           | string | Text for the `<label>` companion element
required        | bool   | Visually indicates that the field must be completed

Any other options not listed here will be applied to the input
