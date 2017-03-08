---
layout: page
title: Popovers
category: Components
---

Add small overlays of content for super concise functions or toggle-able options.

Examples:

As raw HTML:

```html
<a
    href="#"
    class="btn"
    data-toggle="popover"
    data-content="This is the popover content. It can (optionally) contain <strong><u>HTML</u></strong>"
    data-title="Popover Title"
    data-html="true">Click to toggle popover</a>
```

Or as helper parameters:

{% raw %}
```twig
{{
    html.link({
        'href': '#',
        'label': 'Click to toggle popover',
        'data-toggle': 'popover',
        'data-title': 'Popover Title',
        'data-content': 'This is the popover content. It can (optionally) contain <strong><u>HTML</u></strong>',
        'data-html': true
    })
}}
```
{% endraw %}

<p data-height="165" data-theme-id="24005" data-slug-hash="QKKgjK" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/QKKgjK/">docs - form - popover</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

<div class="alert alert-info" role="alert">
 <h5><i class="fa fa-info-circle"></i> Popovers on disabled elements require wrapper elements</h5>
 <p>To add a popover to a disabled or <code>.disabled</code> element, put the element inside of a <code>&lt;div&gt;</code> and apply the popover to that <code>&lt;div&gt;</code> instead.</p>
</div>

## Options

Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-`, as in `data-animation=""`.

<table>
    <thead>
        <tr>
            <th style="width: 100px;">Name</th>
            <th style="width: 100px;">type</th>
            <th style="width: 50px;">default</th>
            <th>description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>animation</td>
            <td>boolean</td>
            <td>true</td>
            <td>apply a CSS fade transition to the tooltip</td>
        </tr>
        <tr>
            <td>html</td>
            <td>boolean</td>
            <td>false</td>
            <td>Insert HTML into the popover. If false, jQuery's <code>text</code> method will be used to insert content into the DOM. Use text if you're worried about XSS attacks.</td>
        </tr>
        <tr>
            <td>placement</td>
            <td>string | function</td>
            <td>'right'</td>
            <td>how to position the popover - top | bottom | left | right | auto.<br> When "auto" is specified, it will dynamically reorient the popover. For example, if placement is "auto left", the tooltip will display to the left when possible, otherwise it will display right.</td>
        </tr>
        <tr>
            <td>selector</td>
            <td>string</td>
            <td>false</td>
            <td>if a selector is provided, tooltip objects will be delegated to the specified targets if a selector is provided, tooltip objects will be delegated to the specified targets. in practice, this is used to enable dynamic HTML content to have popovers added. See <a href="https://github.com/twbs/bootstrap/issues/4215">this</a> and <a href="http://jsfiddle.net/KPeKS/4/">an informative example</a>.</td>
        </tr>
        <tr>
            <td>trigger</td>
            <td>string</td>
            <td>'click'</td>
            <td>how popover is triggered - click | hover | focus | manual</td>
        </tr>
        <tr>
            <td>title</td>
            <td>string | function</td>
            <td>''</td>
            <td>default title value if <code>title</code> attribute isn't present</td>
        </tr>
        <tr>
            <td>content</td>
            <td>string | function</td>
            <td>''</td>
            <td>default content value if <code>data-content</code> attribute isn't present</td>
        </tr>
        <tr>
            <td>delay</td>
            <td>number | object</td>
            <td>0</td>
            <td>
             <p>delay showing and hiding the popover (ms) - does not apply to manual trigger type</p>
             <p>If a number is supplied, delay is applied to both hide/show</p>
             <p>Object structure is: <code>delay: { show: 500, hide: 100 }</code></p>
            </td>
        </tr>
        <tr>
            <td>container</td>
            <td>string | false</td>
            <td>false</td>
            <td>
             <p>Appends the popover to a specific element. Example: <code>container: 'body'</code>. This option is particularly useful in that it allows you to position the popover in the flow of the document near the triggering element -&nbsp;which will prevent the popover from floating away from the triggering element during a window resize.</p>
            </td>
        </tr>
    </tbody>
</table>

## Clickovers

Clickover is a variation of popovers where the popover will be closed when the user clicks anywhere else on the page (popovers require the same toggle to be clicked). To use a popover instead of a clickover, use the `rel="clickover"` attribute instead of `data-toggle="popover"`.

{% raw %}
```twig
{{
    html.link({
        'href': '#',
        'label': 'Click to toggle clickover',
        'rel': 'clickover',
        'data-content': 'I am a clickover'
    })
}}
```
{% endraw %}
