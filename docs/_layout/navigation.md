---
layout: page
title: Navigation
category: Layout
---

![navigation example]({{ site.baseurl }}/assets/image_examples/navigation.png)

Creates the main Pulsar navigation from a JSON object.

## Implementation

The navigation component depends on the javascript `NavigationComponent`, this is a global component and should always be available to a Pulsar UI.

## JSON example

```json
{
    "1": {
        "label": "First",
        "class": "",
        "href": "#first-item",
        "icon": "pencil",
        "items": {
            "1.1": {
                "1.1.1": {
                    "label": "One",
                    "href": "#one"
                },
                "1.1.2": {
                    "label": "Two",
                    "href": "#two"
                }
            },
            "1.2": {
                "1.2.1": {
                    "label": "Three",
                    "href": "#three"
                },
                "1.2.2": {
                    "label": "Four",
                    "href": "#four"
                }
            }
        }
    },
    "2": {
        "label": "Second",
        "class": "",
        "href": "#second",
        "icon": "check-sign",
        "items": {
            "2.1": {
                "2.1.1": {
                    "label": "Five",
                    "href": "#five"
                }
            }
        }
    }
}
```

## Options

Option  | Type   | Description
------- | ------ | -------------------------------------------------------------
class   | string | Classes to be applied to the button group (not the buttons inside it)
href    | string | The URL, top level items should define unique `#fragments`
icon    | string | An optional icon, mainly used on primary navigation items
image   | string | An image icon for primary navigation, overrides `icon`
image_alt | string | Alt attribute for the `image`
label   | string | Text label used in the links

## Primary navigation

The top level links should contain both an icon and a label element. The Jadu branding, 'home' and 'search' navigation elements are automatically added so you don't need to define these in the JSON.

The `href` attribute will also be used to link together the related secondary navigation element.

The `items` element should contain nested elements that will be turned into the secondary navigation items.

## Secondary navigation

Secondary navigation items can be grouped together in blocks which will be visually separated for the user. Blocks are defined by nesting multiple objects.

## Codepen

<p data-height="550" data-theme-id="16461" data-slug-hash="rVJKWM" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/rVJKWM/'>Navigation component</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
