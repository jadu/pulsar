Creates a file upload field.

----

Available parameters:

	{{ form.file(label, id, class, name, help) }}

Example:

	{{ form.file('Your photo') }}

	<div class="form__group">
	    <label for="inputFile" class="control__label">Your photo</label>
	    <div class="controls">
	        <input type="file" id="inputFile" name="inputFile">
	    </div>
	</div>	

<form class="form--horizontal">
<div class="form__group">
    <label for="inputFile" class="control__label">Your photo</label>
    <div class="controls">
        <input type="file" id="inputFile" name="inputFile">
    </div>
</div>
</form>