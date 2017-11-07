---
layout: page
title: End form
category: Form helpers
---

Used in conjunction with [form.create](/create.md) and allows you to specify the buttons required to submit/cancel the form, then closes the form with the `</form>` element.

## Example usage

{% code_example form_helpers/end %}

## Options

Option  | Type   | Description
------- | ------ | -------------------------------------------------------------
actions | array  | Helpers to display as the actions, usually `form.submit()` but can be buttons, links etc...
class   | string | A space separated list of class names

## Variations

### Form-aligned actions

Normally form actions are positioned so that they're inline with the form controls above it.

<div class="pulsar-example form">
    <div class="form__group">
        <label for="example" class="control__label">Example</label>
        <div class="controls">
            <input id="example" name="example" type="text" class="form__control">
        </div>
    </div>
    <div class="form__actions">
        <button class="btn btn--primary js-submit-disable" type="submit">Primary Action</button>
        <button class="btn btn--naked js-submit-disable" type="submit">Cancel</button>
    </div>
</div>

### Flush-aligned actions

You can make the form actions align to the left hand edge of a form by adding the `form__actions--flush` class, eg:

{% raw %}
```twig
{{
    form.end({
        'class': 'form__actions--flush',
        'actions': [...]
    })
}}
```
{% endraw %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="example" class="control__label">Example</label>
        <div class="controls">
            <input id="example" name="example" type="text" class="form__control">
        </div>
    </div>
    <div class="form__actions form__actions--flush">
        <button class="btn btn--primary js-submit-disable" type="submit">Primary Action</button>
            <button class="btn btn--naked js-submit-disable" type="submit">Cancel</button>
    </div>
</div>

## Button placement

Primary actions should be the first buttons in a form actions element, where possible you should also include a 'Cancel' action to allow the user to exit a form with no changes, this should use `.btn--naked` styling.

If the UI is one which could/should allow the user to delete the item you can add a delete button to the form actions. You should use the `pull-right` class to align this on the right hand side.

<div class="pulsar-example form">
    <div class="form__actions form__actions--flush">
        <button class="btn btn--primary js-submit-disable" type="submit">Primary Action</button>
        <button class="btn btn--naked js-submit-disable" type="submit">Cancel</button>
        <button class="btn btn--danger js-submit-disable pull-right" type="submit">Delete</button>
    </div>
</div>

## Tooltips on disabled actions


The `disabled` parameter prevents mouse events from firing and stops tooltips from working entirely. The only way around this which works for all our supported browsers is to wrap the button in a containing `div`, and attach the tooltip to that element.

{% raw %}
```twig
{{
    form.end({
        'actions': [
            '<div rel="tooltip" data-toggle="tooltips" title="foo">' ~ form.submit({
                'label': 'Example',
                'disabled': true
            }) ~ '</div>'
        ]
    })
}}
```
{% endraw %}
