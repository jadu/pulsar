Forms make up the bulk of our interfaces and they should be consistent, clear and understandable.

## General guidance

* Use sentence case
* Address the user directly
* Don‘t use colons after labels
* Don‘t use ‘please’ on labels - but give polite, clear, short instructions
* Don‘t add ‘your’ to labels, for example: ‘Your name’, ‘Your address’, unless you have a form where you need to differentiate multiple people - for example: ‘your name’, ‘partner name’

----

## Validation summary

You should summarise any form validation errors at the top of the page, this summary is designed to be visible without scrolling. The entire form should be validated at once rather than one field at a time.

If you have fewer than 4 validation messages, you should detail them individually. Each link should jump the user to the relevant form control.

**TODO: add validation summary example**

If you have 5 or more, summarise the summary.

**TODO: add validation summary example**

## Input errors

If a user has supplied invalid information within a form field, the whole input group should be highlighted.

* Clearly explain what they've done wrong (It's almost never OK to say ‘invalid input’)
* Where possible, accept blame on behalf of the user
* Avoid overly technical explanations and the use of the word ‘validation’

<form class="form--horizontal">
  <div class="form__group has-error">
    <label for="inputTextError" class="control__label">Postcode</label>
    <div class="controls">
      <input type="text" class="form__control" id="inputTextError" name="inputTextError" placeholder="Placeholder" value="123456" />
      <div class="help-block">This postcode was not found</div>
    </div>
  </div>
</form>

## Placeholders

Placeholders can be used to provide an example of the expected format, especially if the data will be validated.

<form class="form--horizontal">
  <div class="form__group">
    <label for="inputTextError" class="control__label">Email</label>
    <div class="controls">
      <input type="text" class="form__control" id="inputTextError" name="inputTextError" placeholder="example@domain.com" />
    </div>
  </div>
</form>

## Help text

Ideally, your UI will be so intuitive it doesn‘t need any help text but there are times where a little extra information will help to prevent errors before they occur.

* Help text should ideally be less than 100 characters
* Keep it concise, avoid padding with words like ‘please’

<form class="form--horizontal">
  <div class="form__group">
    <label for="inputTextError" class="control__label">Telephone</label>
    <div class="controls">
      <input type="text" class="form__control" id="inputTextError" name="inputTextError" />
      <div class="help-block">Include your country code</div>
    </div>
  </div>
</form>

## Popover help

For more detailed guidance or for particularly complex form elements which can't be explained using a placeholder and/or help text you can use a popover.

<form class="form--horizontal">
  <div class="form__group">
    <label for="inputTextError" class="control__label">Summary</label>
    <div class="controls">
      <input type="text" class="form__control" id="inputTextError" name="inputTextError" />
      <i class="icon-info-sign" data-toggle="popover" data-content="Keep your summary short and sweet. This will also be used by search engines (like Google) to help people find your content."></i>
    </div>
  </div>
</form>