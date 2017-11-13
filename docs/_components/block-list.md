---
layout: page
title: Block list
category: Components
---

A simple way to present lists of information using whatever markup scheme is most appropriate for the data. Markup can be based around `ul` (default), `ol`, `div`  or `link` elements.

## Example usage

{% code_example html_helpers/block-list %}

<div class="pulsar-example">
    <ul class="block-list">
        <li class="block-list__item">One</li>
        <li class="block-list__item">Two</li>
        <li class="block-list__item">Three</li>
    </ul>
</div>

List items can be a singular block-level element, or a collection of elements in a wrapper.

## Options

Option | Type   | Description
------ | ------ | --------------------------------------------------------------
class  | string | CSS classes, space separated
footer | string | String/Markup to display in the footer row
header | string | String/Markup to display in the header row
id     | string | A unique identifier, if required
items  | array  | An `options` hash which will added as attributes to the `div`, `li` or `a` element (defined by `type`)
type   | string | Markup scheme to use: `ul` (default), `ol`, `div` or `link`
data-* | string | Data attributes, eg: `'data-foo': 'bar'`


### Example using `link` markup scheme

{% code_example html_helpers/block-list-links %}

### Example using `div` markup scheme

{% code_example html_helpers/block-list-divs %}

## Header / Footer

Add an optional header and/or footer row to your block list.

{% raw %}
```twig
{{
    html.block_list({
        'header': 'My Header',
        'footer': 'My Footer',
        'items': [ ... ]
    })
}}
```
{% endraw %}

## Modifiers

### Selected item

Use `.is-selected` on a `.block-list__item` to highlight a currently selected item.

<div class="pulsar-example">
    <ul class="block-list block-list--underlined">
        <li class="block-list__item">One</li>
        <li class="block-list__item is-selected">Two</li>
        <li class="block-list__item">Three</li>
    </ul>
</div>

## Disabled items

Use `.is-disabled` on a `.block-list__item` to add visually disabled styling to an item. If using the `link` scheme, the links won't be clickable.

### States

<div class="pulsar-example">
    <ul class="block-list">
        <li class="block-list__item has-info">.has-info</li>
        <li class="block-list__item has-success">.has-success</li>
        <li class="block-list__item has-warning">.has-warning</li>
        <li class="block-list__item has-danger">.has-danger / .has-error</li>
    </ul>
</div>

## Variations

### Underlined

`.block-list--underlined`

<div class="pulsar-example">
    <ul class="block-list block-list--underlined">
        <li class="block-list__item">One</li>
        <li class="block-list__item">Two</li>
        <li class="block-list__item">Three</li>
    </ul>
</div>

### Bordered

`.block-list--bordered`

<div class="pulsar-example">
    <ul class="block-list block-list--bordered">
        <li class="block-list__item">One</li>
        <li class="block-list__item">Two</li>
        <li class="block-list__item">Three</li>
    </ul>
</div>

### Full width

`.block-list--full` (bordered, to show width)

<div class="pulsar-example">
    <ul class="block-list block-list--bordered block-list--full">
        <li class="block-list__item">One</li>
        <li class="block-list__item">Two</li>
        <li class="block-list__item">Three</li>
    </ul>
</div>

### Horizontal

`.block-list--horizontal`

<div class="pulsar-example">
    <ul class="block-list block-list--horizontal">
        <li class="block-list__item">One</li>
        <li class="block-list__item">Two</li>
        <li class="block-list__item">Three</li>
    </ul>

    <ul class="block-list block-list--underlined block-list--horizontal">
        <li class="block-list__item">Underlined One</li>
        <li class="block-list__item">Underlined Two</li>
        <li class="block-list__item">Underlined Three</li>
    </ul>

    <ul class="block-list block-list--bordered block-list--horizontal">
        <li class="block-list__item">Bordered One</li>
        <li class="block-list__item">Bordered Two</li>
        <li class="block-list__item">Bordered Three</li>
    </ul>

    <ul class="block-list block-list--full block-list--horizontal">
        <li class="block-list__item">Full One</li>
        <li class="block-list__item">Full Two</li>
        <li class="block-list__item">Full Three</li>
    </ul>

    <ul class="block-list block-list--full block-list--horizontal block-list--underlined">
        <li class="block-list__item">Full Underlined One</li>
        <li class="block-list__item">Full Underlined Two</li>
        <li class="block-list__item">Full Underlined Three</li>
    </ul>

    <ul class="block-list block-list--full block-list--horizontal block-list--bordered">
        <li class="block-list__item">Full Bordered One</li>
        <li class="block-list__item">Full Bordered Two</li>
        <li class="block-list__item">Full Bordered Three</li>
    </ul>
</div>

### Contrast

`.block-list--contrast`

<div class="pulsar-example">
    <ul class="block-list block-list--contrast">
        <li class="block-list__item">One</li>
        <li class="block-list__item">Two</li>
        <li class="block-list__item">Three</li>
    </ul>

    <ul class="block-list block-list--underlined block-list--contrast">
        <li class="block-list__item">Underlined One</li>
        <li class="block-list__item">Underlined Two</li>
        <li class="block-list__item">Underlined Three</li>
    </ul>

    <ul class="block-list block-list--bordered block-list--contrast">
        <li class="block-list__item">Bordered One</li>
        <li class="block-list__item">Bordered Two</li>
        <li class="block-list__item">Bordered Three</li>
    </ul>
</div>

