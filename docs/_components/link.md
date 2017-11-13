---
layout: page
title: Link
category: Components
---

Creates a simple HTML link, often used inside other helpers.

## Example usage

{% code_example html_helpers/link %}

<div class="pulsar-example">
    <a href="https://www.jadu.net">Jadu</a>
</div>

## Options

Option | Type   | Description
------ | ------ | --------------------------------------------------------------
class  | string | CSS classes, space separated
href   | string | The URL attribute
icon   | string | An icon to place before the label
id     | string | A unique identifier, if required
label  | string | The link text label
data-* | string | Data attributes, eg: `'data-foo': 'bar'`

## Icons

Use icons to add extra meaning to your links.

{% code_example html_helpers/link-icon-after %}

<div class="pulsar-example">
    <a href="#">External link <i class="icon-external-link"></i></a>
</div>

{% code_example html_helpers/link-icon-before %}

<div class="pulsar-example">
    <a href="#"><i class="icon-arrow-up"></i> Back to top</a>
</div>

