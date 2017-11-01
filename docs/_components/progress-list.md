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

<div class="pulsar-example">
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
</div>

## States

There are three states of a progress list item

| State                                      | Class                            |
| ------------------------------------------ | -------------------------------- |
| Complete (user has completed this step)    | `progress-list__item--complete` |
| Current (the currently active step)        | `progress-list__item--current`   |
| Disabled (user cannot yet access this step | `is-disabled`                    |

<div class="pulsar-example">
    <div class="progress-list">
        <a href="#" class="progress-list__item progress-list__item--complete">
            <span class="progress-list__label">
                <span class="badge badge--round badge--outline">Step 1</span>
                Complete
            </span>
            <span class="progress-list__arrow">&gt;</span>
        </a>

        <a href="#" class="progress-list__item progress-list__item--current">
            <span class="progress-list__label">
                <span class="badge badge--round badge--outline">Step 2</span>
                Current
            </span>
            <span class="progress-list__arrow">&gt;</span>
        </a>

        <a href="#" class="progress-list__item is-disabled">
            <span class="progress-list__label">
                <span class="badge badge--round badge--outline">Step 3</span>
                Disabled
            </span>
            <span class="progress-list__arrow">&gt;</span>
        </a>
    </div>
</div>

## Disabled items

Use the `.is-disabled` class when the user cannot, or should not be able to navigate to a progress step.

## Mixing element types for items

You must ensure that the direct children of the `progress-list` container are always `progress-list__item` elements. The styling used for this component contains `:first-child` and `:last-child` rules, to allow the use of mixed element types. Using other elements nested alongside `progress-list__item` elements may introduce layout problems.
