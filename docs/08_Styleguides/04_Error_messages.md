The language you use in error messages is critically important, perhaps more so that nay other type of message we will give to a user. Your message message will often be displayed to a confused, stressed and frustrated user who probably doesn't immediately know what has caused the message.

* Be straightforward. Explain what's going on right away
* Be calm, don't use exclamation marks or alarming words like ‘alert’ or ‘immediately’
* Be serious. Don't joke around with frustrated people
* Where possible, accept blame on behalf of the user (use ‘we’ instead of ‘you’)
* If possible, offer a solution or next step

## Flash messages

<p>
<div class="flash flash--error">
    <i class="icon-warning-sign"></i> There was a problem uploading your file. <button class="btn btn__mini btn--danger">Retry Upload</button>
</div>
</p>

When validating a form, because the individual form fields may be buried ‘below the fold’ we use the opportunity to summarise the errors within our flash message

<p>
<div class="flash flash--error">
    <i class="icon-warning-sign"></i> We were unable to create your document, please check the messages below and try again.
</div>
</p>

## Form validation

Summarise any validation errors at the top of the form (which should be visible without scrolling). Each link should jump the user down to the corresponding form control.

**TODO: This needs new styles creating and an example adding**

If a user has supplied invalid information within a form field, the whole input group should be highlighted.

* Clearly explain what they've done wrong (It's almost never OK to say ‘invalid input’)
* Where possible, accept blame on behalf of the user
* Avoid overly technical explanations and the use of the word ‘validation’

<form class="form--horizontal">
  <div class="form__group has-error">
    <label for="inputTextError" class="control__label">Postcode</label>
    <div class="controls">
      <input type="text" class="form__control" id="inputTextError" name="inputTextError" placeholder="Placeholder" value="123456" />
      <div class="help-block">This postcode was not found.</div>
    </div>
  </div>
</form>
