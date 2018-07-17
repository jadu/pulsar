---
layout: page
title: Table detail
category: Patterns
---

The table detail pattern allows a user to view additional information relevant to a row whilst staying in context.

![Table detail UI example gif]({{ site.baseurl }}/assets/image_examples/table-detail.gif)

## Dependencies

##### Javascript

You will need the `TableDetailComponent` to be included in your browserify configuration.

Depending on your setup, this will probably need to be in a file called `index.js` or `main.js`.

```javascript
// index.js

var TableDetailComponent = require('/path/to/pulsar/TableDetailComponent');

module.exports = {
    TableDetailComponent: TableDetailComponent
}
```

```javascript
// main.js

var $html = $('html');

pulsar.tableDetail = new pulsar.TableDetailComponent($html);

$(function () {
    pulsar.tableDetail.init();
});
```

## Markup

You'll need to add the following data attributes to your table markup.

Data attribute                       | Value       | Description
------------------------------------ | ----------- | ---------------------------------------------------------
data-table-detail-table              |             | Add to the `table` element you which to use the table-detail pattern on.
data-table-detail-content            | html string | Add to each `tr` element. The value of the attribute should be the content to display in the detail panel when the row link is clicked.
data-table-detail-view-detail        | true        | Add to the link you want to trigger the detail panel for the row.
data-table-detail-panel-custom-title | string      | Allows you to set a custom title on the details when this row is clicked. Add to the `tr` element with the string you wish to use for the custom title.

{% raw %}
```twig
<table class="table table--full" data-table-detail-table>
    <thead>
        <tr>
            <th><a href="#">Date</a></th>
            <th><a href="#">Time</a></th>
            <th><a href="#">User type</a></th>
            <th><a href="#">Event</a></th>
            <th><a href="#">Actions</a></th>
        </tr>
    </thead>
    <tbody>
        <tr data-table-detail-content="<div class=&quot;padding&quot;><span class=&quot;label&quot;>Waiting on client</span> to <span class=&quot;label&quot;>Open</span></div>" data-table-detail-panel-custom-title="A custom title set on the clicked TR">
            <td>13/01/2017</td>
            <td>3:30pm</td>
            <td><span class="label label--success">staff</span></td>
            <td>Status changed</td>
            <td><a href="#" class="table-action" data-table-detail-view-detail="true">Details</a></td>
        </tr>
    </tbody>
</table>
```
{% endraw %}


