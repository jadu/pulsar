---
layout: page
title: State Styleguide
---

Actions which **modify** a state should (principally) be verbs:

<p data-height="145" data-theme-id="19151" data-slug-hash="MajaBa" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/MajaBa/'>MajaBa</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Labels which **indicate** the state should be past-participles or adjectives:

<p data-height="120" data-theme-id="19151" data-slug-hash="Kdgdbw" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/Kdgdbw/'>docs - state - labels</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Use the most appropriate mix of verbs/adjectives to describe a related action or state. In the example above for the 'Unpublish' action, 'offline' is a better adjective to use than 'unpublished'.

Pulsar has a collection of common state classes, many components (like buttons, labels, badges etc) cater for these states, eg: `.btn--primary`, `.btn--success` etc.

* primary
* success
* warning
* danger
* info
* inverse

## State variables Sass map

There is a Sass map defined in `_palette.base.scss` which contains the state colours, along with their text-colour alternates, it's handy to loop over the map to output repetitive rulesets that cover all states.

```sass
@each $state, $state-color, $state-color-alt in $state-colors {
    .example--#{$state} {
        background-color: $state-color;
        color: $state-color-alt;
    }
}
```

## Colour

Colour should be used where possible to reinforce the action or state that you are presenting to the user. The text label is the key component here, colour should never be solely relied upon.

<label class="label">grey</label> indicates benign, or neutral actions/states
<label class="label label--primary">blue</label> indicates the primary action for a given screen, should be used sparingly, ideally once per UI
<label class="label label--success">green</label> indicates positive actions/states
<label class="label label--danger">red</label> indicates negative or destructive actions/states
<label class="label label--inverse">black</label> indicates blocking or restrictive actions/states

## Icons

When using iconography there may be the opportunity to use different icons to reflect the state and action; They may often appear together in the same interface.

<p data-height="79" data-theme-id="19151" data-slug-hash="PPGPBx" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/PPGPBx/'>docs - state - labels</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Communicating state changes

As an interface may consist of multiple tabs, deck slides and modals it's important to communicate changes as the user transitions in and out of these different interfaces. Light blue is used instead of green to highlight that while something has changed, those changes haven't been saved yet. These highlights will fade away after a few seconds.

In this example, the user has clicked the 'Add Item' and been presented with a dialog where they have picked an item, they have just been returned to this view where the originating form element has been highlighted to show which element they have just updated. The colour is matched in the information alert message at the top.

## State classes

When your styles need to switch based on state you should use these common `is-` or `has-` namespaced classes. When writing your own components you should try to stick to this convention to modify or communicate state.

Avoid hooking javascript behaviour to these classes, use `js-` namespaced classes instead, it's ok to have multiple classes, one for style and one for behaviour eg: `class="is-open js-open"`.

* `is-open`
* `is-closed`
* `is-active`
* `is-disabled`


* `has-success`
* `has-warning`
* `has-error`
* `has-changed`

As a general rule, the `has-` classes will apply a lighter version of the related state colour as the background colour of the element. Depending on the UI component, it may have other effects too.

You can also make this colour fade to white after 5 seconds by adding the `fade` class.

Regular text can also use the main state classes, using the colours defined in the palette. You can also extend these with the Sass `%` placeholder.

* `text--primary`
* `text--success`
* `text--warning`
* `text--danger`
* `text--info`
* `text--inverse`
* `text--white`
* `text--new`

##### Example

```html
<div class="has-success fade">example</div>
```
