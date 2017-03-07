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

<p data-height="200" data-theme-id="24005" data-slug-hash="23007709f1b7599bd02e9a900d0728fc" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/23007709f1b7599bd02e9a900d0728fc/'>docs - no results - div</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

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

<p data-height="250" data-theme-id="24005" data-slug-hash="5910a7eb9ebf079c8f2bddd1acafb645" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/5910a7eb9ebf079c8f2bddd1acafb645/'>docs - table - no results</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script
