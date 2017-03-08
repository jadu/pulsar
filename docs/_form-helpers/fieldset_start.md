---
layout: page
title: Fieldset start
category: Form helpers
---

Opens a `<fieldset>` and allows you to define an optional `<legend>`.

## Example usage

{% code_example form_helpers/fieldset-start %}

## Options

Option | Type   | Description
------ | ------ | --------------------------------------------------------------
class  | string | A space separated list of class names
form   | string | Specific one or more forms the fieldset belongs to
id     | string | A unique identifier, if required
legend | string | Label for the optional legend element
name   | string | The name of this control
data-* | string | Data attributes, eg: `'data-foo': 'bar'`
