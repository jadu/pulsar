## Running Pulsar's Documentation

Start Pulsar's development server with the following command:

`$ grunt`

This will make the Pulsar documentation available at [http://localhost:8000](http://localhost:8000).

## Compiling Stylesheets

In another terminal window, type the command:

`$ grunt watch`

This will watch all the sass files and recompile all of the CSS files whenever changes are made. Currently we don't do any style injection or live reloading in the browser for you, that may come later.

Pulsar uses [Sass](http://sass-lang.com) to make our CSS awesome, while Pulsar is running your stylesheets will be watched for changes and recompiled automatically as you work.

* The Sass files are in `/stylesheets`
* The compiled CSS files are in `/css` (don't make any changes here)

## Pre-commit checks

The following checks and tasks are run ever time you commit changes to the pulsar repository, if any of them fail you must resolve the issue before comitting.

 * Check all js, css, scss, twig files use spaces instead of hard-tabs

You can run these checks manually (without needing to commit) with `$ grunt pre-commit`

## Building a release

Our sofware (CMP, Zodyac, Weejot) consume a 'built' version of pulsar which is contained within the `/dist` directory.

The contents of `/dist` should reflect the current state of the latest stable release on the master branch.

To build a new release, you can run the following grunt command:

`$ grunt build`

This will perform the following tasks:

 * Run tests
 * Compile Sass files to CSS
 * Minify all pulsar specific javascript into a single file
 * Copy all libs, fonts, docs and images

The resulting changes to `/dist` should then be committed to the master branch and a new release tag created.
