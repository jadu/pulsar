<link href="css/markdown.css" rel="stylesheet"></link>

# Pulsar
_Beautiful human interfaces — Stellar user experiences_


## Setup
----
### Requirements

Pulsar uses a collection of tools to manage dependencies and to compile the stylesheets, you'll need to ensure the following are all installed and included in your PATH

* [Composer](http://getcomposer.org)
* [Ruby](http://ruby-lang.org)
* [Bower](http://bower.io)

These packages may have their own dependencies, we'll assume you can take care of that.

### Installing required packages & libraries

[TODO] where to put the pulsar directory?

Pulsar requires some additional packages to be installed before it'll work, you can install all dependencies by typing the following command in the pulsar directory:

`$ sudo make`

You can define new composer packages to be installed in `composer.json` and new front-end libraries in `bower.json`, re-running the make command will bring these into Pulsar.

These dependencies should be committed to the Pulsar repository, for more information [read this article](http://addyosmani.com/blog/checking-in-front-end-dependencies/).

### Removing installed packages & libraries

You can reverse the make process by using:

`$ make clean`

At the moment, this will not remove the Sass dependency that was installed, in case you need it for other things. You can remove it yourself by `$ sudo gem uninstall sass`.

## Developing with Pulsar
----
### Detecting Sass changes

If you're going to make changes to any Pulsar files you'll need to tell Pulsar to watch for changes to your stylesheets, in the Pulsar directory type:

`$ make start`

This will watch all the sass files and recompile `pulsar.css` when they change. Currently we don't do any style injection or live reloading in the browser for you, that may come later.

## Layouts
----
### Tabbed Layout

The tabbed layout is Pulsar's default and consists of a list of clickable tabs down the left hand side and their respective content on the right. The tab content is ususally a form or a data-grid, but can be more complex depending on the needs of the interface.

[ image goes here ]

There are two template blocks which should be set by a view:

	{% block tabs_list %} 
		<!-- tabs list -->
	{% endblock %}
	
	{% block tabs_content %} 
		<!-- tabs content -->
	{% endblock %}

#### Tabs List

Pass an array of labels to the `html.tabs` helper and they'll be rendered as clickable tabs.

Available attributes:

	{{ html.tabs(tab_labels, active_tab) }}
	
In your view you can populate the `tabs_list` block to place your tabs in the correct position.

	{% block tabs_list %}
		{{ html.tabs(['One', 'Two', 'Three'], 2) }}
	{% endblock %}

<ul class="nav nav__tabs">
	<li><a href="#tab_1">One</a></li>
	<li><a href="#tab_2" class="is-active">Two</a></li>
	<li><a href="#tab_3">Three</a></li>
</ul>

<br style="clear:both;" />

The ID attribute for each tab link will be automatically generated in the format `tab_x` so that they correspond with their respective tab content.

#### Tabs Content

Available attributes:
	
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

## Helpers
----
The Pulsar templating engine uses a collection of global helpers to render nice clean markup and keep our templates nice and DRY.

 * **html** : for repeatable components like buttons, labels etc
 * **form** : for form inputs and controls

### HTML Helper

#### Buttons

Interface buttons — while they look the same — can be links, buttons or inputs and can be used anywhere in the UI for different needs.

Available attributes:

	{{ html.button(label, class, id, type, href, attributes) }}

##### Multiple tags (type)

Where possible, you should use the default button type, but buttons can also be links and inputs.

	{{ html.button('Button') }}
	{{ html.button('Link Button', null, 'link', null, 'http://myurl.com') }}
	{{ html.button('Input Button', null, 'input') }}
	{{ html.button('Submit Button', null, 'submit') }}
	
<button class="btn">Button</button>
<a href="http://myurl.com" class="btn" role="button">Link Button</a>
<input type="button" class="btn" value="Input Button" />
<input type="submit" class="btn" value="Submit Button" />

##### Variations (class)

The following modifier classes can be applied to the `class` attribute to change the visual appearance of all button types

	<!-- The normal type of button you should use -->
	{{ html.button('Default') }}
	
	<!-- In the context of a full UI, this is the main thing we want the user to do next -->
	{{ html.button('Primary', 'btn--primary') }}
	
	<!-- Indicates a successful or positive action -->
	{{ html.button('Success', 'btn--success') }}
	
	<!-- Indicates a dangerous or destructive action -->
	{{ html.button('Danger', 'btn--danger') }}
	
	<!-- Indicates caution should be taken here -->
	{{ html.button('Warning', 'btn--warning') }}
	
	<!-- Contextual button for informational alert messages -->
	{{ html.button('Info', 'btn--info') }}
	
	<!-- Rarely used, a good example is a 'locked content' button -->
	{{ html.button('Inverse', 'btn--inverse') }}
	
<button class="btn">Default</button>
<button class="btn btn--primary">Primary</button>
<button class="btn btn--success">Success</button>
<button class="btn btn--danger">Danger</button>
<button class="btn btn--warning">Warning</button>
<button class="btn btn--info">Info</button>
<button class="btn btn--inverse">Inverse</button>
	
#### Disabled buttons

Adding the `is-disabled` class to a button will automatically add the `disabled` attribute to `button` `input` and `submit` type buttons.

	{{ html.button('Disabled Button', 'is-disabled') }}

	// output:
	// <button class="btn is-disabled" disabled="disabled">Disabled Button</button>
	
<button class="btn is-disabled" disabled>Disabled Button</button>

### Button Groups

Group a series of related buttons together on a single line by passing the `buttonGroup` helper an array of `button` elements.
	
	{{ 
		html.buttonGroup([ 
			html.button('Left'), 
			html.button('Middle'),
			html.button('Right') 
		])
	}}
	
<div class="btn__group"><button class="btn">Left</button><button class="btn">Middle</button><button class="btn">Right</button></div>
