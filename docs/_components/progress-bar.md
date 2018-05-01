---
layout: page
title: Progress bar
category: Components
---

Provide up-to-date feedback on the progress of a workflow or action with simple
progress bars.

## Example usage

{% code_example html_helpers/progress-bar %}

<div class="pulsar-example">
    <div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;">
            <span class="hide">50%</span>
        </div>
    </div>
</div>

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

<div class="pulsar-example">
    <div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;">
            25%
        </div>
    </div>
</div>

`.progress-bar--warning`

<div class="pulsar-example">
    <div class="progress">
        <div class="progress-bar progress-bar--warning" role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" style="width: 33%;">
            having trouble connecting… 33%
        </div>
    </div>
</div>

`.progress-bar--danger`

<div class="pulsar-example">
    <div class="progress">
        <div class="progress-bar progress-bar--danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%;">
            upload failed <i class="icon-warning-sign"></i>
        </div>
    </div>
</div>

`.progress-bar--success`

<div class="pulsar-example">
    <div class="progress">
        <div class="progress-bar progress-bar--success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
            uploaded <i class="icon-ok"></i>
        </div>
    </div>
</div>

## Additional styles

`.progress-bar--compact`

Use where space is limited, like table rows or dropdown menus.

<div class="pulsar-example">
    <div class="progress progress-bar--compact">
        <div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%;">
        </div>
    </div>
</div>

## Updating progress with javascript

Given the markup example below, it's simply a case of updating the two main percentage values in `aria-valuenow` and the inline `style` attributes with your new percentage.

If you have the percentage in the label either hidden or visible then you'll need to update that too.

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

## Stepped Progress Bar Example

Stepped progress bar is used mainly in modals as a step indicator of a multi step process.
<div class="pulsar-example">
    <ol class="stepped-progressbar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="4" aria-describedby="aria-stepped-progress-bar-heading-1">
        <li class="step"><span class="step-box current"><span class="step-number" aria-hidden="true">1</span></span></li>
        <li class="step"><span class="step-box"><span class="step-number" aria-hidden="true">2</span></span></li>
        <li class="step"><span class="step-box"><span class="step-number" aria-hidden="true">3</span></span></li>
        <li class="step last"><span class="step-box"><i class="icon-flag-checkered" aria-hidden="true"></i></span></li>
    </ol>
    <h3 class="hide" id="aria-stepped-progress-bar-heading-2">Step 2 of 4</h3>
    <ol class="stepped-progressbar" role="progressbar" aria-valuenow="2" aria-valuemin="1" aria-valuemax="4" aria-describedby="aria-stepped-progress-bar-heading-2">
        <li class="step successful"><span class="step-box completed"><i class="icon-ok" aria-hidden="true"></i></span></li>
        <li class="step"><span class="step-box current"><span class="step-number" aria-hidden="true">2</span></span></li>
        <li class="step"><span class="step-box"><span class="step-number" aria-hidden="true">3</span></span></li>
        <li class="step last"><span class="step-box"><i class="icon-flag-checkered" aria-hidden="true"></i></span></li>
    </ol>
    <h3 class="hide" id="aria-stepped-progress-bar-heading-3">Step 3 of 4</h3>
    <ol class="stepped-progressbar" role="progressbar" aria-valuenow="3" aria-valuemin="1" aria-valuemax="4" aria-describedby="aria-stepped-progress-bar-heading-3">
        <li class="step successful"><span class="step-box completed"><i class="icon-ok" aria-hidden="true"></i></span></li>
        <li class="step successful"><span class="step-box completed"><i class="icon-ok" aria-hidden="true"></i></span></li>
        <li class="step"><span class="step-box current"><span class="step-number" aria-hidden="true">3</span></span></li>
        <li class="step last" ><span class="step-box"><i class="icon-flag-checkered" aria-hidden="true"></i></span></li>
    </ol>
    <h3 class="hide" id="aria-stepped-progress-bar-heading-4">Step 4 of 4</h3>
    <ol class="stepped-progressbar" role="progressbar" aria-valuenow="4" aria-valuemin="1" aria-valuemax="4" aria-describedby="aria-stepped-progress-bar-heading-4">
        <li class="step successful"><span class="step-box completed"><i class="icon-ok" aria-hidden="true"></i></span></li>
        <li class="step successful"><span class="step-box completed"><i class="icon-ok" aria-hidden="true"></i></span></li>
        <li class="step successful"><span class="step-box completed"><i class="icon-ok" aria-hidden="true"></i></span></li>
        <li class="step last"><span class="step-box final"><i class="icon-flag-checkered" aria-hidden="true" ></i></span></li>
    </ol>
</div>

```html
    <h3 class="hide" id="aria-stepped-progress-bar-heading-1">Step 1 of 4</h3>
    <ol class="stepped-progressbar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="4" aria-describedby="aria-stepped-progress-bar-heading-1">
        <li class="step"><span class="step-box current"><span class="step-number" aria-hidden="true">1</span></span></li>
        <li class="step"><span class="step-box"><span class="step-number" aria-hidden="true">2</span></span></li>
        <li class="step"><span class="step-box"><span class="step-number" aria-hidden="true">3</span></span></li>
        <li class="step last"><span class="step-box"><i class="icon-flag-checkered" aria-hidden="true"></i></span></li>
    </ol>
    <h3 class="hide" id="aria-stepped-progress-bar-heading-2">Step 2 of 4</h3>
    <ol class="stepped-progressbar" role="progressbar" aria-valuenow="2" aria-valuemin="1" aria-valuemax="4" aria-describedby="aria-stepped-progress-bar-heading-2">
        <li class="step successful"><span class="step-box completed"><i class="icon-ok" aria-hidden="true"></i></span></li>
        <li class="step"><span class="step-box current"><span class="step-number" aria-hidden="true">2</span></span></li>
        <li class="step"><span class="step-box"><span class="step-number" aria-hidden="true">3</span></span></li>
        <li class="step last"><span class="step-box"><i class="icon-flag-checkered" aria-hidden="true"></i></span></li>
    </ol>
    <h3 class="hide" id="aria-stepped-progress-bar-heading-3">Step 3 of 4</h3>
    <ol class="stepped-progressbar" role="progressbar" aria-valuenow="3" aria-valuemin="1" aria-valuemax="4" aria-describedby="aria-stepped-progress-bar-heading-3">
        <li class="step successful"><span class="step-box completed"><i class="icon-ok" aria-hidden="true"></i></span></li>
        <li class="step successful"><span class="step-box completed"><i class="icon-ok" aria-hidden="true"></i></span></li>
        <li class="step"><span class="step-box current"><span class="step-number" aria-hidden="true">3</span></span></li>
        <li class="step last" ><span class="step-box"><i class="icon-flag-checkered" aria-hidden="true"></i></span></li>
    </ol>
    <h3 class="hide" id="aria-stepped-progress-bar-heading-4">Step 4 of 4</h3>
    <ol class="stepped-progressbar" role="progressbar" aria-valuenow="4" aria-valuemin="1" aria-valuemax="4" aria-describedby="aria-stepped-progress-bar-heading-4">
        <li class="step successful"><span class="step-box completed"><i class="icon-ok" aria-hidden="true"></i></span></li>
        <li class="step successful"><span class="step-box completed"><i class="icon-ok" aria-hidden="true"></i></span></li>
        <li class="step successful"><span class="step-box completed"><i class="icon-ok" aria-hidden="true"></i></span></li>
        <li class="step last"><span class="step-box final"><i class="icon-flag-checkered" aria-hidden="true" ></i></span></li>
    </ol>
```
