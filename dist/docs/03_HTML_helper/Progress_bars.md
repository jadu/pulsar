Provide up-to-date feedback on the progress of a workflow or action with simple progress bars.

----

Available attributes:

	{{ html.progress(value, class, label, visible_value = false) }}

## Variations

	<!-- Default -->
	{{ html.progress(value = 50) }}

<div class="progress">
	<div class="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%;">
		<span class="sr-only">50%</span>
	</div>
</div>

	<!-- Warning -->
	{{ html.progress(
		value = 60, 
		class = 'progress-bar--warning',
		visible_value = true) }}

<div class="progress">
	<div class="progress-bar progress-bar--warning" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width: 70%;">
		70%
	</div>
</div>

	<!-- Danger -->
	{{ html.progress(
		value = 60, 
		class = 'progress-bar--danger',
		label = 'uploaded', 
		visible_value = true) }}

<div class="progress">
	<div class="progress-bar progress-bar--danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%;">
		80% uploaded
	</div>
</div>

	<!-- Success -->
	{{ html.progress(
		value = 100, 
		class = 'progress-bar--success',
		label = 'Uploaded ' ~ html.icon('ok') ) }}

<div class="progress">
	<div class="progress-bar progress-bar--success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
		uploaded <i class="icon-ok"></i>
	</div>
</div>