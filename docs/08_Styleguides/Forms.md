Forms make up the bulk of our interfaces and they should be consistent, clear and understandable.

## General guidance

* Use sentence case
* Address the user directly
* Don‘t use colons after labels
* Don‘t use ‘please’ on labels - but give polite, clear, short instructions
* Don‘t add ‘your’ to labels, for example: ‘Your name’, ‘Your address’, unless you have a form where you need to differentiate multiple people - for example: ‘your name’, ‘partner name’

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