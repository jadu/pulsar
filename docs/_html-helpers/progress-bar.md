---
layout: page
title: Progress bar
category: HTML helpers
---

Provide up-to-date feedback on the progress of a workflow or action with simple
progress bars.

## Example usage

{% code_example html_helpers/progress-bar %}

<div><p data-height="55" data-theme-id="24005" data-slug-hash="amNKJq" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/amNKJq/">docs - html - progress bar</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Options

Option        | Type   | Description
------------- | ------ | -------------------------------------------------------
class         | string | CSS classes, space separated
id            | string | A unique identifier, if required
label         | string | Text to display inside the progress bar
value         | int    | The percentage value of the progress bar
value_visible | bool   | Whether to visually display the value inside the bar (default `false`)
data-*        | string | Data attributes, eg: `'data-foo': 'bar'`

## State Variations

Use the standard state variations to help communicate progress, or lack of it. Showing visible labels can help to show the precise progress or show other relevant updates.

<p data-height="55" data-theme-id="24005" data-slug-hash="NRNzjG" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/NRNzjG/">docs - html - progress bar default</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

`.progress-bar--warning`

<p data-height="55" data-theme-id="24005" data-slug-hash="ZpWRKy" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ZpWRKy/">docs - html - progress bar warning</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

`.progress-bar--danger`

<p data-height="55" data-theme-id="24005" data-slug-hash="qakKmK" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/qakKmK/">docs - html - progress bar danger</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

`.progress-bar--success`

<p data-height="55" data-theme-id="24005" data-slug-hash="vXGAmb" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/vXGAmb/">docs - html - progress bar success</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Additional styles

`.progress-bar--compact`

Use where space is limited, like table rows or dropdown menus.

<p data-height="55" data-theme-id="24005" data-slug-hash="gwAKRV" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/gwAKRV/">docs - html - progress bar compact</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Updating progress with javascript

Given the markup example below, it's simply a case of updating the two main percentage values in `aria-valuenow` and the inline `style` attributes with your new percentage. 

If you have the percentage in the label either hidden or visible) then you'll need to update that too.

```html
<div class="progress">
    <div 
        class="progress-bar" 
        role="progressbar" 
        aria-valuenow="25" 
        aria-valuemin="0" 
        aria-valuemax="100" 
        style="width: 25%;"
    >
        25%
    </div>
</div>
```
