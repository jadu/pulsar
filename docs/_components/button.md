---
layout: page
title: Button
category: Components
---

Pulsar buttons to perform actions, submit forms and link to things. See the [buttons and actions styleguide](/buttons_and_actions.md) for more examples on how to properly label your buttons.

## Example usage

{% code_example html_helpers/button %}

<div class="pulsar-example">
    <button class="btn btn--primary">Button</button>
</div>

## Options

Option  | Type   | Description
------- | ------ | -------------------------------------------------------------
class   | string | A space separated list of class names
form    | string | Specifies one or more forms this label belongs to
href    | string | URL to use for link button types
id      | string | A unique identifier, if required
label   | string | The button label
type    | string | Can be `button` (default), `link`, `input`, `submit`
data-*  | string | Data attributes, eg: `'data-foo': 'bar'`

## Types

Where possible, you should use the default `button` type, but buttons can also be links or inputs.

Regular buttons offer the best browser support and can also contain icons and badges

{% code_example html_helpers/button %}

<div class="pulsar-example">
    <button class="btn btn--primary">Button</button>
</div>

Input buttons can be used if you really, really need to

{% code_example html_helpers/button-input %}

<div class="pulsar-example">
    <input type="button" class="btn" value="Button" />
</div>

Submit buttons should only be used to submit forms

{% code_example html_helpers/button-submit %}

<div class="pulsar-example">
    <input type="submit" class="btn" value="Button" />
</div>

A link that looks like a button, and smells like a button

{% code_example html_helpers/button-link %}

<div class="pulsar-example">
    <a href="http://myurl.com" class="btn">Button</a>
</div>

## Variations

Buttons accept the normal state variations through the `class` option

{% raw %}
```twig
{# Default button #}
{{ html.button({ 'label': 'Default' }) }}

{# Visually highlight the main action the user should perform on a UI #}
{{ html.button({ 'class': 'btn--primary', 'label': 'Primary' }) }}

{# Indicate a successful or positive action #}
{{ html.button({ 'class': 'btn--success', 'label': 'Success' }) }}

{# Indicates caution should be taken with this action #}
{{ html.button({ 'class': 'btn--warning', 'label': 'Warning' }) }}

{# Indicates a dangerous or potentially destructive action #}
{{ html.button({ 'class': 'btn--danger', 'label': 'Danger' }) }}

{# Contextual button for informational alert messages #}
{{ html.button({ 'class': 'btn--info', 'label': 'Info' }) }}

{# Indicates a major action, like locking content #}
{{ html.button({ 'class': 'btn--inverse', 'label': 'Inverse' }) }}

{# Deemphasise a button by stripping away most of the style #}
{{ html.button({ 'class': 'btn--naked', 'label': 'Naked' }) }}
```
{% endraw %}

<div class="pulsar-example">
    <p>
        <button class="btn">Default</button>
        <button class="btn btn--primary">Primary</button>
        <button class="btn btn--success">Success</button>
        <button class="btn btn--warning">Warning</button>
        <button class="btn btn--danger">Danger</button>
        <button class="btn btn--info">Info</button>
        <button class="btn btn--inverse">Inverse</button>
        <button class="btn btn--naked">Naked</button>
    </p>
</div>

## Disabled buttons

Adding the `is-disabled` class to a button will automatically add the `disabled` attribute to `button`, `input` and `submit` type buttons.

{% raw %}
```twig
{{
    html.button({
        'label': 'Disabled Button',
        'class': 'is-disabled'
    })
}}

<!-- output -->
<button class="btn is-disabled" disabled>Disabled Button</button>
```
{% endraw %}

<div class="pulsar-example">
    <button class="btn is-disabled" disabled="">Disabled Button</button>
</div>

### Adding tooltips to disabled buttons

The `disabled` parameter prevents mouse events from firing and stops tooltips from working entirely. The only way around this which works for all our supported browsers is to wrap the button in a containing `div`, and attach the tooltip to that element.

{% raw %}
```html
<div
    rel="tooltip"
    data-toggle="tooltip"
    title="My tooltip brings all the boys to the yard">
  {{ html.button({ ... }) }}
</div>
```
{% endraw %}

## Form actions

The standard button pattern for forms is for the submit action to be a primary button, and the cancel action (if required) should be a naked button.

Delete buttons, if required, should be on the right hand side.

<div class="pulsar-example">
    <div class="form__actions form__actions--flush">
        <button class="btn btn--primary js-submit-disable" type="submit">Primary Action</button>
        <button class="btn btn--naked js-submit-disable" type="submit">Cancel</button>
        <button class="btn btn--danger js-submit-disable pull-right" type="submit">Delete</button>
    </div>
</div>
