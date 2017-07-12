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

## Close modal

A link or button within a modal can close itself using the `data-dismiss="modal" attribute.

```html
<a data-dismiss="modal" href="#">Cancel</a>
```

## Methods

#### `.modal(options)`

Activates your content as a modal. Accepts an optional options `object`.

```js
$('#myModal').modal({
  keyboard: false
})
```

#### `.modal('toggle')`

Manually toggles a modal. **Returns to the caller before the modal has actually been shown or hidden** (i.e. before the `shown.bs.modal` or `hidden.bs.modal` event occurs).

```js
$('#myModal').modal('toggle')
```

#### `.modal('show')`

Manually opens a modal. **Returns to the caller before the modal has actually been shown** (i.e. before the `shown.bs.modal` event occurs).

```js
$('#myModal').modal('show')
```

#### `.modal('hide')`

Manually hides a modal. **Returns to the caller before the modal has actually been hidden** (i.e. before the `hidden.bs.modal` event occurs).

```js
$('#myModal').modal('hide')
```

### Events

The modal class exposes a few events for hooking into modal functionality. All modal events are fired at the modal itself (i.e. at the `<div class="modal">`).

<table class="table table-bordered table-striped table-responsive">
  <thead>
   <tr>
     <th style="width: 150px;">Event Type</th>
     <th>Description</th>
   </tr>
  </thead>
  <tbody>
   <tr>
     <td>show.bs.modal</td>
     <td>This event fires immediately when the <code>show</code> instance method is called. If caused by a click, the clicked element is available as the <code>relatedTarget</code> property of the event.</td>
   </tr>
   <tr>
     <td>shown.bs.modal</td>
     <td>This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete). If caused by a click, the clicked element is available as the <code>relatedTarget</code> property of the event.</td>
   </tr>
   <tr>
     <td>hide.bs.modal</td>
     <td>This event is fired immediately when the <code>hide</code> instance method has been called.</td>
   </tr>
   <tr>
     <td>hidden.bs.modal</td>
     <td>This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).</td>
   </tr>
  </tbody>
</table>

```js
$('#myModal').on('hidden.bs.modal', function (e) {
  // do something...
})
```

## Make modals accessible

Be sure to add `role="dialog"` to your primary modal div. In the example above, `div#myModal`.
Also, the `aria-labelledby` attribute references your modal title. In this example, `h4#myModalLabel`.
Finally, `aria-hidden="true"` tells assistive technologies to skip DOM elements.
Additionally, you may give a description of your modal dialog. Use the `aria-describedby` attribute in the modal's primary `<div>` to point to this description (this is not shown in the above example).

## Nested modals

In certain situations you may want a modal to trigger another modal, e.g. Modal A has a delete button which triggers a delete confirmation modal.

* Clicking the link which triggers Modal-2 should close Modal-1, you shouldn't 'stack' modals on top of each other
* Clicking `Cancel` on Modal-2 should re-open Modal-1, allowing the user to step back through their actions

This can be achieved by using both `data-toggle` and `data-dismiss` on the link, the `data-toggle` will open the modal referenced by `href` and `data-dismiss` will close the current modal.

```html
<!-- within modal-1 -->
<a class="btn" data-toggle="modal" href="#modal-2" data-dismiss="modal">Open Modal 2 and Close Modal 1</a>
```

You should not nest modals more than 2 levels deep.
