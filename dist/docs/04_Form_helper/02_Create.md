Outputs an opening form tag.

----

Available parameters:

    {{ form.create(action, class, id, method = 'POST') }}

All parameters are optional, a simple call to `{{ form.create() }}` will assume you're building a form that POSTs back to the current script at it's current URL.

Example usage:

	{{ form.create(action = '/signin') }}

	<form action="/signin" class="form--horizontal" method="POST">
