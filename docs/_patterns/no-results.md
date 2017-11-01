---
layout: page
title: No results
category: Patterns
---

When an interface needs to list items you should provide a helpful fallback message for when no results are found. If the user has the relevant permissions to create or add one of these items, you should provide a call to action to help them along their way.

No result messages have subtle, unique styling to differentiate them from regular content.

## Basic message

A generic component to use wherever suitable, can be used within an empty tab if no content is available but the tab still needs to be displayed for navigation purposes.

```html
<div class="no-results">
    <div class="no-results__message">
        <p>There are currently no {things} to display</p>
    </div>
    <a href="#" class="btn btn--primary no-results__action">Create {Thing}</a>
</div>
```

<div class="pulsar-example">
    <div class="no-results">
        <div class="no-results__message">
            <p>There are currently no {things} to display</p>
        </div>
        <a href="#" class="btn btn--primary no-results__action">Create {Thing}</a>
    </div>
</div>

## Empty tables

You should still display the column titles in the table header, this helps to inform the user about what kind of data is normally present in the table.

<div class="alert alert-info" role="alert"><i class="fa fa-info-circle"></i> If you're using datatables instead of plain HTML tables you simply need to have a table with no rows in the body and this message will be displayed automatically. Check the <a href="datatable.md">datatable  documentation</a> for more information on how to customise this message.</a></div>

Use the following markup inside your `<table>`:

```html
<tbody>
    <tr>
        <td class="no-results" colspan="99">
            <div class="no-results__message">
                <p>There are currently no {things} to display</p>
            </div>
            <a href="#" class="btn btn--primary no-results__action">Create {Thing}</a>
        </td>
    </tr>
</tbody>
```

<div class="pulsar-example">
    <table class="datatable">
        <thead>
            <tr class="table__tr">
                <th class="table__th">
                    <a href="#">Title</a>
                </th>
                <th class="table__th">
                    <a href="#">Created</a>
                </th>
                <th class="table__th">
                    <a href="#">Modified</a>
                </th>
                <th class="table__th">
                    <a href="#">Author</a>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="table__tr">
                <td class="table__td no-results" colspan="99">
                  <div class="no-results__message">
                    <p>There are currently no {things} to display</p>
                  </div>
                  <a href="#" class="btn btn--primary no-results__action">Create {Thing}</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
