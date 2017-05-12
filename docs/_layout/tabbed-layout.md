---
layout: page
title: Tabbed layout
category: Layout
---

The tabbed layout is Pulsar's default and consists of a list of tabs which switch between different content views. The tab content is usually a table or a form, but can be more complex depending on the needs of the interface.

![tabbed layout example]({{ site.baseurl }}/assets/image_examples/tabbed-layout.png)

## File structure

A simple Pulsar UI typically consists of a main view (`index.html.twig`), and a collection of tab views, these should be organised like so:

```
/path/to/views/my_view
    └── index.html.twig
    └── /tabs
        └── foo.html.twig
        └── bar.html.twig
        └── baz.html.twig
```

## Twig Dependencies

A tabbed view needs to extend the tabbed layout:

{% raw %}
```twig
{# index.html.twig #}

{% extends '@pulsar/pulsar/layouts/tabbed.html.twig' %}
```

It also needs to import the tabs helper, which is used to render the required html elements.

```twig
{# index.html.twig #}

{% import '@pulsar/pulsar/v2/helpers/tabs.html.twig' as tabs %}
```
{% endraw %}
## Tab Content

The content of tabs should ideally be kept in separate views and then included into your main view template. You can then include these views and set them as variables, ready to pass to the tabs object.

{% raw %}
```twig
{# index.html.twig #}

{% set tab_foo %}
    {% include 'tabs/foo.html.twig' %}
{% endset %}

{% set tab_bar %}
    {% include 'tabs/bar.html.twig' %}
{% endset %}

{% set tab_baz %}
    {% include 'tabs/baz.html.twig' %}
{% endset %}
```
{% endraw %}

## Tabs object

The information for the individual tabs and their content is defined in a JSON object that you will pass to the `tabs.tabs()` and `tabs.tabs_content()` helpers to generate the necessary markup.

##### Attributes:

| Attribute | Type   | Description | Required? |
| --------- | ------ | ----------- | --------- |
| active    | bool   | Whether this tab should be the active tab on page load and visually highlighted | No     |
| href      | string | Makes the tab a simple link instead of switching tabs. Can be an absolute URL, relative URL (`/foo`), or fragment identifier (`#foo`). **Note** If `src` contains an absolute URL or fragment identifier, it take precedence over `href` | No |
| id        | string | A unique identifier which will be used on both the tab link (as a URL fragment), and the tab content pane | Yes |
| label     | string | The tab link title | Yes |
| src       | string | Usually a Twig variable containing an included tab content view, or the ID of another tab to reference (see 'ajaxy tabs' below) | No |
| data-href | string | Absolute or relative URL to update browser address using pushState | No |
| data-*    | string | Data attributes, eg: `'data-foo': 'bar'` | No |

<div class="alert alert-danger" role="alert"><i class="fa fa-warning-sign"></i> While it is currently possible to pass a URL through the `src` attribute, this functionality is deprecated and should not be used. Use `href` instead.</div>

{% raw %}
```twig
{# index.html.twig #}
{%
    set tabs_content = [
        {
             'id': 'foo',
             'label': 'My Foo Things',
             'src': tab_foo
         },
         {
             'id': 'bar',
             'label': 'My Bar Things',
             'src': tab_bar
         },
         {
             'id': 'baz',
             'label': 'My Baz Things',
             'src': tab_baz
         }
     ]
%}
```
{% endraw %}

## Active tab

There are a few different ways to set the active tab for a view, because more than one fo these conditions may be present within a UI at any one time, they are processed in the following priority order:

1. URL contains `tab=` parameter
1. `tabs` object has `active` param in the view
1. None of the above, first tab will be set to active

#### Set active tab on page load from the URL

Specify the tab ID in the URL to load the desired tab on page load. This method will trump any attempts to set the tab from within the view.

```
http://my-pulsar-example.com/my-view?tab=bar
```

Would load the tab using the ID `bar`.

#### Set active tab on page load from the view

Set the active tab on page load by adding the `"active": true` attribute to the required tab.

{% raw %}
```twig
...
{
    'id': 'bar',
    'label': 'My Bar Things',
    'src': tab_bar,
    'active': true
}
...
```
{% endraw %}

#### Updating browser address when a tab is clicked

Pulsar supports pushState, which is a HTML5 method of updating the URL within the address bar when a tab is clicked. Because the `href` attribute of a tab link will contain the fragment ID of the tab.

Provide an absolute or relative URL by the `data-href` attribute and it will replace, or be appended to the URL in the browser's address bar (and to the browser's URL history) without triggering a refresh of the page.

