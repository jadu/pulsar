Creates a select field with a number of options.

Available parameters:

	{{ form.select(label, options, id, class, name, help) }}

Example:

	{{ form.select('Choose one', {value1: 'value one', value2: 'value two'}) }}

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
