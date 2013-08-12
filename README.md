<link href="css/markdown.css" rel="stylesheet"></link>
<script type="text/javascript" src="libs/jquery/jquery.min.js"></script>
<script type="text/javascript" src="javascripts/tabs.js"></script>
<script type="text/javascript" src="javascripts/dropdown.js"></script>

# Pulsar
_Beautiful human interfaces — Stellar user experiences_

 * Setup
 	* Requirements
 	* Installing required packages & libraries
 	* Removing installed packages & libraries
 * Developing with Pulsar
 	* Detecting Sass changes
 * Layouts
 	* Tabbed Layout
 		* Tabs List
 		* Tabs Content
 	* Data Grid	
 * Helpers
 	* HTML Helper
	 	* Buttons
		 	* Multiple Tags
		 	* Variations
		 	* Disabled Buttons
		* Icons
			Icon Sizes


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

### Data Grid

The data grid is the primary way to display lists of content and is basically a table within tab. The first column in a data grid is reserved for the `row__actions` checkboxes which allow a user to select multiple items to perform actions on.

Currently, there's no helper for data grids so simply place your table markup, using the `table--datagrid` class, in your tab.

	 <table class="table--datagrid">
        <thead>
            <tr>
                <th class="row__actions">
                    <input type="checkbox" />
                </th>
                <th><a href="#">Title</a></th>
                <th><a href="#">Created</a></th>
                <th><a href="#">Modified</a></th>
                <th><a href="#">Author</a></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="row__actions">
                    <input type="checkbox" />
                </td>
                <td><a href="#">Example content item</a></td>
                <td>Monday 4th July, 2013</td>
                <td>3 hours ago</td>
                <td>Paul Stanton</td>
            </tr>
        </tbody>
    </table>
    
<table class="table--datagrid">
    <thead>
        <tr>
            <th class="row__actions">
                <input type="checkbox" />
            </th>
            <th><a href="#">Title</a></th>
            <th><a href="#">Created</a></th>
            <th><a href="#">Modified</a></th>
            <th><a href="#">Author</a></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="row__actions">
                <input type="checkbox" />
            </td>
            <td><a href="#">Example content item</a></td>
            <td>Monday 4th July, 2013</td>
            <td>3 hours ago</td>
            <td>Paul Stanton</td>
        </tr>
    </tbody>
</table>

There are a handful of row modifier classes to highlight different states

<table class="table--datagrid">
   <tbody>
       <tr>
           <td>Default</td>
       </tr>
       <tr class="is-selected">
           <td>.is-selected</td>
       </tr>
       <tr class="row--highlight">
           <td>.row--highlight</td>
       </tr>
       <tr class="row--success-highlight">
           <td>.row--success-highlight</td>
       </tr>
       <tr class="row--warning-highlight">
           <td>.row--warning-highlight</td>
       </tr>
       <tr class="row--danger-highlight">
           <td>.row--danger-highlight</td>
       </tr>
       <tr class="row--success">
           <td>.row--success</td>
       </tr>
       <tr class="row--warning">
           <td>.row--warning</td>
       </tr>
       <tr class="row--danger">
           <td>.row--danger</td>
       </tr>
   </tbody>
</table>


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

##### Multiple Tags (type)

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
	{{ html.button(html.icon('warning-sign') ~ ' Warning', 'btn--warning') }}
	
	<!-- Contextual button for informational alert messages -->
	{{ html.button('Info ' ~ html.icon('chevron-sign-right'), 'btn--info') }}
	
	<!-- Rarely used, a good example is a 'locked content' button -->
	{{ html.button(html.icon('lock') ~ ' Inverse', 'btn--inverse') }}
	
<button class="btn">Default</button>
<button class="btn btn--primary">Primary</button>
<button class="btn btn--success">Success</button>
<button class="btn btn--danger">Danger</button>
<button class="btn btn--warning"><i class="icon-warning-sign"></i> Warning</button>
<button class="btn btn--info">Info <i class="icon-chevron-sign-right"></i></button>
<button class="btn btn--inverse"><i class="icon-lock"></i> Inverse</button>
	
#### Disabled Buttons

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

### Button Dropdowns / Dropups

Show a dropdown/dropup menu when the button is clicked

Usage:
	
	{{ html.button-dropdown(label, class, id, menu_items) }}
	{{ html.button-dropup(label, class, id, menu_items) }}
	
