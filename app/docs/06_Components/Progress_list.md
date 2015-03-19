## Progress list

Provide feedback about a user's progress through a multi-step workflow.

### Example usage

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

    <div class="progress-list">

        <a href="#" class="progress-list__item">
            <span class="progress-list__label">
                {{
                    html.badge({
                        'label': 'Step 1',
                        'class': 'badge--round badge--outline'
                    })
                }}
                Cut a hole in a box
            </span>
            <span class="progress-list__arrow">&gt;</span>
        </a>

        <a href="#" class="progress-list__item">
            <span class="progress-list__label">
                {{
                    html.badge({
                        'label': 'Step 2',
                        'class': 'badge--round badge--outline'
                    })
                }}
                Put your junk in that box
            </span>
            <span class="progress-list__arrow">&gt;</span>
        </a>

    </div>


## Variations (class)

The following modifier classes can be applied to the `class` attribute of the `progress-list__item`:

 * `.progress-list__item--complete`
 * `.progress-list__item--current`

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

    <a href="#" class="progress-list__item">
        <span class="progress-list__label">
            <span class="badge badge--round badge--outline">Step 3</span>
            Default
        </span>
        <span class="progress-list__arrow">&gt;</span>
    </a>

</div>
