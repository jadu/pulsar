---
layout: page
title: Hidden
category: Form helpers
---

Generates a hidden text input which can be used to store non user-editable data.

All presentational markup and classes will be removed from this input to prevent
it from affecting the form layout. There is no need to supply a `label`.

## Example usage

{% code_example form_helpers/hidden %}

## Options applied to input

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
disabled    | bool   | Stops the element from being interactive if true
form        | string | Specific one or more forms this label belongs to
id          | string | A unique identifier, will also be used as the label's `for` attribute
name        | string | The name of this control
value       | string | Specifies the value of the input
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`
