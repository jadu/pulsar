The data grid is the primary way to display lists of content and is basically a table within tab. The first column in a data grid is reserved for the `row__actions` checkboxes which allow a user to select multiple items to perform actions on.

Currently, there's no helper for data grids so simply place your table markup, using the `table--datagrid` class, in your tab.

    <table class="table--datagrid">
        <thead>
            <tr>
                <th class="row__actions">
                    <input type="checkbox" />
                </th>
                <th><a href="#">Title</a></th>
                <th><a href="#">Created</a></th>
                <th><a href="#">Modified</a></th>
                <th><a href="#">Author</a></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="row__actions">
                    <input type="checkbox" />
                </td>
                <td><a href="#">Example content item</a></td>
                <td>Monday 4th July, 2013</td>
                <td>3 hours ago</td>
                <td>Paul Stanton</td>
            </tr>
        </tbody>
    </table>

<br />
<table class="table--datagrid">
    <thead>
        <tr>
            <th class="row__actions">
                <input type="checkbox" />
            </th>
            <th><a href="#">Title</a></th>
            <th><a href="#">Created</a></th>
            <th><a href="#">Modified</a></th>
            <th><a href="#">Author</a></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="row__actions">
                <input type="checkbox" />
            </td>
            <td><a href="#">Example content item</a></td>
            <td>Monday 4th July, 2013</td>
            <td>3 hours ago</td>
            <td>Paul Stanton</td>
        </tr>
    </tbody>
</table>

There are a handful of row modifier classes to highlight different states

<table class="table--datagrid">
   <tbody>
   <thead>
        <tr>
            <th>
                Header
            </th>
        </tr>
    </thead>
       <tr>
           <td>Default</td>
       </tr>
       <tr class="is-selected">
           <td>.is-selected</td>
       </tr>
       <tr class="row--highlight">
           <td>.row--highlight</td>
       </tr>
       <tr class="row--success-highlight">
           <td>.row--success-highlight</td>
       </tr>
       <tr class="row--warning-highlight">
           <td>.row--warning-highlight</td>
       </tr>
       <tr class="row--danger-highlight">
           <td>.row--danger-highlight</td>
       </tr>
       <tr class="row--success">
           <td>.row--success</td>
       </tr>
       <tr class="row--warning">
           <td>.row--warning</td>
       </tr>
       <tr class="row--danger">
           <td>.row--danger</td>
       </tr>
   </tbody>
</table>
