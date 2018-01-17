---
layout: page
title: Label
category: Components
---

Provide extra contextual meaning to things, like stateful information.

## Example usage

{% raw %}
```twig
{{
    html.label({
        'label': 'new'
    })
}}
```
{% endraw %}

<div class="pulsar-example">
    <span class="label">default</span>&nbsp;
    <span class="label label--primary">primary</span>&nbsp;
    <span class="label label--success">success</span>&nbsp;
    <span class="label label--warning">warning</span>&nbsp;
    <span class="label label--danger">danger</span>&nbsp;
    <span class="label label--info">info</span>&nbsp;
    <span class="label label--inverse">inverse</span>&nbsp;
</div>

## Options

Option    | Type   | Description
--------- | ------ | --------------------------------------------------------------
class     | string | CSS classes, space separated
data      | hash   | data attributes by key/value
id        | string | A unique identifier, if required
label     | string | The value to display
removable | bool   | Displays a remove icon at the end of the label
data-*    | string | Data attributes, eg: `'data-foo': 'bar'`

## Styleguide

Labels are usually used to indicate a state and therefore should be past-participles or adjectives.

<div class="pulsar-example">
    <p>
        <span class="label label--inverse">locked</span> &nbsp; <span class="label">unlocked</span>&nbsp;
    </p>
    <p>
        <span class="label">visible</span>&nbsp;
        <span class="label label--warning">hidden</span>&nbsp;
    </p>
    <p>
        <span class="label label--success">published</span>&nbsp;
        <span class="label label--danger">offline</span>&nbsp;
    </p>
</div>

## Types

Labels accept the normal state variations through the `class` option.

{% raw %}
```twig
{{ html.label({ 'label': 'primary', 'class': 'label--primary' }) }}
{{ html.label({ 'label': 'success', 'class': 'label--success' }) }}
{{ html.label({ 'label': 'warning', 'class': 'label--warning' }) }}
{{ html.label({ 'label': 'danger', 'class': 'label--danger' }) }}
{{ html.label({ 'label': 'info', 'class': 'label--info' }) }}
{{ html.label({ 'label': 'inverse', 'class': 'label--inverse' }) }}
```
{% endraw %}

<div class="puslar-example">
    <span class="label">default</span>&nbsp;
    <span class="label label--primary">primary</span>&nbsp;
    <span class="label label--success">success</span>&nbsp;
    <span class="label label--warning">warning</span>&nbsp;
    <span class="label label--danger">danger</span>&nbsp;
    <span class="label label--info">info</span>&nbsp;
    <span class="label label--inverse">inverse</span>&nbsp;
</div>

## Removable labels

Add `'removable': true` to add a remove link after the label value. You'll need to wire up your own javascript to implement the behaviour.

{% raw %}
```twig
{{
    html.label({
        'label': 'Default',
        'removable': true
    })
}}
```
{% endraw %}

<div class="pulsar-example">
    <span class="label">default <a type="link" data-action="remove" data-action-target="this" class="btn  remove-button"><i class="icon-remove-sign"></i></a></span>&nbsp;
    <span class="label label--primary">primary <a type="link" data-action="remove" data-action-target="this" class="btn  remove-button"><i class="icon-remove-sign"></i></a></span>&nbsp;
    <span class="label label--success">success <a type="link" data-action="remove" data-action-target="this" class="btn  remove-button"><i class="icon-remove-sign"></i></a></span>&nbsp;
    <span class="label label--warning">warning <a type="link" data-action="remove" data-action-target="this" class="btn  remove-button"><i class="icon-remove-sign"></i></a></span>&nbsp;
    <span class="label label--danger">danger <a type="link" data-action="remove" data-action-target="this" class="btn  remove-button"><i class="icon-remove-sign"></i></a></span>&nbsp;
    <span class="label label--info">info <a type="link" data-action="remove" data-action-target="this" class="btn  remove-button"><i class="icon-remove-sign"></i></a></span>&nbsp;
    <span class="label label--inverse">inverse <a type="link" data-action="remove" data-action-target="this" class="btn  remove-button"><i class="icon-remove-sign"></i></a></span>&nbsp;
</div>

## Labels with tooltips

You should keep labels short and concise, tooltips can be used to provide further meaning if required.

{% raw %}
```twig
{{
    html.label({
        'label': '3 days ago',
        'class': 'label--primary',
        'tooltip_title': '4th July 2015 12:34pm',
        'tooltip_placement': 'right'
    })
}}
```
{% endraw %}

## Large labels

{% raw %}
```twig
{{
    html.label({
        'class': 'label--large'
        'label': 'biggy'
    })
}}

{{
    html.label({
        'label': 'smalls'
    })
}}
```
{% endraw %}

<div class="pulsar-example">
    <span class="label label--large">biggy</span>&nbsp;
    <span class="label">smalls</span>&nbsp;
</div>
