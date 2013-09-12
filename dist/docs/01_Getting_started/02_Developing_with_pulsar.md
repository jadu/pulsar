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
 * Compile Sass to CSS

You can run these checks manually (without needing to commit) with `$ grunt pre-commit`