{% raw %}
```twig
...
{
 'id': 'bar',
 'label': "My Bar Things',
 'src': tab_bar,
 'data-href': '?tab=bar'
}
...
```
{% endraw %}

If, for example, the above link is on a page located at `http://jadu.net`, when clicked, the above tab link will open the `#bar` tab content as usual, but the browser's URL will change to `http://jadu.net?tab=bar`. You could make this work for friendly URLs too, as long as those friendlies are able to tell Pulsar which tab to open.

#### Default active tab

If no URL parameter is supplied, or `active` option present within the tabs object in the view, then the first tab will be set as active.

## Tabs list

Pass your tabs object to the `tabs.list()` helper and they'll be rendered as clickable links with all the required attributes.

{% raw %}
```twig
{# index.html.twig #}

{% block tabs_list %}
    {{ tabs.list(tabs_content) }}
{% endblock %}
```
{% endraw %}

The ID attribute for each tab link will be automatically generated in the format `tab_x` so that they correspond with their respective tab content.

## Tabs content

Pass your tabs object to the `tabs.content()` helper to render each tabs `src` attribute as a tab content pane.

{% raw %}
```twig
{# index.html.twig #}

{% block tabs_content %}
    {{ tabs.content(tabs_content) }}
{% endblock %}
```
{% endraw %}

## Putting it all together

{% raw %}
```twig
{# index.html.twig #}

{# Extend the tabbed view #}

    {% extends '@pulsar/pulsar/layouts/tabbed.html.twig' %}

{# Include required helpers (there may be others in the real world) #}

    {% import '@pulsar/pulsar/v2/helpers/html.html.twig' as html %}
    {% import '@pulsar/pulsar/v2/helpers/tabs.html.twig' as tabs %}

{# Grab the tab files and set them as variables to use as tab `src` #}

    {% set tab_foo %}
        {% include 'tabs/foo.html.twig' %}
    {% endset %}

    {% set tab_bar %}
        {% include 'tabs/bar.html.twig' %}
    {% endset %}

    {% set tab_baz %}
        {% include 'tabs/baz.html.twig' %}
    {% endset %}

{#
    Create the tab object, mostly you are defining the tab links themselves,
    but `src` will render your tab view as a tab content pane
#}

    {%
        set tabs_content = [
            {
                "id"    : "foo",
                "label" : "My Foo Things",
                "src"   : tab_foo,
                "active": true
            },
            {
                "id"    : "bar",
                "label" : "My Bar Things",
                "src"   : tab_bar
            },
            {
                "id"    : "baz",
                "label" : "My Baz Things",
                "src"   : tab_baz
            }
        ]
    %}

{# Pass everything to the view #}

    {% block tabs_list %}
        {{ tabs.list(tabs_content) }}
    {% endblock %}

    {% block tabs_content %}
        {{ tabs.content(tabs_content) }}
    {% endblock %}

{# Profit? #}
```
{% endraw %}

## Ajaxy tabs

It's possible for multiple tab links to point to a single tab content pane for you to do fancy javascripty/ajaxy things to. It's also possible to add extra data attributes to the tab links.

### Referencing an existing tab pane

At least one tab in your tab object must contain a proper template as it's `src` attribute, other tabs can then reference the 'proper' tab's ID as their `src`.

**Note:** Using this method will mean that you can't use the `shown.bs.tab` type events in your javascript as there's the strong possibility that your tab pane is already active when you click another link referencing the same tab pane. Use regular click events instead.

{% raw %}
```twig
{% set tab_foo %}
    {% include 'tabs/foo.html.twig' %}
{% endset %}

{%
    set tabs_content = [
        {
            'id': 'foo',
            'label': 'My Foo Things',
            'src': tab_foo
        },
        {
            'id': 'bar",
            'label': 'My Bar Things',
            'src': '#foo'
        }
    ]
%}
```
{% endraw %}

In the above example, only the `tab_foo` pane will be created by the `tabs.content()` helper, both `foo` and `bar` links will open `tab_foo` when clicked.

### Data attributes

You can add data attributes to tab links for your javascript behaviour by passing a hash of attributes in your tab object.

{% raw %}
```twig
...
{
    'id': 'bar',
    'label': 'My Bar Things',
    'src': '#foo',
    'data': {
        'data-one': 'uno',
        'data-two': 'dos'
    }
}
...
```
{% endraw %}

```html
<a href="#foo" data-toggle="tab" data-one="uno" data-two="dos">My Bar Things</a>
```
