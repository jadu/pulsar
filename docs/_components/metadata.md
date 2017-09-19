---
layout: page
title: Metadata
category: Components
---

Provides a simple way to mark up key/value information provided by a Twig hash or JSON object.

## Example usage

{% code_example html_helpers/metadata %}

<div class="pulsar-example">
    <dl class="metadata">
        <dt class="metadata__key">File</dt><!--
     --><dd class="metadata__value">true_lies.avi</dd>
        <dt class="metadata__key">Size</dt><!--
     --><dd class="metadata__value">1.2 Gb</dd>
        <dt class="metadata__key">Type</dt><!--
     --><dd class="metadata__value">Video</dd>
    </dl>
</div>

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

<div class="pulsar-example">
    <dl class="metadata metadata--bordered">
        <dt class="metadata__key">File</dt><!--
     --><dd class="metadata__value">true_lies.avi</dd>
        <dt class="metadata__key">Size</dt><!--
     --><dd class="metadata__value">1.2 Gb</dd>
        <dt class="metadata__key">Type</dt><!--
     --><dd class="metadata__value">Video</dd>
    </dl>
</div>
