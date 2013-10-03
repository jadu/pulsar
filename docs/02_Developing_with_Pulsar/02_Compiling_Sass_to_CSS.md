Pulsar uses [Sass](http://sass-lang.com) to make our CSS awesome, while Pulsar is running your stylesheets will be watched for changes and recompiled automatically as you work.

* The Sass files are in `/stylesheets`
* The compiled CSS files are in `/css` (don't make any changes here)

In another terminal window, type the command:

	$ grunt watch

This will watch all the Sass files and recompile all of the CSS files whenever changes are made. Currently we don't do any style injection or live reloading in the browser for you, that may come later.

If you need to, you can manually recompile the Sass with:

    $ grunt sass:dev
