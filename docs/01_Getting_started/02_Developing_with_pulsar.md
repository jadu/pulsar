## Running Pulsar's Documentation

Start Pulsar's development server with the following command:

`$ grunt`

This will make the Pulsar documentation available at [http://localhost:8000](http://localhost:8000) and start watching your Sass files for changes.

## Compiling Stylesheets

In a second tab, type the command:

`$ grunt watch`

This will watch all the sass files and recompile all of the CSS files whenever changes are made. Currently we don't do any style injection or live reloading in the browser for you, that may come later.

Pulsar uses [Sass](http://sass-lang.com) to make our CSS awesome, while Pulsar is running your stylesheets will be watched for changes and recompiled automatically as you work.

* The Sass files are in `/stylesheets`
* The compiled CSS files are in `/css` (don't make any changes here)

