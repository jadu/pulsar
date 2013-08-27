## Ending forms

Closes a form with the desired submit actions, usually used in conjunction with [submit inputs](./Submit).

----

Available parameters:

    {{ form.end(actions) }}

Actions can be an array of buttons/submits.

Example usage:
	
	{{ form.end(form.submit('Sign in')) }}

		<div class="form__actions">
			<input type="submit" class="btn" value="Sign in" />
		</div>
	</form>