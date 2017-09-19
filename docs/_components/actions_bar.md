---
layout: page
title: Actions bar
category: Components
---

The actions bar is a component within a tab which is split into left/right sides and contains important controls for a given user interface.

<div class="pulsar-example">
    <div class="actionsbar">
        <div class="u-float-left">
            <div class="btn__group dropdown">
                <button class="btn dropdown__toggle" data-toggle="dropdown">Actions&nbsp;<span class="caret"></span></button>
                <ul class="dropdown__menu pull-left">
                    <li><a href="/save"><i class="icon-save"></i>&nbsp;Save</a></li>
                    <li><a href="/edit"><i class="icon-pencil"></i>&nbsp;Edit</a></li>
                    <li><span class="divider"></span></li>
                    <li><a href="/delete"><i class="icon-remove"></i>&nbsp;Delete</a></li>
                </ul>
            </div>
        </div>
        <div class="u-float-right">
            <button class="btn btn--primary">Primary Action</button>
        </div>
    </div>
</div>

The actions bar is optional and can be omitted if the UI doesn't require  an actions menu or primary actions.

## Blocks

There are two blocks that you can populate with actions: `actions_left` and `actions_right`. You probably guessed these are normally on either side of the screen but on mobile devices they're stacked vertically, with the left block appearing above the right and buttons expanding to take up the full width of the screen.

<div class="panel panel--info">
    <div class="panel__title">
        <i class="icon-info-sign"></i> Important
    </div>
    <div class="panel__body">
        <p>In order to use these blocks, the tab UI in question MUST extend the tab component template.</p>
    </div>
</div>

The `actions_left` block will typically contain only the `html.actions_menu` dropdown helper, detailed below.

The `actions_right` block will typically contain [buttons](button.md) illustrating the primary action(s) for a given UI, but may also use [button_groups](button_group.md) and/or [dropdowns](button_dropdown.md) if suitable.

###### Example tab view

{% raw %}
```twig
{% extends '@pulsar/pulsar/components/tab.html.twig' %}

{%- block actions_left -%}
    {{
        html.actions_menu({
            'items': [ ... ]
        })
    }}
{%- endblock -%}

{%- block actions_right -%}
    {{
        html.button({
            'label': 'Primary Action',
            'class': 'btn--primary'
        })
    }}
{%- endblock -%}

{# rest of the tab content #}
{% block tab_content %} ... {% endblock tab_content %}
{% block tab_sidebar %} ... {% endblock tab_sidebar %}
```
{% endraw %}

## Actions menu

The actions menu is a contextual element that provides a useful place to gather together the main actions that can be performed within a given UI, even if they occur in a tab not currently active. Think of this as similar to the 'File' menu that appears in most desktop software.

The actions menu items should relate to the main user interface a user is in, not necessarily the specific tab they're in at the time.

If a UI has multiple tabs, the actions menu should provide links to the primary actions within each tab, without the need for the user to navigate to that tab first.

<div class="pulsar-example" style="height: 300px;">
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
            <li><a href="/delete"><i class="icon-remove"></i>&nbsp;Delete</a></li>
        </ul>
    </div>
</div>

### Adding actions menu items

The actions menu helper accepts a nested array of Twig hashes which contain the options normally available to the [html.link](link.md) helper. Use [icons](icon.md) as much as possible to further illustrate the action performed by each option.

The actions menu helper will automatically add [dividers](divider.md) based on the way items are grouped. In the following example, the divider will be placed between 'Edit' and 'Delete' because they exist in separate arrays.

###### Options available for `items`

Option | Type   | Description
------ | ------ | --------------------------------------------------------------
class  | string | CSS classes, space separated
href   | string | The URL attribute
icon   | string | An icon to place before the label
id     | string | A unique identifier, if required
label  | string | The link text label
data-* | string | Data attributes, eg: `'data-foo': 'bar'`

###### Example

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

<div class="pulsar-example" style="height: 200px;">
    <div class="btn__group dropdown open">
        <button class="btn dropdown__toggle" data-toggle="dropdown">Actions&nbsp;<span class="caret"></span></button>
        <ul class="dropdown__menu pull-left">
            <li><a href="/save"><i class="icon-save"></i>&nbsp;Save</a></li>
            <li><a href="/edit"><i class="icon-pencil"></i>&nbsp;Edit</a></li>
            <li><span class="divider"></span></li>
            <li><a href="/delete"><i class="icon-remove"></i>&nbsp;Delete</a></li>
        </ul>
    </div>
</div>
