---
layout: page
title: Checkbox
category: Form helpers
---

Generates a checkbox input field. There are various different options available to control the position of the checkbox and labels.

## Example usage

{% code_example form_helpers/checkbox %}

<p data-height="75" data-theme-id="24005" data-slug-hash="VKadqO" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/VKadqO/">docs - form - checkbox</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Options applied to parent wrapper

Option             | Type   | Description
------------------ | ------ | -------------------------------------------------------
class              | string | A space separated list of class names
error              | string | Text to explain an error/validation condition. Also adds error state styling
guidance           | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help               | string | Additional guidance information to be displayed next to the input
required           | bool | Visually indicates that the field must be completed

## Options applied to input

Option          | Type   | Description
--------------- | ------ | -------------------------------------------------------
checked         | bool | Whether the input is checked
form            | string | Specify one or more forms this label belongs to
id              | string | A unique identifier, will also be used as the label's `for` attribute
indeterminate   | bool | Shows the checkbox as [-], overrides the value of `checked`
input_placement | string | left (default) / right position of the input vs the label value
label           | string | Text for the `<label>` companion element
name            | string | The name of this control
required        | bool | Adds `required` and `aria-required="true"` attributes
value           | string | Specifies the value of the input
data-*          | string | Data attributes, eg: `'data-foo': 'bar'`

Any other options not listed here will be applied to the input.

## Error state

{% raw %}
```twig
{{
    form.checkbox({
        'label': 'Default checkbox',
        'error': 'Something went wrong',
        ...
```
{% endraw %}

<p data-height="95" data-theme-id="24005" data-slug-hash="gwANNx" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/gwANNx/">docs - form - checkbox error</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Label alignment

Labels follow the regular Pulsar form flow and are positioned down the left. Clicking the label will toggle the input.

{% raw %}
```twig
{{ 
    form.checkbox({
        'label': 'Default checkbox', 
        'id': 'foo', 
        'name': 'foo'
    })
}}
```
{% endraw %}

<p data-height="75" data-theme-id="24005" data-slug-hash="VKadqO" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/VKadqO/">docs - form - checkbox</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Checkbox inline

Creates a `<label>` element with the checkbox placed inside, this allows the checkbox to be positioned either before or after the label value through the `input_placement` option.

Option          | Type   | Description
--------------- | ------ | -----------------------------------------------------
input_placement | string | `left` (default), `right` position of the input vs the label value

{% raw %}
```twig
{{ 
    form.checkbox_inline({
        'label': 'Checkbox inline', 
        'id': 'foo', 
        'name': 'foo'
    })
}}
```
{% endraw %}

<p data-height="75" data-theme-id="24005" data-slug-hash="qakKvg" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/qakKvg/">docs - form - checkbox right label</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

{% raw %}
```twig
{{ 
    form.checkbox_inline({
        'label': 'Checkbox on the right', 
        'id': 'foo', 
        'name': 'foo',
        'input_placement': 'right'
    })
}}
```
{% endraw %}

<div><p data-height="75" data-theme-id="24005" data-slug-hash="kkbjxQ" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/kkbjxQ/">docs - form - checkbox inline</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Indented checkbox

Using `form.checkbox_inline` will cause the checkbox input to not follow the normal flow of a regular pulsar form, if you want to maintain form alignment, use the `form__group--indent` class to restore the position.

<div><p data-height="160" data-theme-id="24005" data-slug-hash="bwpmbX" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/bwpmbX/">docs - form - checkbox right label</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Alternative styling

Depending on your UI needs, you can display checkboxes as [choice blocks](/choice.md), [button groups](/form-button_group.md) or [toggle switches](/toggle_switch.md). See their documentation for further details.

###### Choice block

<p data-height="180" data-theme-id="24005" data-slug-hash="amNRyY" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/amNRyY/">docs - form - checkbox choice block</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

###### Button group

<p data-height="70" data-theme-id="24005" data-slug-hash="jrqZpy" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/jrqZpy/">docs - form - checkbox button group</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

###### Toggle switch

<p data-height="80" data-theme-id="24005" data-slug-hash="mAPzjN" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/mAPzjN/">docs - form - checkbox toggle switch</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>
