---
layout: page
title: CSS Styleguide
---

Because our CSS could be (and should be) modified and maintained by any Jadu engineer and is visible to any Jadu customer we have a set of guidelines to govern how CSS is written for the Jadu platform to ensure we:

* Keep code transparent and readable
* Keep stylesheets maintainable
* Keep stylesheets scalable
* Keep stylesheets consistent

## Anatomy of rulesets

```css
[selector] {
    [property]: [value];
    [<- declaration ->]
}
```

* Use soft tabs with a four space indent
* Put a single space after `:` in property declarations
* Put a single space before `{` in rule declarations
* Use multi-line CSS
* Use alphabetically ordered declarations
* Always include the closing semi-colon on the last declaration in a ruleset

##### Example:

```css
.anatomy-example {
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #0f0;
    color: #000;
}
```

You should aim to adhere to these rules where possible but there will be exceptions, you may want to modify your indenting to aid the readability of certain properties like vendor prefixes.

## Multi-line CSS

Single line CSS rulesets are a pain to navigate, a pain to diff, and a pain to edit.
Our final CSS file can be minified and gzipped, so don't worry about those extra lines padding out the file size, using multi-line declarations keeps things orderly in development.

## Alphabetically ordered declarations

All designers and developers have their own idea of which properties should be grouped together, like positioning and size. In order to take personal preference out of the equation and bring consistency to our stylesheets the easiest way to do this is to order them alphabetically.

As well as making it easier to visually locate a specific rule in a large ruleset, the CSS author doesn't need to constantly refer to this document to re-learn our ordering scheme to make updates and it should be quite clear from reading the stylesheet alone that we're ordering alphabetically.

## Closing semi-colon

The closing semi-colon on the last declaration of a CSS rule is optional, while some people will no-doubt argue that dropping this will lead to smaller filesizes I’d always argue that long-term maintainability is more important, especially on larger projects with multiple developers.

By keeping the closing semi-colon in place anyone can quickly dive into the file and add rules without needing to worry about where the semi-colons are.

## Javascript hooks

Pulsar UI's CSS should be considered completely fluid and never in a fixed state long enough to guarantee the reliability of any javascript that may bind behaviour to it's classes.

Wherever possible, use `.js-` namespaced classes to hook into your javascript (`.js-` classes should never have style bound to them) or use data attributes; they're more robust, have a kind of key/value relationship and are much more extensible.

Javascript may (of course) change CSS state classes such as `.is-open` or `.is-active`.

## SCSS style

* Any `.scss` file which does not directly compile to a `.css` version should be prefixed with an underscore. `_example.scss`
* As a rule of thumb, don't nest further than 3 levels deep. If you find yourself going further, think about reorganizing your rules (either the specificity needed, or the layout of the nesting)
* Avoid using the nested `&__foo` method, it makes finding specific selectors in your editor difficult
