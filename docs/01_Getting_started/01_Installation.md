## Requirements

Pulsar uses a collection of tools to manage dependencies and to compile the stylesheets, you'll need to ensure the following are all installed and included in your PATH

* [Composer](http://getcomposer.org)
* [Ruby](http://ruby-lang.org)
* [Bower](http://bower.io)

These packages may have their own dependencies, we'll assume you can take care of that.

---- 

## Pulsar repository

Pulsar uses GIT and the source is currently maintained in a private BitBucket repository, to clone it you'll need to send your SSH key<sup>[1]</sup> to [Paul Stanton or Scott Riley](mailto:paul.stanton@jadu.net,scott.riley@jadu.net).

<div class="well"><a href="https://bitbucket.org/Stanton/pulsar">https://bitbucket.org/Stanton/pulsar</a></div>

If you'd like to contribute, send us your Bitbucket username.

<sup>[1]</sup> [Using the SSH protocol with Bitbucket](https://confluence.atlassian.com/display/BITBUCKET/Use+the+SSH+protocol+with+Bitbucket)

----

## Installing required packages & libraries

[TODO] where to put the pulsar directory?

Pulsar requires some additional packages to be installed before it'll work, you can install all dependencies by typing the following command in the pulsar directory:

`$ sudo make`

You can define new composer packages to be installed in `composer.json` and new front-end libraries in `bower.json`, re-running the make command will bring these into Pulsar.

These dependencies should be committed to the Pulsar repository, for more information [read this article](http://addyosmani.com/blog/checking-in-front-end-dependencies/).

----

## Removing installed packages & libraries

You can reverse the make process by using:

`$ make clean`

At the moment, this will not remove the Sass dependency that was installed, in case you need it for other things. You can remove it yourself by `$ sudo gem uninstall sass`.
