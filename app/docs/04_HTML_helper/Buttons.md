<a href="../Styleguides/Buttons" class="btn pull-right"><i class="icon-pencil"></i> Button Styleguide</a>
Interface buttons — while they look the same — can be links, buttons or inputs and can be used anywhere in the UI for different needs.

### Usage

    {{ html.button({ options }) }}

### Options

Option  | Description
------------- | -------------
class | CSS classes, space separated
href | The href attribute for `type: link` buttons only
id | A unique identifier, if required
label | The button label (or value, if using `type: submit`)
type | button (default) | link | input | submit
data | a hash of data attributes by key/value

### Multiple tags (type)

Where possible, you should use the default button type, but buttons can also be links and inputs.

    {{
        html.button({
            label: 'Button'
        })
    }}

    {{
        html.button({
            label: 'Link Button',
            type: 'link',
            href: 'http://myurl.com'
        })
    }}

    {{
        html.button({
            label: 'Input Button',
            type: 'input'
        })
    }}

    {{
        html.button({
            label: 'Submit Button',
            type: 'submit'
        })
    }}

<button class="btn">Button</button> <a href="http://myurl.com" class="btn" role="button">Link Button</a> <input type="button" class="btn" value="Input Button" /> <input type="submit" class="btn" value="Submit Button" />

### Variations

Buttons accept the normal state variations through the `class` option

    {{
        html.button(
            class: 'btn--primary'
            label = 'Example Primary Button'
        })
    }}

<button class="btn">Default</button>
<button class="btn btn--primary">.btn--primary</button>
<button class="btn btn--success">.btn--success</button>
<button class="btn btn--warning">.btn--warning</button>
<button class="btn btn--danger">.btn--danger</button>
<button class="btn btn--info">.btn--info</button>
<button class="btn btn--inverse">.btn--inverse</button>

### Disabled buttons

Adding the `is-disabled` class to a button will automatically add the `disabled` attribute to `button` `input` and `submit` type buttons.

    {{
        html.button({
            label: 'Disabled Button',
            class: 'is-disabled'
        })
    }}

    // output:
    // <button class="btn is-disabled" disabled="disabled">Disabled Button</button>

<button class="btn is-disabled" disabled>Disabled Button</button>
