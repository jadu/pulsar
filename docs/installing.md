---
layout: page
title: Installation
---

Pulsar can run standalone to allow you to develop user interfaces outside of the software, it requires a few things to be installed first.

## First Time Installation

Clone the repository.

```bash
git clone https://github.com/jadu/pulsar.git
```

This will create a directory called `pulsar`, navigate to that directory.

```bash
cd pulsar
```

Pulsar requires extra software packages (dependencies) before it’ll work. Luckily, we thought we’d write you a little makefile to install these for you to help you get up and running quickly.

To see a list of known working versions of the development dependencies, and a list of known issues, see [this wiki page on GitHub](https://github.com/jadu/pulsar/wiki/Make).

<p class="message">
You should know that the makefile will attempt to install everything required for Pulsar, including things like Ruby, Vagrant, Virtualbox and Node. If you're going to start swearing if Puslar updates your node version, you should probably just read through the makefile and do this yourself.
</p>

If you're on OSX, you'll need to [install xCode from the App Store](https://itunes.apple.com/gb/app/xcode/id497799835?mt=12) and then install the command line tools with `xcode-select --install`

When you’re ready, run the makefile:

```bash
make
```

This may take a while if it’s your first time, once that’s ready you should be ready to fire up the vagrant virtual machine with:

```bash
vagrant up
```

The first time you run this, vagrant will download a ‘box’ which is basically a lightweight Ubuntu build, it will then run a provisioning script which installs and configures Apache, PHP, MySQL and Git.

Once that’s complete, you will need to run the main `grunt` task which will build the main CSS and javascript files, and watch for any further changes. This can be started with:

```bash
grunt
```

The Pulsar Lexicon (a reference site containing lots of common elements) should then load automatically, or be available at http://localhost:3000

## Day-to-Day Development

Once you’ve installed the Pulsar development environment to your machine you’ll only need to start the Vagrant machine and Grunt, you can do this together with the following command:

```bash
vagrant up; grunt;
```

Pulsar should then be available in your favourite browser at [http://localhost:3000](http://localhost:3000)

## Reinstalling

If something goes awry, you can reinstall the vagrant box with:

```bash
vagrant provision
```

You may also wish to try re-running `make` to make sure no dependencies were missed.

## Uninstalling

Remove the vagrant machine with the rather spectacular command:

```bash
vagrant destroy
```

Then simply delete the `pulsar` directory from your machine.

We made the decision not to write any commands to uninstall the dependencies installed during the `make` process as we’ve made the assumption that if you’re using Pulsar you probably already have/need many of the same packages, and removing these would be a BadThing™.






