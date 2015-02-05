## Progress

Provide up-to-date feedback on the progress of a workflow or action with simple progress bars.

### Example usage

    {{
        html.progress({
            'value': 25
        })
    }}

### Options

Option          | Description
--------------- | --------------------------------------------------------------
class           | (string) CSS classes, space separated
data            | (hash) data attributes by key/value
id              | (string) A unique identifier, if required
label           | (string) Text to display inside the progress bar
value           | (int) The percentage value of the progress bar
value_visible   | (bool) Whether to visually display the value inside the bar (default false)

### Variations

<div class="progress">
    <div class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;">
        <span class="hide">50%</span>
    </div>
</div>

<div class="progress">
    <div class="progress-bar progress-bar--warning" role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" style="width: 33%;">
        33%
    </div>
</div>


<div class="progress">
    <div class="progress-bar progress-bar--danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%;">
        80% uploaded
    </div>
</div>

<div class="progress">
    <div class="progress-bar progress-bar--success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
        uploaded <i class="icon-ok"></i>
    </div>
</div>
