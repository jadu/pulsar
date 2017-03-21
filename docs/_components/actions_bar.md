---
layout: page
title: Actions bar
category: Components
---

The actions bar is a component within a tab which is split into left/right sides and contains important controls for a given user interface.

<p data-height="90" data-theme-id="24005" data-slug-hash="bEoRMr" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/bEoRMr/'>bEoRMr</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

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

<p data-height="280" data-theme-id="24005" data-slug-hash="XXeNXM" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/XXeNXM/'>XXeNXM</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

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

<p data-height="180" data-theme-id="24005" data-slug-hash="dGVOZg" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/dGVOZg/'>dGVOZg</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
