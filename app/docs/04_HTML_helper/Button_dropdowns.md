## Button dropdown

Show a dropdown/dropup menu when the button is clicked

### Example usage

    {{
        html.button_dropdown({
            'label': 'Drop Me Down',
            'items': [
                'foo',
                'bar'
            ]
        })
    }}

### Options

Option      | Description
----------- | ----------------------------------------------------------------------
caret       | (bool) Whether to show the caret arrow in the label (default true)
class       | (string) A space separated list of class names (applied to the container)
direction   | (string) down (default) | up
data        | (hash) Data attributes by key/value (applied to the button)
id          | (string) A unique identifier, if required (applied to the button)
items       | (array) An array of items to put in the dropdown list (usually links)
label       | (string) The button label

Pass a list of links to the `menu_items` parameter to be used as the dropdown/up menu, remember you can chain together icons, labels and badges too.

    {{
        html.button_dropdown({
            'label': 'Drop Down',
            'items': [
                html.link({ 'label': 'foo' }),
                html.link({ 'label': 'bar' })
            ]
        })
    }}

### Variations

Change the position of the menu with the `direction` option

    {{
        html.button_dropdown({
            'direction': 'up',
            'label: 'Drop Up',
            'items': [
                html.link({ 'label': 'foo' }),
                html.link({ 'label': 'bar' })
            ]
        })
    }}

<div class="btn__group">
<button type="button" class="btn dropdown__toggle" data-toggle="dropdown">Drop Down <span class="caret"></span></button>
<ul class="dropdown__menu">
<li><a href="#">foo</a></li>
<li><a href="#">bar</a></li>
</ul>
</div>

<div class="btn__group dropup">
<button type="button" class="btn dropdown__toggle" data-toggle="dropdown">Drop Up <span class="caret"></span></button>
<ul class="dropdown__menu">
<li><a href="#">foo</a></li>
<li><a href="#">bar</a></li>
</ul>
</div>
