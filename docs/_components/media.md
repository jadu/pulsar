---
layout: page
title: Media
category: Components
---

The _media object_ is, typically, an image on the left with descriptive content on the right. This is our implementation of [http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)

## Example usage

{% code_example html_helpers/media %}

<div class="pulsar-example">
    <div class="media">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/48px-Octicons-mark-github.svg.png" alt="" class="media__image">
        <div class="media__body">
            <p>Title</p>
            <span class="small-type muted">Description</span>
        </div>
    </div>
</div>

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

<div class="pulsar-example">
    <div class="media">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/48px-Octicons-mark-github.svg.png" alt="" class="media__image">

        <div class="media__body">
            <span class="pull-right">
            <button type="button" class="remove-button" data-toggle="tooltips" data-placement="right" title="Remove this item" data-action="remove" data-action-target="#itemToRemove" data-original-title="Remove this item">
              <i class="icon-remove-sign"></i>
            </button>
          </span>
            <p>Title</p>
            <span class="small-type muted">Description</span>
        </div>
    </div>
</div>
