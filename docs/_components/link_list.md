---
layout: page
title: Link list
category: Components
---

A specialised method to create a list of links without the need to manually call multiple `html.link` helpers.

Lists are purposely left unstyled, but you can use [block lists](block_list.md) if you need nicer styling.

## Example usage

{% code_example html_helpers/link-list %}

<div class="pulsar-example">
    <ul>
        <li><a href="#href_one">Value one</a></li>
        <li><a href="#href_two">Value two</a></li>
    </ul>
</div>

## Options

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
active_item | int    | The index of the active item, will have the `.is-active` class applied
class       | string | CSS classes, space separated
id          | string | A unique identifier, if required
items       | hash   | A hash of links formatted by `{ label: href }`
type        | string | `ul` (default), `ol`
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`
