Creates a select field with a number of options.

----

Available parameters:

	{{ form.select(label, options, selected, id, class, name, help) }}

Example:

	{{ form.select(
        label = 'Choose one', 
        options = {
            value1: 'value one', 
            value2: 'value two'
        }) }}

	<div class="form__group">
        <label class="control__label">Choose one</label>
        <div class="controls">
            <select class="form__control">
            	<option value="value1">value one</option>
            	<option value="value2">value two</option>
            </select>
        </div>
    </div>

<form class="form--horizontal">
<div class="form__group">
    <label class="control__label">Choose one</label>
    <div class="controls">
        <select class="form__control">
            <option value="value1">value one</option>
            <option value="value2">value two</option>
        </select>
    </div>
</div>
</form>

----

Pre-select an option by passing the options[value] to the `selected` attribute:

    {{ form.select(
        label = 'Choose one', 
        options = {
            value1: 'value one', 
            value2: 'value two'
        },
        selected = 'value2'
    ) }}

    <div class="form__group">
        <label class="control__label">Choose one</label>
        <div class="controls">
            <select class="form__control">
                <option value="value1">value one</option>
                <option value="value2" selected>value two</option>
            </select>
        </div>
    </div>

<form class="form--horizontal">
<div class="form__group">
    <label class="control__label">Choose one</label>
    <div class="controls">
        <select class="form__control">
            <option value="value1">value one</option>
            <option value="value2" selected>value two</option>
        </select>
    </div>
</div>
</form>
