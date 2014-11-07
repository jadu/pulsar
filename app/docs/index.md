Pulsar is a robust user-interface framework with a collection of patterns, helpers and a user-focused design process with documented best practices that will help you to make beautiful user interfaces and beautiful user experiences.

## Installing development dependencies

To run the local development version of Pulsar some additional packages to be installed before it'll work, you can install all dependencies by typing the following command in the pulsar directory:

    $ make

(Make can be installed via xCode)

You can define new composer packages to be installed in `composer.json` and new front-end libraries in `bower.json`, re-running the make command will bring these into Pulsar. You can reverse the make process by using:

    $ sudo make clean

These dependencies should be committed to the Pulsar repository, for more information [read this article](http://addyosmani.com/blog/checking-in-front-end-dependencies/).

### Changelog

**2.2.0** - 07/11/2014

* Add [Summernote](/app/lexicon?tab=editor) WYSIWYG editor example

**2.1.0** - 07/11/2014

* Add MatchMedia library
* Add Dan's background-size polyfill
* Make mobile menu only show if there are tab items present to display

**2.0.0** - 20/10/2014

This release marks a significant step in Pulsar-UI's lifecycle and merges a lot of the work and lessons learned into the Pulsar core. There are some changes will will break backwards compatibility with older versions of Pulsar-UI so increments the major version number to 2.0.0

The full extent of changes this introduces are too many to include here (we're talking over 6 months of work), but here's the best bits:

 * Start a changelog!
 * Make `product/quantum` branch the new HEAD of `develop` and `master`
 * **[BREAKING]** Stop creating `/dist` package as part of build step. Products like JaduCMS and Quantum are now responsible for compiling their own Sass/JS
 * **[BREAKING]** Change `pulsar.scss` to include examples of how to include product specific styles and variables and have them included in the compiled CSS
 * Responsive toolbar & primary navigation
 * Change to how toolbar heights are calculated to allow it to respond better on smaller viewports
 * Add Quantum's 'Choice Matrix' form element
 * Update `html.button_group()` helper to support classes and attributes
 * Remove hover highlight on invalid form fields when used in a modal
 * General clean up of gruntfile, removing some out of date build tasks
 * Prevent select elements using Proxima Nova, which was causing garbled characters in Chrome (known issue)
 * Force Webkit browsers to use SVG fonts

**1.0.16**

This version was the last version to provide a pre-compiled set of CSS files, while it's been used in development for a couple of products and modules, it is not believed to have been used in production, however, the Quantum branch of 1.0.16 made significant changes and was used in production and was chosen to become the new master branch.

There is no changelog history before this point apart from the Git commit log.
