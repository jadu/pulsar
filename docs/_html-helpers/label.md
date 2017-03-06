---
layout: page
title: Label
category: HTML helpers
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
    
<p data-height="60" data-theme-id="24005" data-slug-hash="PzooGE" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/PzooGE/">PzooGE</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

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

<p data-height="160" data-theme-id="24005" data-slug-hash="GqRRXd" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/GqRRXd/">GqRRXd</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

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

<p data-height="60" data-theme-id="24005" data-slug-hash="PzooGE" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/PzooGE/">PzooGE</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

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

<p data-height="60" data-theme-id="24005" data-slug-hash="LZYYjb" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/LZYYjb/">LZYYjb</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

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

<p data-height="60" data-theme-id="24005" data-slug-hash="yJLLEm" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/yJLLEm/">yJLLEm</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
