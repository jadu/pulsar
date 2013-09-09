A simple helper to render a plain 'ol hyperlink.

You should use the link helper for everything as the plan is to automatically track UI element usage through analytics, using the link helper will allow us to roll out tracking code much more easily.

Available parameters:
	
	{{ html.link(label, href, class, id, attributes) }}

Data-attributes can be attached to links through `attributes`

	<!-- Simple example -->
	{{ html.link(label = 'Sign in', href = '/signin') }}

	<!-- Complex example -->
	{{ html.link(
		label = html.icon('user') ~ ' My account', 
		href = '#preferences', 
		attributes = 'data-toggle="modal"' ) }}

Simple example: <a href="/signin">Sign in</a>

Complex example: <a href="#preferences" data-toggle="modal"><i class="icon-user"></i> My account</a>

