# Pulsar
_Beautiful human interfaces — Stellar user experiences_

## Setup

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

### Detecting Sass changes

If you're going to make changes to any Pulsar files you'll need to tell Pulsar to watch for changes to your stylesheets, in the Pulsar directory type:

`$ make start`

## Helpers

The Pulsar templating engine uses a collection of helpers to render nice clean markup keep our templates nice and DRY.

 * **html** : for things like buttons, labels etc
 * **form** : for form inputs
 
These helpers are available globally in the templates.


## HTML Helper

### Buttons

Interface buttons — while they look the same — can be links, buttons or submit inputs and can be used anywhere in the UI for different needs.

Usage:

	{{ html.button(label, class, id, type, href) }}

Where possible, you should use the default button type

	{{ html.button('this is a regular button') }}
	
Buttons can also be regular links by changing the `type` attribute and supplying the `href` value
	
	{{ html.button('this is a link button', 'btn--primary', 'link', null, 'http://myurl.com') }}
	
We can also use submit inputs if your button needs to do form operations, although depending on the context you might want to use the `form.input` helper
	
	{{ html.button('this is an input button', btn--success, 'input') }}
	
#### Variations

The following modifier classes can be applied to the `class` attribute to change the visual appearance of all button types

* `btn--primary`
* `btn--secondary`
* `btn--success`
* `btn--danger`
* `btn--warning`
* `btn--info`
* `btn--inverse`
* `is-selected`
* `is-disabled`
