---
layout: page
title: Status
category: HTML helpers
---

Displays a small visual indication of state; helpful when used within table cells or piano list keys to avoid the need for a user to check many items individually to determine their state.

Status indicators should ideally have some text which indicates their context. For example, they could be sat next to a text label called 'Active', or within a table column entitled 'Online'. Try not to rely on this indicator alone.

<p data-height="200" data-theme-id="24005" data-slug-hash="mPrvqZ" data-default-tab="result" data-user="pulsar" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/mPrvqZ/">docs - status indicators</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Accessibility

You may notice 'offline' uses a square instead of a circle, this is to visually distinguish it from the green 'online' status for red/green colourblind users as colour alone isn't a reliable indicator of status. The title attribute is also added which is displayed on hover and for screen readers.

> ...ensure that all users can access information that is conveyed by color differences, that is, by the use of color where each color has a meaning assigned to it. If the information is conveyed through color differences in an image (or other non-text format), the color may not be seen by users with color deficiencies. In this case, providing the information conveyed with color through another visual means ensures users who cannot see color can still perceive the information.

_[WCAG 2.0 Guideline 1.4.1](http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html)_

<img class="image--inline" src="/assets/images/status-col1.png" /><img class="image--inline" src="/assets/images/status-col2.png" /><img class="image--inline" src="/assets/images/status-col3.png" /><img class="image--inline" src="/assets/images/status-col5.png" />

_Example of how status indicators are viewed with different types of colour blindness_

## Example usage

{% raw %}
```twig
{{ html.status('online') }}
```
{% endraw %}

The 'state' will be used for both the title attribute, and for the stateful
class name, eg:

```html
<span class="status is-online" title="online"></span>
```

### States

 * online _(default)_
 * offline
 * active
 * inactive

Some states are simply synonyms of each other, the choice of verb will be
defined by the context in which it is to be used.

## Options

Option | Type   | Description
------ | ------ | --------------------------------------------------------------
class  | string | CSS classes, space separated
id     | string | A unique identifier, if required
title  | string | Title attribute, defaults to 'state' if not supplied. Will be displayed as a [tooltip](tooltips.md)
data-* | string | Data attributes, eg: `'data-foo': 'bar'`

