Fieldsets are used for grouping related form components together, there's no visual style associated with them other than the optional `legend`.

----

Available parameters:

	{{ form.fieldset_start(legend) }}

Example usage:

	{{ form.fieldset_start(legend = 'Sign in') }}

	<fieldset>
		<legend>Sign in</legend>
