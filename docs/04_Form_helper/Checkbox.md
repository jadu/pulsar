Creates a checkbox

Available parameters:

	{{ form.checkbox(label, id, class, name, checked = false, help) }}

Examples:

	{{ form.checkbox('Checkbox with left label') }}

	<div class="form__group">
        <label for="inputCheckboxLeft" class="checkbox__label">Checkbox with left label</label>
        <div class="controls">
            <input type="checkbox" id="inputCheckboxLeft" name="inputCheckboxLeft" checked="">
        </div>
    </div>

    {{ form.checkbox_right('Checkbox with right label', 'inputCheckboxRight', null, 'inputCheckboxInline', true) 

    <div class="form__group">
        <div class="checkbox">
            <label for="inputCheckboxRight" class="checkbox__label">
                <input type="checkbox" />
                Checkbox with right label
            </label>
        </div>
    </div>

<form class="form--horizontal">
<div class="form__group">
    <label class="checkbox__label">Checkbox with left label</label>
    <div class="controls">
        <input type="checkbox" />
    </div>
</div>
</form>

<form class="form--horizontal">
<div class="form__group">
    <div class="checkbox">
        <label for="inputCheckboxRight" class="checkbox__label">
            <input type="checkbox" />
            Checkbox with right label
        </label>
    </div>
</div>
</form>

### Checkbox Groups

You can group checkboxes together into logical blocks by wrapping them with the `checkbox_group` helper, this is particularly useful for creating inline checkboxes if your options are relatively small.

    {{ form.checkbox_group([
            form.checkbox_inline('Inline', 'inputCheckboxInline1', null, 'inputCheckboxInline', true),
            form.checkbox_inline('Check', 'inputCheckboxInline2', null, 'inputCheckboxInline', true),
            form.checkbox_inline('Boxes', 'inputCheckboxInline3', null, 'inputCheckboxInline', true)]) 
    }}

<form class="form--horizontal">
<div class="form__group">
    <div class="checkbox">
        <label for="inputCheckboxInline1" class="checkbox--inline">
        <input type="checkbox" id="inputCheckboxInline1" name="inputCheckboxInline" checked="">
                Inline
        </label>
        <label for="inputCheckboxInline2" class="checkbox--inline">
        <input type="checkbox" id="inputCheckboxInline2" name="inputCheckboxInline" checked="">
                Check
        </label>
        <label for="inputCheckboxInline3" class="checkbox--inline">
        <input type="checkbox" id="inputCheckboxInline3" name="inputCheckboxInline" checked="">
                Boxes
        </label>
    </div>
</div>
</form>