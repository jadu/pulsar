Modals are a blocking element, they should be used sparingly and only when we absolutely, positively have to stop the user in their tracks to perform a specific action. For everything else, use [decks](Decks).

![tabbed layout example](http://pulsar.dev/app/docs/images/modules_modal.png)

----

Example:

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

<div class="modal modal__example">
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

## Variations

Use the `.modal--danger` class for situations where we're performing destructive actions.

    <div class="modal modal--danger">
        ...
    </div>

<div class="modal modal--danger modal__example">
    <div class="modal__dialog">
        <div class="modal__content">
            <div class="modal__header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal__title"><i class="icon-warning-sign"></i> You're about to do something really, really bad</h4>
            </div>
            <div class="modal__body">
                <p>We mainly use modals to get you to stop and confirm that you really want to delete something, and remind you that this action cannot be reversed.</p>
                <p>A modal's action buttons should be written so that if a user only reads the buttons, they should get an idea of the action they're about to perform instead of blindly clicking 'OK' or 'Confirm'.</p>
            </div>
            <div class="modal__footer">
                <button type="button" class="btn" data-dismiss="modal">Don't Do Anything</button>
                <button type="button" class="btn btn--danger">Delete Everything</button>
            </div>
        </div><!-- /.modal__content -->
    </div><!-- /.modal__dialog -->
</div><!-- /.modal -->

## Show modal

Toggle a modal with a link (or a link button) by using the `data-toggle="modal"` attribute. This method assumes the modal markup is present in the DOM.

    <!-- Toggle link -->
    <a data-toggle="modal" href="#myModal" class="btn">Launch Demo Modal</a>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        ...
    </div>

<a data-toggle="modal" href="#myModal" class="btn">Launch Demo Modal</a>

## Fetch a modal with AJAX

This will be the defacto method within Jadu software to populate a modal's content, your modal toggle should specify the location of the modal as the `href` attribute. Pulsar has a ‘modal controller’ which you can pass a trig-based modal view to be rendered.

    <!-- Toggle link, the data-target is the default modal container which should always be present in Pulsar's layouts/base.html.twig -->
    <a data-toggle="modal" data-target="#modal" href="/app/modals/modal.php?modal=dashboard/share.html.twig" />An ajaxy modal</a>

<a data-toggle="modal" data-target="#modal" href="/app/modals/modal.php?modal=dashboard/share.html.twig" />An ajaxy modal</a>
<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal__dialog">
    <div class="modal__content">
      <div class="modal__header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal__title">Modal title</h4>
      </div>
      <div class="modal__body">
        ...
      </div>
      <div class="modal__footer">
        <button type="button" class="btn" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn--primary">Save Changes</button>
      </div>
    </div><!-- /.modal__content -->
  </div><!-- /.modal__dialog -->
</div><!-- /.modal -->

## Make modals accessible

Be sure to add `role="dialog"` to your primary modal div. In the example above, `div#myModal`.
Also, the `aria-labelledby` attribute references your modal title. In this example, `h4#myModalLabel`.
Finally, `aria-hidden="true"` tells assistive technologies to skip DOM elements.
Additionally, you may give a description of your modal dialog. Use the `aria-describedby` attribute in the modal's primary `<div>` to point to this description (this is not shown in the above example).
