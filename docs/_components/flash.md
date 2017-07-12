---
layout: page
title: Flash messages
category: Components
---

Flash messages alert the user when things happen, this may be to confirm that something has occurred successfully, like saving a document, or when something goes wrong. Flash messages may also highlight problems with the system that the user may need to know about, like a loss of network connectivity which is preventing auto-save.

## Dependencies 

##### Javascript

You will need the `FlashMessageComponent` to be included in your browserify configuration.

Depending on your setup, this will probably need to be in be in a file called `index.js` or `main.js`.

```javascript
// index.js

var FlashMessageComponent = require('/path/to/pulsar/FlashMessageComponent');

module.exports = {
    FlashMessageComponent: FlashMessageComponent
}
```

```javascript
// main.js

var $html = $('html');

pulsar.flash = new pulsar.FlashMessageComponent($html);

$(function () {
    pulsar.flash.init();
});

// Example usage: pulsar.flash.success('Ermahgherd!');
```

##### HTML/Twig

Your main view should have a container with the classes of `flash-container js-flash-container`. Any flash messages you choose to generate on page load should be placed here, and any that you subsequently create through the JS methods will also be placed here.

{% raw %}
```twig
<div class="flash-container js-flash-container">
{{ 
    flash.message({
        'message': 'You did something right!',
        'type': 'success'
    }) 
}}
</div>
```
{% endraw %}

<p data-height="80" data-theme-id="24005" data-slug-hash="wzzJXX" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/wzzJXX/">docs - component - flash success</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Options

Option      | Type   | Description
----------- | ------ | --------------------------------------------------------------
dismissable | bool   | If false, will hide the dismiss (x) icon (default: `true`) 
message     | string | The text to display, can contain HTML/Twig helpers
type        | string | The style of message to display `success`, `warning`, `error`, `info`

## Variations

{% raw %}
```twig
{{ 
    flash.message({
        'message': 'This is a success message',
        'type': 'success'
    }) 
}}
```
{% endraw %}

<p data-height="80" data-theme-id="24005" data-slug-hash="wzzJXX" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/wzzJXX/">docs - component - flash success</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

{% raw %}
```twig
{{ 
    flash.message({
        'message': 'This is a warning message',
        'type': 'warning'
    }) 
}}
```
{% endraw %}

<p data-height="80" data-theme-id="24005" data-slug-hash="VKKpBp" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/VKKpBp/">docs - component - flash warning</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

{% raw %}
```twig
{{ 
    flash.message({
        'message': 'This is an error message',
        'type': 'error'
    }) 
}}
```
{% endraw %}

<p data-height="80" data-theme-id="24005" data-slug-hash="RGGpYL" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/RGGpYL/">docs - component - flash error</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

{% raw %}
```twig
{{ 
    flash.message({
        'message': 'This is an info message',
        'type': 'info'
    }) 
}}
```
{% endraw %}

<p data-height="80" data-theme-id="24005" data-slug-hash="ammJRd" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ammJRd/">docs - component - flash success</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Icons

These are set by the flash message handler and can’t be overridden.

## Remove dismiss icon

If you want to disable the ability to close a flash message (useful when you have flash messages in modals, for example), use the `dismissable` option.

```json
{
    'dismissable': false
}
```

<p data-height="80" data-theme-id="24005" data-slug-hash="wzzJQx" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/wzzJQx/">docs - component - flash not dismissable</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Triggering with Javascript

You can throw Flash messages with JS, and like the Twig helper your styles and icons will be defined automatically. 

```javascript
pulsar.flash.success('Something great happened!');
```

```javascript
pulsar.flash.error('Oh no! Something bad happened');
```

```javascript
pulsar.flash.warning('Something kinda bad happened, but it’s not critical...');
```

```javascript
pulsar.flash.info('Something interesting happened that we need to tell you about');
```
