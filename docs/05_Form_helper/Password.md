Password inputs are identical to [text inputs](Text), but use dots/asterisks to mask the entered information.

----

Available parameters:

    {{ form.password(label, value, id, class, name, placeholder, help, prepend, append) }}

Example:

	{{ form.password(label = 'Password') }}

	<div class="form__group">
        <label for="inputText" class="control__label">Your password</label>
        <div class="controls">
            <input type="password" class="form__control" />
		</div>
    </div>

<form class="form--horizontal">
<div class="form__group">
    <label for="inputText" class="control__label">Your password</label>
    <div class="controls">
        <input type="password" class="form__control" />
	</div>
</div>
</form>