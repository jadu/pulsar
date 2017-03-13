---
layout: page
title: Metadata
category: Components
---

Provides a simple way to mark up key/value information provided by a Twig hash or JSON object.

## Example usage

{% code_example html_helpers/metadata %}

<p data-height="120" data-theme-id="24005" data-slug-hash="JYGvOg" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/JYGvOg/'>JYGvOg</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Options

Option | Type   | Description
------ | ------ | --------------------------------------------------------------
class  | string | CSS classes, space separated
id     | string | A unique identifier, if required
items  | hash   | A hash of data where key: value = title: description
data-* | string | Data attributes, eg: `'data-foo': 'bar'`

## Bordered variation

{% raw %}
```twig
{# an example of passing data via a Twig hash #}
{%
    set data = {
        "File" : "true_lies.avi",
        "Size" : "1.2Gb",
        "Type" : "Video"
    }
%}

{{
    html.metadata({
        'items': data,
        'class': 'metadata--bordered'
    })
}}
```
{% endraw %}

<p data-height="100" data-theme-id="24005" data-slug-hash="LpGmQY" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/LpGmQY/'>Metadata bordered</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
