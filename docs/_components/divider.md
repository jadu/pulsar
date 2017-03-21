---
layout: page
title: Divider
category: Components
---

Used to visually group or separate links in [html.button_dropdown](button_dropdown.md) elements.

<p data-height="180" data-theme-id="24005" data-slug-hash="dGVOZg" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/dGVOZg/'>dGVOZg</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Basic usage

{% code_example html_helpers/divider %}

## Dropdown buttons

You'll mainly use this when building [html.button_dropdown](button_dropdown.md) elements.

{% raw %}
```twig
{{
    html.button_dropdown({
        'label': 'Drop Down',
        'items': [
            html.link({ 
                'label': 'Save', 
                'href': '/save',
                'icon': 'save'
            }),
            html.link({ 
                'label': 'Edit', 
                'href': '/edit',
                'icon': 'pencil'
            }),
            html.divider(),
            html.link({ 
                'label': 'Delete', 
                'href': '/delete',
                'icon': 'remove'
            }),
        ]
    })
}}
```
{% endraw %}

## Actions menu

The actions menu helper will automatically add dividers based on the way items are grouped. The divider will still be placed between 'Edit' and 'Delete' because they exist in separate arrays.

{% raw %}
```twig
{{
    html.actions_menu({
        'items': [
            [
                {
                    'label': 'Save',
                    'href': '/save',
                    'icon': 'save'
                },
                {
                    'label': 'Edit',
                    'href': '/edit',
                    'icon': 'pencil'
                }
            ],
            [
                {
                    'label': 'Delete',
                    'href': '/delete',
                    'icon': 'remove'
                }
            ]
        ]
    })
}}
```
{% endraw %}

## When to use

Dropdown buttons should group related links together based on their function, there are no hard and fast rules here and you should use your own judgement/common sense.

An example might be to separate actions relating to publishing from those which affect the status of a content item.

Delete actions should ideally be placed as the last item, and be separated with a divider. Multiple delete actions should be grouped (delete / delete all).

<p data-height="280" data-theme-id="24005" data-slug-hash="XXeNXM" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/XXeNXM/'>XXeNXM</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
