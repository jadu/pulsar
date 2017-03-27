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

<p data-height="165" data-theme-id="24005" data-slug-hash="0881ae6084601501bd83ac8047bcb5ba" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/0881ae6084601501bd83ac8047bcb5ba/'>docs - form actions</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

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

<p data-height="165" data-theme-id="24005" data-slug-hash="dfb307e75d83561ed21d6a55eb2c5c81" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/dfb307e75d83561ed21d6a55eb2c5c81/'>docs - form actions flush</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Button placement

Primary actions should be the first buttons in a form actions element, where possible you should also include a 'Cancel' action to allow the user to exit a form with no changes, this should use `.btn--naked` styling.

If the UI is one which could/should allow the user to delete the item you can add a delete button to the form actions. You should use the `pull-right` class to align this on the right hand side.

<p data-height="90" data-theme-id="24005" data-slug-hash="b5fc1c0fb7f715f11fb350f8a62d2140" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/b5fc1c0fb7f715f11fb350f8a62d2140/'>docs - form actions buttons</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

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
