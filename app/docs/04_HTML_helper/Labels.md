## Label

### Example usage

    {{ html.label({ label: 'harro') }}

### Options

Option              | Description
------------------- | ----------------------------------------------------------
class               | (string) CSS classes, space separated
data                | (hash) data attributes by key/value
id                  | (string) A unique identifier, if required
label               | (string) The value to display
tooltip_title       | (string) Tooltip text to be shown on mouse over
tooltip_placement   | (string) top (default) | right | bottom | left

### Variations

Labels accept the normal state variations through the `class` option

    {{
        html.label({
            label: 'primary',
            class: 'label--primary'
        })
    }}

<span class="label">default</span>
<span class="label label--primary">primary</span>
<span class="label label--success">success</span>
<span class="label label--warning">warning</span>
<span class="label label--danger">danger</span>
<span class="label label--info">info</span>
<span class="label label--inverse">inverse</span>

### Labels with tooltips

    {{
        html.label({
            label: '3 days ago',
            class: 'label--primary',
            tooltip_title: '4th July 2015 12:34pm',
            tooltip_placement: 'right'
        })
    }}

<span class="label label--primary" data-toggle="tooltips" data-placement="right" title="4th July 2015 12:34pm">3 days ago</span>
