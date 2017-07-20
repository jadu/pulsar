---
layout: page
title: Select2
category: Form helpers
---

Generates a select input using the select2 plugin (https://select2.github.io).

## Dependencies

Select2 elements need the `PulsarFormComponent` to be included in your browserify configuration.

Depending on your setup, this will probably need to be in be in a file called `index.js` or `main.js`.

```javascript
var PulsarFormComponent = require('/path/to/pulsar/PulsarFormComponent');

$(function () {
    var $html = $('html');

    pulsarForm = new PulsarFormComponent($html);
    pulsarForm.init();
});
```

This will then affect all select elements with the `js-select2` class (which will be included automatically if you're using the helpers).

## Example usage

{% raw %}
```twig
{{
    form.select2({
        'label': 'Pick a colour',
        'id': 'foo',
        'options': {
            '': 'Choose',
            'colour_red': 'Red',
            'colour_blue': 'Blue'
        }
    })
}}
```
{% endraw %}

<p data-height="150" data-theme-id="24005" data-slug-hash="VKjjXL" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/VKjjXL/">form - select2</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Options applied to parent wrapper

Option      | Type    | Description
----------- | ------- | --------------------------------------------------------
class       | string  | A space separated list of class names
guidance    | string  | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help        | string  | Additional guidance information to be displayed next to the input
label       | string  | Text for the `<label>` companion element
required    | bool    | Visually indicates that the field must be completed
show-label  | bool    | Control visibility of the `<label>` element without affecting layout (default: true)

## Options applied to the input

Option      | Type    | Description
----------- | ------- | --------------------------------------------------------
data-html   | string  | If `true`, uses Select2's templating functions to parse HTML within options
disabled    | string  | Stops the element from being interactive if value = 'disabled'
form        | string  | Specific one or more forms this label belongs to
id          | string  | A unique identifier, will also be used as the label's `for` attribute
multiple    | boolean | Whether multiple options can be selected
name        | string  | The name of this control
options     | hash    | The `<option>` attributes formatted as `{ 'value': 'label' }`
required    | bool    | Adds `required` and `aria-required="true"` attributes
selected    | string  | The `id` of the item in `options` that should be initially selected
size        | int     | The number of items to display when the list is shown
data-init   | string  | If 'false', will prevent the select2 javascript behaviour being initialised
data-*      | string  | Data attributes, eg: `'data-foo': 'bar'`

*Any other options not listed here will be applied to the input.

## Manually creating select2 elements

The select2 plugin will be called on any `select` element that contain the `js-select2` class.

You can prevent this from happening via the `data-init="false"` attribute, you might want to do this so that you can write your own select2 initialiser to do certain things.

{% raw %}
```twig
{{
    form.select2({
        'label': 'Pick a colour',
        'id': 'foo',
        'data-init': 'false',
        ...
```
{% endraw %}

## Using optgroups

Your options can be arranged within `optgroups` by using the optgroup syntax.

{% code_example form_helpers/select2-optgroup %}

## Using HTML in select options

With the select2 helper you can include HTML within your `<option>` labels, the whole option label will be wrapped in a `<span>`.

**Note:** 'true' here must be a string, not a boolean due to the way the attribute parser works.

{% raw %}
```twig
{{
    form.select2({
        'label': 'Pick a colour',
        'id': 'example-select',
        'data-html': 'true',
        'options': {
            '': 'Choose',
            'colour_red': '<span style="color: red">Red</span>',
            'colour_blue': '<span style="color: blue">Blue</span>'
        }
    })
}}
```
{% endraw %}

<p data-height="150" data-theme-id="24005" data-slug-hash="zKBoBw" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/zKBoBw/">form - select2 html</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Widths

The main input can use 1-9 columns of the 12 column grid (where 3 are used for the main label), the width can be modified by passing the required column class via the `class` attribute.

* `.form__content--col-1`
* `.form__content--col-2`
* `.form__content--col-3`
* `.form__content--col-4` (default)
* `.form__content--col-5`
* `.form__content--col-6`
* `.form__content--col-7`
* `.form__content--col-8`
* `.form__content--col-9`
