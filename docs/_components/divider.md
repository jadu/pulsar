---
layout: page
title: Divider
category: Components
---

Used to visually group or separate links in [html.button_dropdown](button_dropdown.md) elements.

<div class="pulsar-example" style="height: 200px">
    <div class="btn__group dropdown open">
        <button class="btn dropdown__toggle" data-toggle="dropdown">Actions&nbsp;<span class="caret"></span></button>
        <ul class="dropdown__menu pull-left">
            <li><a href="/save"><i class="icon-save"></i>&nbsp;Save</a></li>
            <li><a href="/edit"><i class="icon-pencil"></i>&nbsp;Edit</a></li>
            <li><span class="divider"></span></li>
            <li><a href="/delete" class="link--danger"><i class="icon-remove"></i>&nbsp;Delete</a></li>
        </ul>
    </div>
</div>

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

<div class="pulsar-example" style="height: 300px">
    <div class="btn__group dropdown open">
        <button class="btn dropdown__toggle" data-toggle="dropdown">Actions&nbsp;<span class="caret"></span></button>
        <ul class="dropdown__menu pull-left">
            <li><a href="/save"><i class="icon-save"></i>&nbsp;Save</a></li>
            <li><a href="/edit"><i class="icon-pencil"></i>&nbsp;Edit</a></li>
            <li><span class="divider"></span></li>
            <li><a href="/publish"><i class="icon-cloud-upload"></i>&nbsp;Publish</a></li>
            <li><a href="/translate"><i class="icon-globe"></i>&nbsp;Translate</a></li>
            <li><a href="/locl"><i class="icon-lock"></i>&nbsp;Lock</a></li>
            <li><span class="divider"></span></li>
            <li><a href="/delete" class="link--danger"><i class="icon-remove"></i>&nbsp;Delete</a></li>
        </ul>
    </div>
</div>
