### Changelog

**3.3.0** - TBC

* **New** `.progress-list` component, is it a progress bar? is it a list? it's both!
* **New** Horizontal '.block-list' variation
* We've added a couple of utility classes for fine-tuning your layout, namely `.double-top`, which doubles the top margin and `.bottomless` which removes the default bottom margin for an element. We've not yet needed to add a `.topless` class, but it sounds like fun
* Stopped the `form.end()` helper moaning when Twig runs with `strict_variables`
* Fixed issue where attributes with empty values (like `checked=""`) were still included in the markup. As much as we're an optimist, having all checkboxes checked all the time wasn't ideal
* Added new `tab-sidebar` component so that we can add instructions/guidance to a tabbed UI

**3.2.0** - 26/02/2015

* Switch to using Browserify instead of RequireJS, not just for t'laugh, it's just better
* Slimmed down the main javascript package to the essential components that the  majority of Pulsar UIs will need

**3.1.0** - 18/02/2015

* Removed use of [sudo](http://www.youtube.com/watch?v=r0qBaBb1Y-U) from makefile
* Dumping php server functions from gruntfile in favour of Vagrant, we've just got more in common
* Standardised colour variable use for badges, labels and buttons
* Added a missing comma, mistakes like that crash space shuttles!

**3.0.0** - 17/02/2015

* **New** `html.panel` component
* **New** `html.label_group` component
* Rewrote all helpers to remove the need for named arguments, now everyone gets along nicely
* Made all helpers compatibile with Twig’s `strict_variables` mode
* Added an `AttributesParser` Twig extension to simplify how html element attributes are passed around inside macros
* Added new `excludes` and `only` array filters for Twig, be a bit more bossy about what your arrays do
* Switch to the official [twigphp/twig](https://github.com/twigphp/Twig) repository instead of jadu/twig which was a fork of fabpot/twig (did you follow all that?)
* Went through the 12 step programme and removed the Bourbon dependency from Sass
* Remixed the state colours (success, error etc) to meet WCAG 2.0 AA guidelines for contrast ratios, you can now read the text, which is nice
* Made buttons look pretty (buttons used to use Bourbon’s button styling, eww)
* Updated popover styling to make them a bit sharper and standouty (totally a word)
* Added Vagrant hawtness for running the Pulsar development environment in a VM like the cool kids

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
