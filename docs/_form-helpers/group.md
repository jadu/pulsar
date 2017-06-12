---
layout: page
title: Group
category: Form helpers
---

This is a constructor macro which generates an input field wrapped with standard markup with the ability to prepend/append extra elements. It is called by other macros like `form.text` and `form.password`.

<p class="message"><i class="fa fa-info-circle"></i> This helper is not really intended to be called directly from a view</p>

Usually, you’ll have a single `options` hash to this You need to specify which of the options you want to apply to the parent wrapper (usually a `<div>`) and which you want to be attached to the actual form input element. Use the `only` and `exclude` array functions to manipulate your options array.

## Example usage

{% raw %}
```twig
{{
    form.group({
        'parent': options|only('class label help')
        'inputs': [
            elem.input(options
                |exclude('class label help')
            )
        ]
    })
}}
```
{% endraw %}

In this example, if `'class': 'FOO'`, `'label': 'BAR'` and `'help': 'BAZ'` will
be placed in the markup like so:

```html
<div class="form__group FOO">
    <label for="inputText" class="control__label">BAR</label>
    <div class="controls">
        <input id="inputText" name="inputText" placeholder="Placeholder" type="text" class="form__control">
        <p class="help-block">BAZ</p>
    </div>
</div>
```

## Options

Option | Type  | Description
------ | ----- | ---------------------------------------------------------------
parent | hash  | options to be applied to the parent wrapper
inputs | array | an array of inputs

## Options applied to the parent wrapper

Option            | Type   | Description
----------------- | ------ | ----------------------------------------------------
parent.append     | string | Content to display after the input, usually short text or icons
parent.class      | string | A space separated list of class names
parent.guidance   | string | Text to be displayed in a popover, adds a (?) icon after the input
parent.guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
parent.help       | string | Additional guidance information to be displayed next to the input
parent.id         | string | A unique identifier, if required
parent.inputs     | array  | One or more form inputs to display
parent.label      | string | Text for the `<label>` companion element
parent.prepend    | string | Content to display before the input, usually short text or icons
parent.removable  | bool   | Whether to display a remove button after the input (default false)
parent.required   | bool   | Visually indicates that the field must be completed
parent.show-label | bool | Control visibility of the `<label>` element without affecting layout (default: true)
parent.data-*     | string | Data attributes, eg: `'data-foo': 'bar'`
