---
layout: page
title: Badge
category: Components
---

Highlight new or unread items. Limited usage is recommended, mainly for displaying numeric values in combination with other data to provide context. Do not use in place of labels, or any other similar element.

{% code_example html_helpers/badge %}

## Options

Option | Type   | Description
------ | ------ | --------------------------------------------------------------
class  | string | CSS classes, space separated
id     | string | A unique identifier, if required
label  | string | The value to display, usually an integer
data-* | string | Data attributes, eg: `'data-foo': 'bar'`

## Variations

Badges accept the normal state variations through the `class` option.

{% code_example html_helpers/badge-class %}

<div class="pulsar-example">
    <p>
        <span class="badge">1</span>
        <span class="badge badge--primary">2</span>
        <span class="badge badge--success">3</span>
        <span class="badge badge--warning">5</span>
        <span class="badge badge--danger">8</span>
        <span class="badge badge--info">13</span>
        <span class="badge badge--inverse">21</span>
    </p>
</div>

## Badged buttons

Badges within buttons will inherit the parent button styling without the need to define a specific badge style, which is nice.

{% code_example html_helpers/badge-buttons %}

<div class="pulsar-example">
    <p>
        <span class="badge">1</span>
        <span class="badge badge--primary">2</span>
        <span class="badge badge--success">3</span>
        <span class="badge badge--warning">5</span>
        <span class="badge badge--danger">8</span>
        <span class="badge badge--info">13</span>
        <span class="badge badge--inverse">21</span>
    </p>
</div>
