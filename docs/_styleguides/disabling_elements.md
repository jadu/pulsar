---
layout: page
title: Disabling Elements
---

<p class="callout callout--danger">
We're in the process of standardising helper behaviour for disabling elements, if you find a helper that doesn't work as expected please <a href="https://github.com/jadu/pulsar/issues/new">create a new issue</a> to let us know.
</p>

Disabling and element requires adding the right attribute for the browser and any assistive device to recognise the element as being disabled, as well as a class to toggle the disabled styling of a given element.

## The disabled attribute

The following elements are the only ones which support the `disabled` attribute. You do not need to add `aria-diasbled` for these.

* `<button>`
* `<fieldset>`
* `<input>`
* `<optgroup>`
* `<option>`
* `<select>`
* `<textarea>`

## The aria-disabled attribute

If an element doesn't support `disabled`, you should use `aria-disabled="true"` to indicate to assistive technologies that an element is no longer interactive.

## The is-disabled class

Elements consistently use the `.is-disabled` class to visually represent the disabled state of the element.

# Disabling on load

Add the `'disabled': true` option to most helpers to disable the element, the required attributes and class should be added automatically.

### Buttons

<div class="pulsar-example">
    <button disabled class="btn is-disabled">Button</button>
</div>

{% code_example html_helpers/button-disabled %}

### Links

<div class="pulsar-example">
    <a aria-disabled="true" class="is-disabled" href="http://www.jadu.net">Jadu</a>
</div>

{% code_example html_helpers/link-disabled %}

# Disabling with javascript

If you're writing javascript to disable/enable an element you *must* toggle both the correct attribute and class to maintain the support for assistive devices as well as compliance with relevant accessibility guidelines. 

```javascript
if ($elementSupportsDisable) {
    $('#elementToDisable').prop('disabled', true).addClass('.is-disabled');
} else {
    $('#elementToDisable').attr('aria-disabled', 'true').addClass('.is-disabled');
}
```

