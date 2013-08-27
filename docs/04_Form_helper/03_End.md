## Ending forms

Closes a form with the desired submit actions.

----

Available parameters:

    {{ form.end(actions) }}

Actions can be an array of buttons/submits.

Example usage:
	
	{{ form.end(form.submit('Sign in')) }}

Output:

		<div class="form__actions">
			<input type="submit" class="btn btn--primary" value="Sign in" />
		</div>
	</form>