---
layout: page
title: List
category: Components
---

Pass an array of items and have them rendered as a simple unordered or ordered list, this is
particularly useful when chained with other helpers.

Lists are purposely left unstyled, but you can use [block lists](block_list.md) if you need nicer styling.

## Example usage

{% code_example html_helpers/list %}

<div class="pulsar-example">
    <ul>
        <li>foo</li>
        <li>bar</li>
    </ul>
</div>

## Options

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
active_item | int    | The index of the active item, will have the `.is-active` class applied
class       | string | CSS classes, space separated
id          | string | A unique identifier, if required
items       | array  | An array of items to be rendered as a list
type        | string | `ul` (default), `ol`
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`

## Block list

Add prettier styling around your lists with the `.block-list` variations. See the [block list page](block_list.md) for more information.

<div class="pulsar-example">
    <ul class="block-list block-list--bordered">
        <li class="block-list__item">
            One
        </li>
        <li class="block-list__item">
            Two
        </li>
        <li class="block-list__item">
            Three
        </li>
    </ul>
</div>
