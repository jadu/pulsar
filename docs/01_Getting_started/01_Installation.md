# Pulsar UI

These steps detail how you can run Pulsar UI completely independently of a Jadu/Weejot installation.

## Requirements

### PHP 5.4.0+

Pulsar creates its own development server to run the documentation and to compile the stylesheets, you will need PHP 5.4.0+ installed on your mac, but this doesn't have to be the default version installed under OSX. [This article](http://php-osx.liip.ch) shows how to install the latest version of PHP as `/usr/local/php5/bin/php`. This path is defined in `Gruntfile.js`.

### Packages

Pulsar uses a collection of tools to manage dependencies, you'll need to ensure the following are all installed and included in your PATH

* [Composer](http://getcomposer.org)
* [Bower](http://bower.io)
* [Grunt](http://gruntjs.com)
* [Homebrew](http://brew.sh)

These packages have their own dependencies, we'll assume you can take care of that.

---- 

## Pulsar repository

Pulsar uses Git and the source is currently maintained in a private BitBucket repository, to clone it you'll need to send your [SSH key](https://confluence.atlassian.com/display/BITBUCKET/Use+the+SSH+protocol+with+Bitbucket) to [Paul Stanton or Scott Riley](mailto:paul.stanton@jadu.net,scott.riley@jadu.net).

[https://bitbucket.org/Stanton/pulsar](https://bitbucket.org/Stanton/pulsar)

If you'd like to contribute, send us your Bitbucket username.

----

## Installing required packages & libraries

Pulsar requires some additional packages to be installed before it'll work, you can install all dependencies by typing the following command in the pulsar directory:

`$ make`

Don't run this command with sudo as some steps may fail if you try to run them with too much privilege.

You can define new composer packages to be installed in `composer.json` and new front-end libraries in `bower.json`, re-running the make command will bring these into Pulsar. You can reverse the make process by using `$ make clean`.

These dependencies should be committed to the Pulsar repository, for more information [read this article](http://addyosmani.com/blog/checking-in-front-end-dependencies/).