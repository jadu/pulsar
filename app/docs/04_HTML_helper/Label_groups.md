## Label group

Group a series of related labels together on a single line by passing the `labelGroup` helper an array of `label` elements.

### Example usage

    {{
        html.label_group({
            labels: [
                html.label({ 'label': 'foo' }),
                html.label({ 'label': 'bar' })
            ]
        })
    }}

<p>
    <div class="label-group">
        <span class="label label--danger">foo</span>
        <span class="label label--success">bar</span>
    </div>
</p>

### Options

Option              | Description
------------------- | ------------------------------------------------------
class               | (string) CSS classes, space separated
data                | (hash) data attributes by key/value
id                  | (string) A unique identifier, if required
labels              | (array) The labels to group

### Variations

The following modifier classes can be applied to the `class` attribute to change the height of the grouped labels.

* `label-group--tall`
* `label-group--tallest`

<p>
    <div class="label-group">
        <span class="label">normal</span>
        <span class="label label--warning">height</span>
    </div>
</p>

<p>
    <div class="label-group label-group--tall">
        <span class="label label--warning">tall</span>
        <span class="label label--danger">height</span>
    </div>
</p>

<p>
    <div class="label-group label-group--tallest">
        <span class="label label--danger">tallest</span>
        <span class="label label--inverse">height</span>
    </div>
</p>
