---
layout: page
title: Tooltips
category: Components
---

Tooltips can be applied through the use of data-attributes and can be added to regular HTML elements, or to HTML/Form helpers.

{% raw %}
```twig
{{
    html.link({
        'href': '#',
        'label': 'Hover over me',
        'title': 'My tooltip',
        'data-toggle': 'tooltips'
    })
}}
```
{% endraw %}

```html
<a href="#" data-toggle="tooltips" title="first tooltip">Hover over me</a>
```

## Variations

Choose the most appropriate placement to fit your UI, try to avoid the tooltip from obscuring important things when it appears.

<div class="pulsar-example" style="height: 120px; padding-top: 40px; text-align: center;">
    <button type="button" class="btn btn-default" data-toggle="tooltips" data-placement="left" title="" data-original-title="Tooltip on left">Tooltip on left</button>&nbsp;<button type="button" class="btn btn-default" data-toggle="tooltips" data-placement="top" title="" data-original-title="Tooltip on top">Tooltip on top</button>&nbsp;<button type="button" class="btn btn-default" data-toggle="tooltips" data-placement="bottom" title="" data-original-title="Tooltip on bottom">Tooltip on bottom</button>&nbsp;<button type="button" class="btn btn-default" data-toggle="tooltips" data-placement="right" title="" data-original-title="Tooltip on right">Tooltip on right</button>
</div>

## Options

Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-` as in `data-animation=""`.

<table>
<thead>
 <tr>
   <th style="width: 100px;">Name</th>
   <th style="width: 100px;">type</th>
   <th style="width: 50px;">default</th>
   <th>description</th>
 </tr>
</thead>
<tbody>
 <tr>
   <td>animation</td>
   <td>boolean</td>
   <td>true</td>
   <td>apply a CSS fade transition to the tooltip</td>
 </tr>
 <tr>
   <td>html</td>
   <td>boolean</td>
   <td>false</td>
   <td>Insert HTML into the tooltip. If false, jQuery's <code>text</code> method will be used to insert content into the DOM. Use text if you're worried about XSS attacks.</td>
 </tr>
 <tr>
   <td>placement</td>
   <td>string | function</td>
   <td>'top'</td>
   <td>how to position the tooltip - top | bottom | left | right | auto. <br> When "auto" is specified, it will dynamically reorient the tooltip. For example, if placement is "auto left", the tooltip will display to the left when possible, otherwise it will display right.</td>
 </tr>
 <tr>
   <td>selector</td>
   <td>string</td>
   <td>false</td>
   <td>If a selector is provided, tooltip objects will be delegated to the specified targets.</td>
 </tr>
 <tr>
   <td>title</td>
   <td>string | function</td>
   <td>''</td>
   <td>default title value if <code>title</code> attribute isn't present</td>
 </tr>
 <tr>
   <td>trigger</td>
   <td>string</td>
   <td>'hover focus'</td>
   <td>how tooltip is triggered - click | hover | focus | manual. You may pass multiple triggers; separate them with a space.</td>
 </tr>
 <tr>
   <td>delay</td>
   <td>number | object</td>
   <td>0</td>
   <td>
    <p>delay showing and hiding the tooltip (ms) - does not apply to manual trigger type</p>
    <p>If a number is supplied, delay is applied to both hide/show</p>
    <p>Object structure is: <code>delay: { show: 500, hide: 100 }</code></p>
   </td>
 </tr>
 <tr>
   <td>container</td>
   <td>string | false</td>
   <td>false</td>
   <td>
    <p>Appends the tooltip to a specific element. Example: <code>container: 'body'</code></p>
   </td>
 </tr>
</tbody>
</table>

## Adding tooltips to disabled buttons

The `disabled` parameter prevents mouse events from firing and stops tooltips from working entirely. The only way around this which works for all our supported browsers is to wrap the button in a containing `div`, and attach the tooltip to that element.

{% raw %}
```twig
<div
    rel="tooltip"
    data-toggle="tooltip"
    title="My tooltip brings all the boys to the yard">
  {{ html.button({ ... }) }}
</div>
```
{% endraw %}

## Variations

Choose the most appropriate placement to fit your UI, try to avoid the tooltip from obscuring important things when it appears.

<div class="pulsar-example" style="height: 120px; padding-top: 40px; text-align: center;">
    <button type="button" class="btn btn-default" data-toggle="tooltips" data-placement="left" title="" data-original-title="Tooltip on left">Tooltip on left</button>&nbsp;<button type="button" class="btn btn-default" data-toggle="tooltips" data-placement="top" title="" data-original-title="Tooltip on top">Tooltip on top</button>&nbsp;<button type="button" class="btn btn-default" data-toggle="tooltips" data-placement="bottom" title="" data-original-title="Tooltip on bottom">Tooltip on bottom</button>&nbsp;<button type="button" class="btn btn-default" data-toggle="tooltips" data-placement="right" title="" data-original-title="Tooltip on right">Tooltip on right</button>
</div>
