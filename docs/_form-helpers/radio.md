---
layout: page
title: Radio
category: Form helpers
---

Generates a radio input field. There are various different options available to control the position of the radio and labels.

## Example usage

{% code_example form_helpers/radio %}

<p data-height="80" data-theme-id="24005" data-slug-hash="ORXrEo" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ORXrEo/">docs - form - radio</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Options applied to parent wrapper

Option     | Type   | Description
---------- | ------ | ------------------------------------------------------------
class      | string | A space separated list of class names
guidance   | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help       | string | Additional guidance information to be displayed next to the input
label      | string | Text for the `<label>` companion element
required   | bool   | Visually indicates that the field must be completed
show-label | bool   | Control visibility of the `<label>` element without affecting layout (default: true)

## Options applied to input

Option   | Type   | Description
-------- | ------ | ------------------------------------------------------------
form     | string | Specific one or more forms this label belongs to
id       | string | A unique identifier, if required
name     | string | The name of this control
required | bool   | Adds `required` and `aria-required="true"` attributes
selected | bool   | Whether the input is checked
value    | string | Specifies the value of the input
data-*   | string | Data attributes, eg: `'data-foo': 'bar'`

Any other options not listed here will be applied to the input.

## Error state

{% raw %}
```twig
{{
    form.radio({
        'label': 'Default radio',
        'error': 'Something went wrong',
        ...
```
{% endraw %}

<p data-height="95" data-theme-id="24005" data-slug-hash="NRANKk" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/NRANKk/">docs - form - radio error</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Label alignment

Labels follow the regular Pulsar form flow and are positioned down the left. Clicking the label will toggle the input.

{% raw %}
```twig
{{
    form.radio({
        'label': 'Default radio',
        'id': 'foo',
        'name': 'bar'
    })
}}
```
{% endraw %}

<p data-height="80" data-theme-id="24005" data-slug-hash="ORXrEo" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ORXrEo/">docs - form - radio</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Radio inline

Creates a <label> element with the radio placed inside, this allows the radio to be positioned either before or after the label value through the input_placement option.

Option          | Type | Description
--------------- | ------ | -------------------------------
input_placement | string | `left` (default), `right` position of the input vs the label value

{% raw %}
```twig
{{
    form.radio_inline({
        'label': 'Radio inline',
        'id': 'foo',
        'name': 'bar'
    })
}}
```
{% endraw %}

<p data-height="75" data-theme-id="24005" data-slug-hash="XjKdjR" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/XjKdjR/">docs - form - radio right label</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

{% raw %}
```twig
{{
    form.radio_inline({
        'label': 'Radio on the right',
        'id': 'foo',
        'name': 'foo',
        'input_placement': 'right'
    })
}}
```
{% endraw %}

<p data-height="75" data-theme-id="24005" data-slug-hash="BLzKoZ" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/BLzKoZ/">docs - form - radio inline right</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Indented radio

Using `form.radio_inline` will cause the radio input to not follow the normal flow of a regular pulsar form, if you want to maintain form alignment, use the `form__group--indent` class to restore the position.

<p data-height="160" data-theme-id="24005" data-slug-hash="LRkNxm" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/LRkNxm/">docs - form - radio indented</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Alternative styling

Depending on your UI needs, you can display radios as [choice blocks](/choice.md) or [button groups](/form-button_group.md). See their documentation for further details.

###### Choice block

<p data-height="180" data-theme-id="24005" data-slug-hash="YGWqVJ" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/amNRyY/">docs - form - checkbox choice block</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

###### Button group

<p data-height="70" data-theme-id="24005" data-slug-hash="bwZpRG" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/jrqZpy/">docs - form - checkbox button group</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>
