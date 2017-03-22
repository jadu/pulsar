---
layout: page
title: Create form
category: Form helpers
---

Creates the opening `<form>` element.

## Example usage

{% code_example form_helpers/create %}

## Options

Option  | Type   | Description
------- | ------ | -------------------------------------------------------------
action  | string | URL to post to, will submit to self if empty
class   | string | A space separated list of class names
enctype | string | How the form-data should be encoded (requires method = POST)
id      | string | A unique identifier, if required
name    | string | The name of the form
nonce   | string | Random string used to prevent CSRF, adds a hidden `nonce` input after `<form>`
method  | string | The HTTP method to be used to submit the form
data-*  | string | Data attributes, eg: `'data-foo': 'bar'`

## Enctype

The `enctype` attribute will be set to `application/x-www-form-urlencoded` by
default, unless you’re using a `method` other than `POST`.

##### Example

{% raw %}
```twig
{{ form.create() }}
```
{% endraw %}

```html
<form method="POST" enctype="application/x-www-form-urlencoded" class="form">
```

## Using PUT

If you specify `'method': 'PUT'` then a hidden `<input name="_method" value="PUT" />`
will be created automatically after the `<form>` element, and the `method` attribute on the `form` element will be set to `POST`.

##### Example

{% raw %}
```twig
{{
    form.create({
        'method': 'PUT'
    })
}}
```
{% endraw %}

```html
<form method="POST" enctype="application/x-www-form-urlencoded" class="form">
<input name="_method" value="PUT" type="hidden" />
```

## CSRF protection

Supply a `nonce` and it will be added as a hidden input after the opening `<form>` element.

##### Example

{% raw %}
```twig
{{
    form.create({
        'nonce': 'D2A619A309DCE1BEF50F01F08EB764B42D9B36BF8128A8D303FD6DCF91E5FDD6'
    })
}}
```
{% endraw %}

```html
<form method="POST" enctype="application/x-www-form-urlencoded" class="form">
<input name="nonce" value="D2A619A309DCE1BEF50F01F08EB764B42D9B36BF8128A8D303FD6DCF91E5FDD6" type="hidden" />
```
