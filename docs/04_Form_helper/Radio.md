Creates a radio button

Available parameters:

	{{ form.radio(label, id, class, name, checked = false, help) }}

Examples:

	{{ form.radio('Radio with left label') }}

	<div class="form__group">
        <label for="inputRadioLeft" class="radio__label">Radio with left label</label>
        <div class="controls">
            <input type="radio" id="inputRadioLeft" name="inputRadioLeft" checked="">
        </div>
    </div>

    {{ form.radio_right('Radio with right label', 'inputRadioRight', null, 'inputRadioInline', true) 

    <div class="form__group">
        <div class="radio">
            <label for="inputRadioRight" class="radio__label">
                <input type="radio" />
                Radio with right label
            </label>
        </div>
    </div>

<form class="form--horizontal">
<div class="form__group">
    <label class="radio__label">Radio with left label</label>
    <div class="controls">
        <input type="radio" />
    </div>
</div>
</form>

<form class="form--horizontal">
<div class="form__group">
    <div class="radio">
        <label for="inputRadioRight" class="radio__label">
            <input type="radio" />
            Radio with right label
        </label>
    </div>
</div>
</form>

### Radio Groups

You can group radios together into logical blocks by wrapping them with the `radio_group` helper, this is particularly useful for creating inline radios if your options are relatively small.

    {{ form.radio_group([
            form.radio_inline('Inline', 'inputRadioInline1', null, 'inputRadioInline', true),
            form.radio_inline('Check', 'inputRadioInline2', null, 'inputRadioInline', true),
            form.radio_inline('Boxes', 'inputRadioInline3', null, 'inputRadioInline', true)]) 
    }}

<form class="form--horizontal">
<div class="form__group">
    <div class="radio">
        <label for="inputRadioInline1" class="radio--inline">
        <input type="radio" id="inputRadioInline1" name="inputRadioInline" checked="">
                Inline
        </label>
        <label for="inputRadioInline2" class="radio--inline">
        <input type="radio" id="inputRadioInline2" name="inputRadioInline" checked="">
                Radio
        </label>
        <label for="inputRadioInline3" class="radio--inline">
        <input type="radio" id="inputRadioInline3" name="inputRadioInline" checked="">
                Buttons
        </label>
    </div>
</div>
</form>