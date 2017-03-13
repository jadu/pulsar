---
layout: page
title: Datatables
category: Components
---

Datatables use the datatables.net plugin to provide a nice amount of functionality to your data. Pulsar's configuration includes plugins to make them responsive.

## Dependencies

##### Javascript

The following libraries should be included in your product's `package.json`  file:

```javascript
/* package.json */

"devDependencies": {
    "datatables.net": "^1.10.11",
    "datatables.net-buttons": "^1.1.2",
    "datatables.net-buttons-dt": "^1.1.2",
    "datatables.net-dt": "^1.10.10",
    "datatables.net-responsive": "^2.0.2",
    "datatables.net-responsive-dt": "^2.0.0",
    "datatables.net-select": "^1.1.2",
    "datatables.net-select-dt": "^1.1.2"
}
```

##### Sass

You will need both the base tables styles, and the datatables extras.

```css
/* pulsar.scss */

@import '/path/to/bundles/pulsar/stylesheets/_component.tables';
@import '/path/to/bundles/pulsar/stylesheets/_component.datatables';
```

## Configuration

The `DataTable` plugin is called on any table containing the `datatable` class. Pulsar has a core configuration within `pulsarUIComponent`, but there may be times when you need to create your own custom config.

## Markup

{% raw %}
```twig
{# index.html.twig #}

{% block tab_content %}
    <table class="table datatable table--full">
        <thead>
            <tr>
                <th class="table-responsive"></th>
                <th class="table-selection"></th>
                <th><a href="#">Column heading 1</a></th>
                <th><a href="#">Column heading 2</a></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="table-responsive">
                    {{ html.link({ 'class': 'table-child-toggle', 'href': '#', 'label': html.icon('plus-sign') }) }}
                </td>
                <td class="table-selection">
                    {{ html.icon('unchecked', { 'class': 'table-row-select js-select' }) }}
                </td>
                <td>Column data 1</td>
                <td>Column data 2</td>
            </tr>
        </tbody>
    </table>
{% endblock tab_content %}
```
{% endraw %}

<p data-height="740" data-theme-id="24005" data-slug-hash="zKKEQP" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/zKKEQP/">docs - layout - datatable</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

(Because of the width of this documentation example, this table looks slighly different when used in a real UI.

## Disable row selection

Datatables allow selection of rows by default, this behaviour can be disabled through the `data-selection` attribute. This will hide the related elements in the UI.

```html
<table class="table datatable" data-selection="false">
 ...
</table>
```

## No results

If a table has nothing to display we provide a helpful message to the user so they understand why nothing is shown. If they have the relevant permissions to add something to this table, you should provide a call to action.

The message will be shown automatically if the table body contains no rows, if can (and should) be customised by the `data-empty-table` attribute.

```html
<table class="table datatable" data-empty-table="There are currently no people to display">
    <thead>
        <tr>
            <th><a href="#">Name</a></th>
            <th><a href="#">Company</a></th>
            <th><a href="#">Phone</a></th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
```

<p data-height="360" data-theme-id="24005" data-slug-hash="RGGjYP" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/RGGjYP/">docs - layout - datatable</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>
