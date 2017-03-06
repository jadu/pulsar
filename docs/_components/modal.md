---
layout: page
title: Modal
category: Components
---

Modals are a blocking element, they should be used sparingly and only when we absolutely, positively have to stop the user in their tracks to perform a specific action.

Example:

```html
<div class="modal">
    <div class="modal__dialog">
        <div class="modal__content">
            <div class="modal__header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal__title">A simple example</h4>
            </div>
            <div class="modal__body">
                <p>The modal body might have instructions, a form, or other stuff.</p>
            </div>
            <div class="modal__footer">
                <button type="button" class="btn" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn--primary">Save Changes</button>
            </div>
        </div><!-- /.modal__content -->
    </div><!-- /.modal__dialog -->
</div><!-- /.modal -->
```

<p data-height="285" data-theme-id="20878" data-slug-hash="ebdaa8ef163066feab29b5c9fa4386d5" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/ebdaa8ef163066feab29b5c9fa4386d5/'>docs - modal - simple</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Variations

Use the `.modal--danger` class for situations where we're performing destructive actions.

```html
<div class="modal modal--danger">
    ...
</div>
```

<p data-height="395" data-theme-id="20878" data-slug-hash="be00109e59e4dea7e0d9e723241353ee" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/be00109e59e4dea7e0d9e723241353ee/'>docs - modal - danger</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Show modal

Toggle a modal with a link (or a link button) by using the `data-toggle="modal"` attribute. This method assumes the modal markup is present in the DOM.

```html
<!-- Toggle link -->
<a data-toggle="modal" href="#myModal" class="btn">Launch Modal</a>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    ...
</div>
```

## Make modals accessible

Be sure to add `role="dialog"` to your primary modal div. In the example above, `div#myModal`.
Also, the `aria-labelledby` attribute references your modal title. In this example, `h4#myModalLabel`.
Finally, `aria-hidden="true"` tells assistive technologies to skip DOM elements.
Additionally, you may give a description of your modal dialog. Use the `aria-describedby` attribute in the modal's primary `<div>` to point to this description (this is not shown in the above example).
