Pulsar uses [Sass](http://sass-lang.com) to make our CSS awesome. 

* The Sass files are in `/stylesheets`
* The compiled CSS files are in `/css` (don't make any changes here)

If you're going to make changes to any styles you'll need to tell Pulsar to watch for changes to your stylesheets, in the Pulsar directory type:

`$ make start`

This will watch all the sass files and recompile all of the CSS files whenever changes are made. Currently we don't do any style injection or live reloading in the browser for you, that may come later.