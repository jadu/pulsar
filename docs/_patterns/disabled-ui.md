---
layout: page
title: Disabled UI
category: Patterns
---

The Disabled UI pattern allows you to disable a parts of a UI. This can be useful when an external action needs completing before the UI can be used. A message should be shown advising the user what action needs to be taken.

![Disabled UI]({{ site.baseurl }}/assets/image_examples/disabled-ui.png)


## Dependencies

##### Javascript

You will need the `DisableUiComponent` to be included in your browserify configuration.

Depending on your setup, this will probably need to be in a file called `index.js` or `main.js`.

```javascript
// index.js

var DisableUiComponent = require('/path/to/pulsar/DisableUiComponent');

module.exports = {
    DisableUiComponent: DisableUiComponent
}
```

```javascript
// main.js

var $html = $('html');

pulsar.disableUi = new pulsar.DisableUiComponent($html);

$(function () {
    pulsar.disableUi.init();
});
```

## Markup example

Add `data-disable-ui="true"` to the element you wish to disable. All child elements will also be disabled.

{% raw %}
```twig
<div data-disable-ui="true">
    {{ form.create() }}
        {{ form.fieldset_start({'legend': 'Filter by'}) }}

        {{
            form.select2({
                'label': 'Colour',
                'id': 'colour',
                'multiple': true,
                'placeholder': 'Choose one or more',
                'options': {
                    'colour_red': 'Red',
                    'colour_blue': 'Blue'
                }
            })
        }}

        {{
            form.text({
                'label': 'Text field example',
                'id': 'foo'
            })
        }}

        {{
            form.checkbox({
                'label': 'In stock',
                'id': 'inStock'
            })
        }}

    {{ form.fieldset_end() }}
    {{
        form.end({
            'actions': [
                form.submit({
                    'label': 'Save',
                    'class': 'btn--primary'
                }),
                html.link({
                    'label': 'Cancel',
                    'class': 'btn--naked',
                })
            ]
        })
    }}

</div>
```
{% endraw %}

