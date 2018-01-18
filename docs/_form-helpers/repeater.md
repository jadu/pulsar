---
layout: page
title: Repeater 
category: Form helpers
---

Create a repeatable set of form fields that can be added, removed & deleted.

![repeater example]({{ site.baseurl }}/assets/image_examples/repeater.gif)

The Repeater consists of an opening and closing macro. Any number of Pulsar components can be placed inside.

## Headings

The main configuration item of note is the `headings` property. It is here that we define which nested components are represented as a heading in the Repeater preview. If a nested component does not have an associated heading it will still function as desired, it's input will be saved and submitted as part of the form request. This allows a user to choose 2-3 preview headings to summarise the contents of a Repeater whilst having as many fields as required.

Headings must be described as an array of objects in the following schema:

```javascript
{
    headings: [
        { name: string, label: string }        
    ]    
}
```

The `name` property refers, and must match, the corresponding nested field. The `label` property is the text content of the preview column heading.

## Nested fields

Nested fields are the input components inside a Repeater. All Pulsar form components should be compatible with the Repeater at the time of publishing. Any additional form components should take into consideration their repeater integration. The Repeater will remove `name` attributes from inputs in order to function, therefore any stateful components that depend on this attribute may need a integration service creating. See the `js/Repeater/PseudoRadioInputService.js` as an example.


## Example usage

{% raw %}
```twig
{{ 
    form.create() 
}}
    {{ form.repeater_start({
        'label': 'The Pulsar team',
        'empty': 'You have not added any team members',
        'headings': [
            { name: 'text', label: 'Name' },
            { name: 'select2multi', label: 'Favourite food' }
        ],
        'max-entries': 3,
        'add-new-group-text': 'Add',
        'add-another-group-text': 'Add another'
    }) }}
    
        {{
            form.fieldset_start({
                'legend': 'Team Member'
            })
        }}
        
        {{
            form.text({
                'label': 'name',
                'id': 'repeater-text',
                'name': 'text'
            })
        }}
        
        {{
            form.select2({
                'label': 'Favourite food',
                'id': 'repeater-select2multi',
                'name': 'select2multi',
                'multiple': true,
                'options': [
                    { value: 'food_pizza', label: 'Pizza' },
                    { value: 'food_gravy', label: 'Gravy' },
                    { value: 'food_puds', label: 'Yorkshire Pudding' }
                ]
            })
        }}
    
    {{ form.repeater_end() }}

{{
    form.end()
}}
```

```javascript
const $html = $('html');
const pulsarFormComponent = new pulsar.PulsarFormComponent($html);

// expects 'pulsar' to be exposed as a global variable
const repeaterManager = new pulsar.RepeaterManagerComponent(
    pulsarFormComponent,
    pulsar.repeaterComponentFactory,
    $html
);

repeaterManager.init();
```

## Options

Option                  | Type   | Description
----------------------- | ------ | -------------------------------------------------------
label                   | string | The repeater input label text
empty                   | string | The empty placeholder text when no items have been added
headings                | Array  | An array of heading config objects: { name: string, label: string }
max-entries             | int    | Maximum (inclusive) number of entries that can be added
add-new-group-text      | string | The text content of the add new entry button
add-another-group-text  | string | The text content of the add another new entry button
