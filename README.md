# Pulsar
_Beautiful human interfaces — Stellar user experiences_

## Setup

### Requirements

Pulsar uses a collection of tools to manage dependencies and to compile the stylesheets, you'll need to ensure the following are all installed and included in your PATH

* [Composer](http://getcomposer.org)
* [Ruby](http://ruby-lang.org)
* [Bower](http://bower.io)

These packages may have their own dependencies, we'll assume you can take care of that.

### Installation

[TODO] where to put the pulsar directory?

Pulsar requires some additional packages to be installed before it'll work, you can install all dependencies by typing the following command in the pulsar directory:

`$ sudo make`

### Removing installed libraries

You can reverse the make process by using:

`$ make clean`

At the moment, this will not remove the Sass dependency that was installed, in case you need it for other things. You can remove it yourself by `sudo gem uninstall sass`.


## Developing with Pulsar

### Detecting Sass changes

If you're going to make changes to any Pulsar files you'll need to tell Pulsar to watch for changes to your stylesheets, in the Pulsar directory type:

`$ make start`
