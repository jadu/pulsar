---
layout: page
title: Choice
category: Form helpers
---

Displayed as a question with multiple answers, each of which has its own label and can allow either singular (checkboxes) or multiple (radios) choice.

<p data-height="185" data-theme-id="24005" data-slug-hash="QNagrB" data-default-tab="result" data-user="pulsar" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/QNagrB/">QNagrB</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

The choice helper will will automatically adhere to Pulsar's form styleguide by switching to a [select2](select2.md) element if more than 5 options are provided.

## Example usage

{% code_example form_helpers/choice %}

## Options

Option     | Type   | Description
---------- | ------ | -------------------------------------------------------
class      | string | A space separated list of class names
guidance   | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help       | string | Additional guidance information to be displayed next to the input
label      | string | Text for the main `<label>` companion element
optimize   | string | `auto` use a select2 element if number of `options` is greater than 5 (default)<br />`few` force the use of checkboxes/radios regardless of the number of options  <br />`many` force the use of select2 regardless of the number of options
options    | array  | An array of option hashes that will be passed to the [checkbox](checkbox.md) or  [radio](radio.md) helper, see their documentation for specifics
required.  | bool   | Visually indicates that the field must be completed, will not be displayed if `type` is radio as they're implicitly required
multiple   | bool   | If `true`, uses checkboxes instead of radios, or passes the `multiple` attribute to the select2 element
show-label | bool   | Control visibility of the `<label>` element without affecting layout (default: true)

## Disabled options

You can disable individual choices by adding the `disabled` attribute to the option, or options, you need.

{% raw %}
```twig
{{
    form.choice({
        'label': 'Do you like me?',
        'id': 'foo',
        'options': [
            {
                'label': 'Sunshine',
                'value': 'sun'
            },
            {
                'label': 'Moonlight',
                'value': 'moon',
                'disabled': true
            },
            {
                'label': 'Good times',
                'value': 'good'
            },
            {
                'label': 'Boogie',
                'value': 'boogie'
            }
        ]
    })
}}
```
{% endraw %}

<p data-height="185" data-theme-id="24005" data-slug-hash="RoqxPe" data-default-tab="result" data-user="pulsar" data-embed-version="2" data-pen-title="docs - choice - disabled" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/RoqxPe/">docs - choice - disabled</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## Choice Block

Block styling is available for the choice helper, add the `choice--block` modifier class. Pass a standard [form width modifier](styleguide-forms.md) to the choice helper's `class` option to control the width of all options.

{% raw %}
```twig
{{
    form.choice({
        'label': 'Blocky options',
        'class': 'choice--block form__group--medium',
        'options': [ ... ]
    })
}}
```
{% endraw %}

<p data-height="180" data-theme-id="24005" data-slug-hash="XdzwME" data-default-tab="result" data-user="pulsar" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/XdzwME/">XdzwME</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Add `choice--block choice--block-inline` to lay the options out horizontally.

<p data-height="120" data-theme-id="24005" data-slug-hash="pydmrr" data-default-tab="result" data-user="pulsar" data-embed-version="2" data-pen-title="pydmrr" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/pydmrr/">pydmrr</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
