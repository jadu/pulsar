# Pulsar
_Beautiful human interfaces — Stellar user experiences_

## Requirements

* [Node & NPM](http://nodejs.org)
* [Bower](http://bower.io)


## Installation

Pulsar requires some additional packages to be installed before it'll work, you can install all dependencies by typing the following command in the pulsar directory:

`$ sudo make`

## Developing with Pulsar

If you're going to make changes to any Pulsar files you'll need to tell Pulsar to watch for changes to your stylesheets, in the Pulsar directory type:

`$ make start`

## Removing installed libraries

You can reverse the make process by using:

`$ make clean`

At the moment, this will not remove the Sass dependency that was installed, in case you need it for other things. You can remove it yourself by `sudo gem uninstall sass`.