Pass a list of links to the `menu_items` parameter to be used as the dropdown/up menu, remember you can chain together icons, labels and badges too.
	
	{{ 
	   html.button_dropdown('Drop Down', null, null,
           [	
				html.link(html.icon('save') ~ ' Save'),
				html.link(html.icon('print') ~ ' Print'),
				html.link(html.icon('star') ~ ' Favourite ' ~ html.badge(3)),
				html.divider(),
				html.link(html.icon('trash') ~ ' Delete')
           ]	
       ) 	
	}}
	
<div class="btn__group">
<button type="button" class="btn dropdown__toggle" data-toggle="dropdown">Drop Down <span class="caret"></span></button>
<ul class="dropdown__menu">
<li><a href="#">Action</a></li>
<li><a href="#">Another action</a></li>
<li><a href="#">Something else here</a></li>
<li class="divider"></li>
<li><a href="#">Separated link</a></li>
</ul>
</div>

<div class="btn__group dropup">
<button type="button" class="btn dropdown__toggle" data-toggle="dropdown">Drop Up <span class="caret"></span></button>
<ul class="dropdown__menu">
<li><a href="#">Action</a></li>
<li><a href="#">Another action</a></li>
<li><a href="#">Something else here</a></li>
<li class="divider"></li>
<li><a href="#">Separated link</a></li>
</ul>
</div>

### Icons

Usage:

	{{ html.icon(icon_name, class) }}

