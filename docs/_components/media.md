---
layout: page
title: Media
category: Components
---

The _media object_ is, typically, an image on the left with descriptive content on the right. This is our implementation of [http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)

## Example usage

{% code_example html_helpers/media %}

<p data-height="80" data-theme-id="24005" data-slug-hash="2cf3bf12d98f67d6e504432a55cb0348" data-default-tab="result" data-user="pulsar" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/2cf3bf12d98f67d6e504432a55cb0348/">docs - media object</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>

<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Options

Option      | Type | Description
----------- | --------- | ------------------------------------------------------
action      | html/twig | A button/indicator to display on the right hand side
class       | string | CSS classes, space separated
description | string | Small descriptive text to sit underneath the title
href        | string | If `type` is `link`, set the `href` attribute on the `a`
icon        | string | Icon name used to display on the left hand side (alternative to image)
icon_colour | string | Text colour to use for the `icon`, useful for branding
id          | string | A unique identifier, if required
image       | string | URL for the image to display on the left hand side
image_alt   | string | Alt attribute for the `image`
title       | string | The main title for this object
type        | string | Markup scheme to use, can be either `div` (default) or `link`
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`

## Icons instead of images

Supply an `icon` instead of `image` to choose from the hundreds of icons available within Pulsar. Use in conjunction with the optional `icon_colour` to improve how they look or to maintain branding for brand icons.

{% raw %}
```twig
{{
    html.media({ 
        'icon': 'youtube-square', 
        'icon_colour': '#e52d27', 
        'title': 'YouTube', 
        'description': 'Upload video to YouTube' 
    })
}}
```
{% endraw %}

## Optional action

You can place actions on the right hand side, like [remove buttons](remove_button.md) or [status indicators](status.md).

{% raw %}
```twig
{{ 
    html.media({ 
        'image': 'github.png', 
        'image_alt': 'GitHub logo', 
        'title': 'Title', 
        'description': 'Description',
        'action': html.remove_button({ 'target': '#example' }) 
    })
}}
```
{% endraw %}

<p data-height="80" data-theme-id="24005" data-slug-hash="d46e3668e49d91765f4b4f4ef73dacd6" data-default-tab="result" data-user="pulsar" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/d46e3668e49d91765f4b4f4ef73dacd6/">docs - media object - action</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>

<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


