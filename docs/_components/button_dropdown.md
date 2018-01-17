---
layout: page
title: Button dropdown
category: Components
---

Show a dropdown/dropup menu when the button is clicked.

## Example usage

{% raw %}
```twig
{{
    html.button_dropdown({
        'label': 'Drop Down',
        'items': [
            html.link({ 'label': 'foo', 'href': '#foo' }),
            html.link({ 'label': 'bar', 'href': '#bar' })
        ]
    })
}}
```
{% endraw %}

<div class="pulsar-example" style="height: 150px;">
    <div class="btn__group dropdown open">
        <button type="button" class="btn dropdown__toggle" data-toggle="dropdown">Drop Down
        <span class="caret"></span></button>
        <ul class="dropdown__menu">
            <li><a href="#foo">foo</a></li>
            <li><a href="#bar">bar</a></li>
        </ul>
    </div>
</div>

## Options

Option    | Type   | Description
--------- | ------ | -----------------------------------------------------------
caret     | bool   | Whether to show the caret arrow in the label (default true)
class     | string | A space separated list of class names (applied to the button)
direction | string | `down` (default) or `up`
id        | string | A unique identifier, if required (applied to the button)
items     | array  | An array of items to put in the dropdown list (usually links)
label     | string | The button label
data-*    | string | Data attributes, eg: `'data-foo': 'bar'` (applied to the button)

## Menu items

Pass a list of `html.link` items to the `menu_items` parameter to be used as the dropdown/up menu, remember you can chain together icons, labels and badges in the link label too.

{% raw %}
```twig
{{
    html.button_dropdown({
        'label': 'Drop Down',
        'items': [
            html.link({ 'label': 'foo', 'href': '#foo' }),
            html.link({ 'label': 'bar', 'href': '#bar' })
        ]
    })
}}
```
{% endraw %}

<div class="pulsar-example" style="height: 250px">
    <div class="btn__group dropdown open">
        <button data-toggle="dropdown" class="btn dropdown__toggle">Drop Down&nbsp;<span class="caret"></span></button>
        <ul class="dropdown__menu pull-left">
            <li><a href="#"><i class="icon-save"></i> Save</a></li>
            <li><a><i class="icon-print"></i> Print</a></li>
            <li><a disabled="" aria-disabled="true" class="is-disabled"><i class="icon-lock"></i> Lock</a></li>
            <li><a><i class="icon-group"></i> Collaborators <span class="badge">3</span></a></li>
            <li><span class="divider"></span></li><li><a href="#" class="link--danger"><i class="icon-trash"></i> Delete</a></li>
        </ul>
    </div>
</div>

## Dropup

Change the placement of the menu with the `direction` option.

{% raw %}
```twig
{{
    html.button_dropdown({
        'direction': 'up',
        'label': 'Drop Up',
        'items': [
            html.link({ 'label': 'foo', 'href': '#foo' }),
            html.link({ 'label': 'bar', 'href': '#bar' })
        ]
    })
}}
```
{% endraw %}

<div class="pulsar-example" style="height: 150px;">
    <!-- INLINE STYLES FOR DOCUMENTATION PURPOSES ONLY -->
    <div class="btn__group dropup open" style="position: relative; margin-top: 70px;">
        <button type="button" class="btn dropdown__toggle" data-toggle="dropdown">Drop Up
        <span class="caret"></span></button>
        <ul class="dropdown__menu">
            <li><a href="#foo">foo</a></li>
            <li><a href="#bar">bar</a></li>
        </ul>
    </div>
</div>

## Divider

Separate menu items with a horizontal line.

{% raw %}
```twig
{{
    html.button_dropdown({
        'label': 'Drop Down',
        'items': [
            html.link({ 'label': 'foo' }),
            html.divider(),
            html.link({ 'label': 'bar' })
        ]
    })
}}
```
{% endraw %}

<div class="pulsar-example" style="height: 160px;">
    <div class="btn__group dropdown open">
        <button type="button" class="btn dropdown__toggle" data-toggle="dropdown">Drop Down <span class="caret"></span></button>
        <ul class="dropdown__menu">
            <li><a href="#">foo</a></li>
            <li><span class="divider"></span></li>
            <li><a href="#">bar</a></li>
        </ul>
    </div>
</div>

## Tooltips within a dropdown

To add a tooltip to a dropdown menu item, you'll need to use the `container` option and append the tooltip to `body` to avoid the tooltip text wrapping incorrectly.

{% raw %}
```twig
{{
    html.button_dropdown({
        'label': 'Drop Down',
        'items': [
            html.link({ 'label': 'No tooltip', 'href': '#foo' }),
            html.link({
                'label': 'With tooltip',
                'href': '#bar',
                'title': 'My tooltip',
                'data-toggle': 'tooltips',
                'data-placement': 'right',
                'data-container': 'body'
            })
        ]
    })
}}
```
{% endraw %}

With container set to body:
![Tooltip on dropdown menu item with container set to body]({{ site.baseurl }}/assets/image_examples/dropdown-menu-with-tooltip-on-body.png)

Without container set to body:
![Tooltip on dropdown menu item with container set to body]({{ site.baseurl }}/assets/image_examples/dropdown-menu-with-tooltip.png)