Pulsar uses the font-awesome icon font which contains over 300 icons which scale perfectly to any size. Check the [full icon list](http://fortawesome.github.io/Font-Awesome/icons/) for all available icons.

Simply pass the icon name shown in the [icon list](http://fortawesome.github.io/Font-Awesome/icons/) to the icon helper, __without the__ `icon-` __part of the name__:

	<!-- To display 'icon-ok' -->
	{{ html.icon('ok') }}
	
	<!-- To display 'icon-warning-sign' -->
	{{ html.icon('warning-sign') }}
	
<i class="icon-ok"></i> <i class="icon-info-sign"></i>

#### Icon Sizes

Icons inherit their size and colour attributes from their parents and can be nested within other helpers, like buttons, links and tabs.

	<h1>{{ html.icon('info-sign') }} Heading</h1>
	
	<!-- Icon before the text -->
	{{ html.button(html.icon('plus-sign-alt') ~ 'Button', 'btn--primary') }}
	
	<!-- Icon after the text -->
	{{ html.link('Link' ~ html.icon('ok'), '#example') }}
	
<h1><i class="icon-info-sign"></i> Heading</h1><button class="btn btn--primary"><i class="icon-plus-sign-alt"></i> Button</button>
<a href="#example">Link <i class="icon-ok"></i></a>

<br />
To increase the size of the icon relative to it's container, use the `icon-large`, `icon-2x`, `icon-3x` or `icon-4x`.

<p><i class="icon-camera-retro icon-large"></i> icon-large (+33%)</p>
<p><i class="icon-camera-retro icon-2x"></i> icon-2x</p>
<p><i class="icon-camera-retro icon-3x"></i> icon-3x</p>
<p><i class="icon-camera-retro icon-4x"></i> icon-4x</p>

### Labels

Usage:

	{{ html.label(label, class) }}
	
Labels inherit their parent's size:

<h1>Example heading <span class="label">New</span></h1>
<h2>Example heading <span class="label">New</span></h2>
<h3>Example heading <span class="label">New</span></h3>
<h4>Example heading <span class="label">New</span></h4>
<h5>Example heading <span class="label">New</span></h5>
<h6>Example heading <span class="label">New</span></h6>
	
Labels can accept any of the usual modifier classes
	
	{{ html.label('default') }}
	{{ html.label('primary', 'label--primary') }}
	{{ html.label('success', 'label--success') }}
	{{ html.label('warning', 'label--warning') }}
	{{ html.label('danger', 'label--danger') }}
	{{ html.label('info', 'label--info') }}
	{{ html.label('inverse', 'label--inverse') }}
	
<span class="label">default</span>
<span class="label label--primary">primary</span>
<span class="label label--success">success</span>
<span class="label label--warning">warning</span>
<span class="label label--danger">danger</span>
<span class="label label--info">info</span>
<span class="label label--inverse">inverse</span>

### Badges

Use badges to signify quantities or a number of items

Usage:

	{{ html.badge(label, class) }}
	
Badges can accept any of the usual modifier classes
	
	{{ html.badge('1') }}
	{{ html.badge('2', 'badge--primary') }}
	{{ html.badge('3', 'badge--success') }}
	{{ html.badge('5', 'badge--warning') }}
	{{ html.badge('8', 'badge--danger') }}
	{{ html.badge('13', 'badge--info') }}
	{{ html.badge('21', 'badge--inverse') }}
	
<span class="badge">1</span>
<span class="badge badge--primary">2</span>
<span class="badge badge--success">3</span>
<span class="badge badge--warning">5</span>
<span class="badge badge--danger">8</span>
<span class="badge badge--info">13</span>
<span class="badge badge--inverse">21</span>

#### Badged Buttons

Badges within buttons will inherit the parent's styling, which is nice.

	{{ html.button('Default ' ~ html.badge('1')) }}
    {{ html.button(html.icon('inbox') ~ ' Primary ' ~ html.badge('2'), 'btn--primary') }}
    {{ html.button(html.icon('ok') ~ ' Success ' ~ html.badge('3'), 'btn--success') }}
    {{ html.button(html.icon('warning-sign') ~ ' Warning ' ~ html.badge('5'), 'btn--warning') }}
    {{ html.button(html.icon('trash') ~ ' Danger ' ~ html.badge('8'), 'btn--danger') }}
    {{ html.button(html.icon('info-sign') ~ ' Info ' ~ html.badge('13'), 'btn--info') }}
    {{ html.button(html.icon('lock') ~ ' Inverse ' ~ html.badge('21'), 'btn--inverse') }}

<p>
	<button class="btn">Default <span class="badge">1</span></button>
	<button class="btn btn--primary"><i class="icon-inbox"></i> Primary <span class="badge ">2</span></button>
	<button class="btn btn--success"><i class="icon-ok"></i> Success <span class="badge ">3</span></button>
</p>
<p>
	<button class="btn btn--warning"><i class="icon-warning-sign"></i> Warning <span class="badge ">5</span></button>
	<button class="btn btn--danger"><i class="icon-trash"></i> Danger <span class="badge ">8</span></button>
	<button class="btn btn--info"><i class="icon-info-sign"></i> Info <span class="badge ">13</span></button>
	<button class="btn btn--inverse"><i class="icon-lock"></i> Inverse <span class="badge ">21</span></button>
</p>

## Microinteractions

### Saving

**Normal save**

* Button disabled while save action in progress
* Changes in width and colour should be quickly animated

<button class="btn btn--primary">Save</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--primary is-disabled" disabled="disabled"><i class="icon-spinner icon-spin"></i> Saving</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--success is-disabled""><i class="icon-ok"></i> Saved</button>
<i class="icon-time"></i> 3s
<button class="btn btn--primary">Save</button>

**Longer-than-expected save**

<button class="btn btn--primary">Save</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--primary is-disabled" disabled="disabled"><i class="icon-spinner icon-spin"></i> Saving</button>
<i class="icon-time"></i> 5s
<button class="btn btn--warning is-disabled" disabled="disabled"><i class="icon-spinner icon-spin"></i> Still Saving</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--success is-disabled""><i class="icon-ok"></i> Saved</button>

**Failed save**

* Should be accompanied by an alert, or blocking modal confirming the error

<button class="btn btn--primary">Save</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--primary is-disabled" disabled="disabled"><i class="icon-spinner icon-spin"></i> Saving</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--danger is-disabled""><i class="icon-warning-sign"></i> Save Failed</button>

**Auto save**

* Button should not change size to minimize distraction while the user is working
* Button should fade between all states

<button class="btn btn--primary">Save</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--primary">&nbsp;&nbsp;<i class="icon-spinner icon-spin"></i>&nbsp;&nbsp;</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--primary">&nbsp;&nbsp;<i class="icon-ok"></i>&nbsp;&nbsp;</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--primary">Save</button>

### Selecting multiple items to perform an action on

<button class="btn">Actions <i class="icon-caret-down"></i></button>
<i class="icon-long-arrow-right"></i>
<button class="btn">Actions <span class="badge badge--primary">3</span> <i class="icon-caret-down"></i></button>