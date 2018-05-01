---
layout: page
title: Breadcrumb
category: Layout
---

A basic helper to render a list of breadcrumb links. A view should set a `breadcrumbs` object which will then be rendered by the base template.

## Breadcrumbs object

{% code_example html_helpers/breadcrumb %}

<div class="pulsar-example">
    <nav class="breadcrumb">
        <a href="#foo">foo</a> /
        <a href="#bar">bar</a> /
        <a href="#baz">baz</a>
    </nav>
</div>

## Helper

You will need the breadcrumb helper in your base template, normally within the tabs content block

{% raw %}
```twig
<div class="content-main">
    <div class="tabs__content">
        {{ nav.breadcrumbs(breadcrumbs|default) }}
        ...
```
{% endraw %}
