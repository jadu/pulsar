---
layout: page
title: Filter bar
category: Patterns
---

The filter bar pattern allows you to build up a list of filters to be applied to a UI. Commonly used to filter tabular data as an alternative to displaying a potentially large form.

![Filter bar]({{ site.baseurl }}/assets/image_examples/filterbar.gif)

The filter bar takes a standard form and creates a filter bar which allows you to select filter options from the form and apply them one at a time.

## Dependencies

##### Javascript

You will need the `FilterBarComponent` to be included in your browserify configuration.

Depending on your setup, this will probably need to be in a file called `index.js` or `main.js`.

```javascript
// index.js

var FilterBarComponent = require('/path/to/pulsar/FilterBarComponent');

module.exports = {
    FilterBarComponent: FilterBarComponent
}
```

```javascript
// main.js

var $html = $('html');

pulsar.filterBar = new pulsar.FilterBarComponent($html);

$(function () {
    pulsar.filterBar.init();
});
```

##### Markup

You will need to wrap the form used for filtering in a `div` with the following classes `filter-bar display--none`. 

As the filter bar is hidden by default (when no filter form values are present) you'll need to add an option to create a filter to the [Actions Menu](/components/actions_bar). 

{% raw %}
```twig
{%- block actions_left -%}
    {{
        html.actions_menu({
            'items': [
                [
                    {
                        'label': 'New Filter',
                        'href': '#',
                        'icon': 'filter',
                        'data-ui': 'show-filter-bar'
                    }
                ]
            ]
        })
    }}
{%- endblock -%}
```
{% endraw %}


## Markup example

There should only be one filter bar within a given UI, although there could be multiple filter bars on different tabs.

{% raw %}
```twig
<div class="filter-bar display--none">
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
            form.select2({
                'label': 'Size',
                'id': 'size',
                'placeholder': 'Choose one',
                'options': {
                    '': '',
                    'small': 'Small',
                    'medium': 'Medium',
                    'large': 'Large'
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
            form.date({
                'label': 'Added from',
                'id': 'addedFrom',
            })
        }}

        {{
            form.date({
                'label': 'Added to',
                'id': 'addedTo'
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
                    'label': 'Clear',
                    'class': 'btn btn--naked',
                    'href': '#',
                    'data-ui': 'clear-all-filters'
                })
            ]
        })
    }}

</div>
```
{% endraw %}

## Setting initial state

There may be situations where you need to pre-populate and display the filter bar on page load. The filter bar will automatically do that if the filter form fields have values or selected options.

It's worth noting that any select elements in the filter form will need to have an empty first option to prevent the filter bar taking the first option as a selected option. This also applies when using the [select2 helper](/form-helpers/select2), see the example below:

{% raw %}
```twig
{{
    form.select2({
        'label': 'Size',
        'id': 'size',
        'placeholder': 'Choose one',
        'options': {
            '': '',
            'small': 'Small',
            'medium': 'Medium',
            'large': 'Large'
        }
    })
}}
```
{% endraw %}

