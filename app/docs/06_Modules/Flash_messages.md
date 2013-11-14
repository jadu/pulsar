<p>Flash messages alert the user when things happen, this may be to confirm that something has occurred successfully, like saving a document, or when something goes wrong. Flash messages may also highlight problems with the system that the user may need to know about, like a loss of network connectivity which is preventing auto-save.</p>

----

Available attributes:

    {{ flash.message(message, sticky = true) }}

Variations:

    {{ flash.message(message = 'This is the default flash message style, messages can also contain ' ~ html.link(label = 'links', href = '#my-link')) }}

    {{ flash.success(message = 'This is a success message') }}

    {{ flash.warning(message = 'This is a warning message') }}

    {{ flash.error(message = 'This is an error message') }}

<p>
<div class="flash flash--default">
    <i class="icon-info-sign"></i> This is the default flash.message style, messages can also contain <a href="#my-link">links</a>
</div>
</p>

<p>
<div class="flash flash--success">
    <i class="icon-ok"></i> This is a success message
</div>
</p>

<p>
<div class="flash flash--warning">
    <i class="icon-warning-sign"></i> This is a warning message
</div>
</p>

<p>
<div class="flash flash--error">
    <i class="icon-warning-sign"></i> This is an error message
</div>
</p>

## Flash icons

These are set by the flash message handler can't be overridden.

## Dismissing flash messages

Each flash message can be dismissed with it's close icon.

## Sticky messages

By default, flash messages stick to the top of the browser window and are always visible no matter where the user is on the page.

You can disable the sticky behaviour to use flash messages elsewhere, such as at the top of a tab pane, by setting the `sticky` attribute to `false`. This will also remove the ability to dismiss the flash message.
