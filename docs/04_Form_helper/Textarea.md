Creates a textarea input field who's height can be defined in 'rows'

Available parameters:

	{{ form.textarea(label, id, class, name, placeholder, help, rows = 2) }}

Example:

	{{ form.textarea('Your bio') }}	

	<div class="form__group">
        <label class="control__label">Your bio</label>
        <div class="controls">
            <textarea class="form__control" rows="2"></textarea>
        </div>
    </div>

<form class="form--horizontal">
<div class="form__group">
    <label class="control__label">Your bio</label>
    <div class="controls">
        <textarea class="form__control" rows="2"></textarea>
    </div>
</div>
</form>