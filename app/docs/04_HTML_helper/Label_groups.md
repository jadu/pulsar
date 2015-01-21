Group a series of related labels together on a single line by passing the `labelGroup` helper an array of `label` elements.

Available parameters:

    {{ label_group(labels, class, attributes) }}

Usage:

    {{
        html.label_group(
            labels = [
                html.label(
                    label = 'case closed with decision', 
                    class = 'label--inverse'
                ),
                html.label(
                    label = 'checking details',
                    class = 'label--warning'
                )
            ]
        )
    }}

<div class="label-group">  <span class="label label--inverse">case closed with decision</span>  <span class="label label--warning">checking details</span></div>

## Variations (class)

The following modifier classes can be applied to the `class` attribute to change the size of the grouped labels

    <!-- The default label_group styling -->
    {{
        html.label_group(
            labels = [
                html.label(
                    label = 'case closed with decision', 
                    class = 'label--inverse'
                ),
                html.label(
                    label = 'checking details',
                    class = 'label--warning'
                )
            ]
        )
    }}
    
    <!-- Tall labels -->
    {{
        html.label_group(
            labels = [
                html.label(
                    label = 'case closed with decision',
                    class = 'label--inverse'
                ),
                html.label(
                    label = 'checking details',
                    class = 'label--info'
                )
            ],
            class = 'label-group--tall'
        )
    }}
    
    <!-- Tallest labels -->
    {{
        html.label_group(
            labels = [
                html.label(
                    label = 'case closed with decision',
                    class = 'label--inverse'
                ),
                html.label(
                    label = 'checking details',
                    class = 'label--danger'
                )
            ],
            class = 'label-group--tallest'
        )
    }}

<p>
<div class="label-group">  <span class="label label--inverse">case closed with decision</span>  <span class="label label--warning">checking details</span></div>
</p>

<p>
<div class="label-group label-group--tall">  <span class="label label--inverse">case closed with decision</span>  <span class="label label--info">checking details</span></div>
</p>

<p>
<div class="label-group label-group--tallest">  <span class="label label--inverse">case closed with decision</span>  <span class="label label--danger">checking details</span></div>
</p>
