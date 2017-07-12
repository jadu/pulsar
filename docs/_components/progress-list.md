---
layout: page
title: Progress list
category: Components
---

Show a user's position in a multi-step workflow.

## Example usage

```html
<div class="progress-list">

    <a href="#" class="progress-list__item progress-list__item--current">
        <span class="progress-list__label">
            <span class="badge badge--round badge--outline">Step 1</span>
            Cut a hole in a box
        </span>
        <span class="progress-list__arrow">&gt;</span>
    </a>

    <a href="#" class="progress-list__item">
        <span class="progress-list__label">
            <span class="badge badge--round badge--outline">Step 2</span>
            Put your junk in that box
        </span>
        <span class="progress-list__arrow">&gt;</span>
    </a>

</div>
```

<p data-height="80" data-theme-id="24005" data-slug-hash="pEEWor" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/pEEWor/">docs - form - progress list</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## States

There are three states of a progress list item

| State                                      | Class                            |
| ------------------------------------------ | -------------------------------- |
| Complete (user has completed this step)    | `progress-list__item--complete` |
| Current (the currently active step)        | `progress-list__item--current`   |
| Disabled (user cannot yet access this step | `is-disabled`                    |

<p data-height="80" data-theme-id="24005" data-slug-hash="GjjroG" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/GjjroG/">docs - form - progress list states</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>


## Disabled items

Use the `.is-disabled` class when the user cannot, or should not be able to navigate to a progress step.

## Mixing element types for items

You must ensure that the direct children of the `progress-list` container are always `progress-list__item` elements. The styling used for this component contains `:first-child` and `:last-child` rules, to allow the use of mixed element types. Using other elements nested alongside `progress-list__item` elements may introduce layout problems.
