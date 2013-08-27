The tabbed layout is Pulsar's default and consists of a list of clickable tabs down the left hand side and their respective content on the right. The tab content is ususally a form or a data-grid, but can be more complex depending on the needs of the interface.

![tabbed layout example](/pulsar/docs/images/layout_tabbed.png)

There are two template blocks which should be set by a view:

	{% block tabs_list %} 
		<!-- tabs list -->
	{% endblock %}
	
	{% block tabs_content %} 
		<!-- tabs content -->
	{% endblock %}


## Tabs List

Pass an array of labels to the `html.tabs` helper and they'll be rendered as clickable tabs.

Available parameters:

	{{ html.tabs(tab_labels, active_tab) }}
	
In your view you can populate the `tabs_list` block to place your tabs in the correct position and optionally choose which tab should be active on page load.

	{% block tabs_list %}
		{{ html.tabs(['One', 'Two', 'Three'], 2) }}
	{% endblock %}

<ul class="tabs__list">
	<li><a href="#tab_1" data-toggle="tab">One</a></li>
	<li class="is-active"><a href="#tab_2" data-toggle="tab">Two</a></li>
	<li><a href="#tab_3" data-toggle="tab">Three</a></li>
</ul>

<br style="clear:both;" />

The ID attribute for each tab link will be automatically generated in the format `tab_x` so that they correspond with their respective tab content.


## Tabs Content

Available parameters:
	
	{{ html.tabs_content(tab_contents, active_tab) }}

Create the contents of your tabs and pass them to the `html.tabs_content` helper within the `tabs_content` block in your view.

	{% set tab_one %}
		<p>tab one content</p>
	{% endset %}
	
	{% set tab_two %}
		<p>tab two content</p>
	{% endset %}
	
	{% set tab_three %}
		<p>tab three content</p>
	{% endset %}
	
	{% block tabs_content %}
		{{ html.tabs_content([tab_one, tab_two, tab_three], 2) }}
	{% endblock %}

Each tab's ID attribute will be automatically generated in the format `tab_x` to match those created by the `html.tabs` helper.