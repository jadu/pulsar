# Deployer prototypes

These are built in raw markup to hopefully make the transition to Vue simplier. Some repeative code has been moved into twig partials.

## SPA considerations

* On page change, the main title needs to be progratically focussed
* On page change, the <title> tag needs updating (each proto file has a unique title)
* Flash message containers need to be in the DOM before the actual flash message (see code examples in templates)

## Other points

* The location of <main> is different on the index page VS the other pages, this is due to the use of JS tabs
* Where a form as required fields and can be submitted (ignore html5 validation) then a form error summary must be shown, see example in index > new deployment modal
* These prototyes rely on pulsar JS, so we need to replicate some of the funcationality (modals, focus management, table detail pattern)
* Markup needs to match the prototypes, there are lots of accessibility considerations baked into these prototypes. For example, assosiated form input labels, use of aria and hidden accessible text etc.

## Tested in
* Mac VO
* JAWS
* NVDA
* Site Improve
* Axe
* WAVE

