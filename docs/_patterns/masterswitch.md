---
layout: page
title: Masterswitch
category: Patterns
---

The masterswitch pattern allows you to enable and disable a larger UI with a single control. Commonly used in 'settings' interfaces it provides an easy to understand on/off switch for users.

![disabled masterswitch]({{ site.baseurl }}/assets/image_examples/masterswitch.png)

The masterswitch pattern allows you to show the user the UI which they will be expected to complete before they throw the switch.

## Dependencies

##### Javascript

You will need the `MasterSwitchComponent` to be included in your browserify configuration.

Depending on your setup, this will probably need to be in a file called `index.js` or `main.js`.

```javascript
// index.js

var MasterSwitchComponent = require('/path/to/pulsar/MasterSwitchComponent');

module.exports = {
    MasterSwitchComponent: MasterSwitchComponent
}
```

```javascript
// main.js

var $html = $('html');

pulsar.masterSwitch = new pulsar.MasterSwitchComponent($html);

$(function () {
    pulsar.masterSwitch.init();
});
```

##### Twig

[The masterswitch control uses the form.toggle_switch](toggle_switch.md) helper, you will need to include the form helpers in your view (though they're probably included by the main template anyway).

{% raw %}
```twig
{% import '@path/to/pulsar/v2/helpers/form.html.twig' as form %}
```
{% endraw %}

## Markup example

There should only be one masterswitch within a given UI, although there could be multiple masterswitches on different tabs.

{% raw %}
```twig
<div class="masterswitch">
    {{
        form.toggle_switch({
            'class': 'masterswitch-control',
            'label': 'Your label',
            'id': 'toggletest'
        })
    }}

    <hr />

    <section class="masterswitch-content is-disabled">
        <!-- your content here -->
    </section>
</div>
```
{% endraw %}

<p data-height="160" data-theme-id="24005" data-slug-hash="KggXZd" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/KggXZd/">docs -layout - masterswitch</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Setting initial state

You can tell the UI to be enabled or disabled on page load by setting the `checked` attribute on the [form.toggle_switch](toggle_switch.md) input. This will affect both the masterswitch control and the masterswitch content.

##### Load with the masterswitch UI enabled

{% raw %}
```twig
{{
    form.toggle_switch({
        'checked': true,
        'class': 'masterswitch-control',
        'label': 'Your label',
        'id': 'toggletest'
    })
}}
```
{% endraw %}

##### Load with the masterswitch UI disabled

{% raw %}
```twig
{{
    form.toggle_switch({
        'class': 'masterswitch-control',
        'label': 'Your label',
        'id': 'toggletest'
    })
}}
```
{% endraw %}

## Switching on

Toggling the masterswitch will enable any interactive elements (like form fields and links) within the related masterswitch content block. The majority of time this will be by the user clicking the masterswitch control.

## Switching off

Switching off the masterswitch should immediately disable the relevant settings for the user without the need for a page refresh or clicking a confirmation button.

Any inputs inside the `masterswitch-content` should not be cleared, it should be possible for a user to restore their original settings by switching the masterswitch back on.

Clickable elements inside `masterswitch-content` should be disabled when the masterswitch is switched off, a user should not be able to interact with the disabled UI.

There may be situations where you require the user to confirm their choice to switch off a masterswitch, an example is the two-step verification UI where we need to warn the user that this will make their account less secure, and prompts them to re-enter their password and verification code.
