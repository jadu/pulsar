These steps detail how you can run Pulsar UI completely independently of a Jadu/Weejot installation.

## Requirements

### OSX Mavericks (or manual install of PHP 5.4.0+)

Pulsar creates its own development server to run the documentation and to compile the stylesheets, if you're running Mountain Lion you will need to install PHP 5.4.0+, [This article](http://php-osx.liip.ch) shows how to install the latest version of PHP as `/usr/local/php5/bin/php`. This path is defined in `Gruntfile.js`.

----

## Pulsar repository

Pulsar uses Git and the source is published to [GitLab](https://gitlab.hq.jadu.net), you are free to clone and [fork](https://gitlab.hq.jadu.net/pulsar/pulsar-ui/fork) this repository as needed, please submit any changes as a [merge request](https://gitlab.hq.jadu.net/pulsar/pulsar-ui/merge_requests).

Repository URL: [https://gitlab.hq.jadu.net/pulsar/pulsar-ui/tree/master](https://gitlab.hq.jadu.net/pulsar/pulsar-ui/tree/master)

----

## Installing required packages & libraries

Pulsar requires some additional packages to be installed before it'll work, you can install all dependencies by typing the following command in the pulsar directory:

    $ make

(Make can be installed via xCode)

You can define new composer packages to be installed in `composer.json` and new front-end libraries in `bower.json`, re-running the make command will bring these into Pulsar. You can reverse the make process by using:

    $ sudo make clean

These dependencies should be committed to the Pulsar repository, for more information [read this article](http://addyosmani.com/blog/checking-in-front-end-dependencies/).