---
layout: page
title: Tooltips
category: Components
---

Tooltips can be applied through the use of data-attributes and can be added to regular HTML elements, or to HTML/Form helpers.

{% code_example html_helpers/tooltip %}

<div class="pulsar-example form">
  <a href="#" data-toggle="tooltips" title="A wild tooltip appears!">Hover over me</a>
</div>

## Variations

Choose the most appropriate placement to fit your UI, try to avoid the tooltip from obscuring important things when it appears.

<div class="pulsar-example" style="height: 120px; padding-top: 40px; text-align: center;">
    <button type="button" class="btn btn-default" data-toggle="tooltips" data-placement="left" title="" data-original-title="Tooltip on left">Tooltip on left</button>&nbsp;<button type="button" class="btn btn-default" data-toggle="tooltips" data-placement="top" title="" data-original-title="Tooltip on top">Tooltip on top</button>&nbsp;<button type="button" class="btn btn-default" data-toggle="tooltips" data-placement="bottom" title="" data-original-title="Tooltip on bottom">Tooltip on bottom</button>&nbsp;<button type="button" class="btn btn-default" data-toggle="tooltips" data-placement="right" title="" data-original-title="Tooltip on right">Tooltip on right</button>
</div>

## Options

Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-` as in `data-animation=""`.

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
   <td>Insert HTML into the tooltip. If false, jQuery's <code>text</code> method will be used to insert content into the DOM. Use text if you're worried about XSS attacks.</td>
 </tr>
 <tr>
   <td>placement</td>
   <td>string | function</td>
   <td>'top'</td>
   <td>how to position the tooltip - top | bottom | left | right | auto. <br> When "auto" is specified, it will dynamically reorient the tooltip. For example, if placement is "auto left", the tooltip will display to the left when possible, otherwise it will display right.</td>
 </tr>
 <tr>
   <td>selector</td>
   <td>string</td>
   <td>false</td>
   <td>If a selector is provided, tooltip objects will be delegated to the specified targets.</td>
 </tr>
 <tr>
   <td>title</td>
   <td>string | function</td>
   <td>''</td>
   <td>default title value if <code>title</code> attribute isn't present</td>
 </tr>
 <tr>
   <td>trigger</td>
   <td>string</td>
   <td>'hover focus'</td>
   <td>
    <p>how tooltip is triggered - <code>click</code> | <code>hover</code> | <code>focus</code> | <code>manual</code>. You may pass multiple triggers; separate them with a space.</p>
    <p><code>manual</code> indicates that the tooltip will be triggered programmatically via the <code>.tooltip('show')</code>, <code>.tooltip('hide')</code> and <code>.tooltip('toggle')</code> methods; this value cannot be combined with any other trigger.</p>
    <p><code>hover</code> on its own will result in tooltips that cannot be triggered via the keyboard, and should only be used if alternative methods for conveying the same information for keyboard users is present.</p>
   
   </td>
 </tr>
 <tr>
   <td>delay</td>
   <td>number | object</td>
   <td>0</td>
   <td>
    <p>delay showing and hiding the tooltip (ms) - does not apply to manual trigger type</p>
    <p>If a number is supplied, delay is applied to both hide/show</p>
    <p>Object structure is: <code>delay: { show: 500, hide: 100 }</code></p>
   </td>
 </tr>
 <tr>
   <td>container</td>
   <td>string | false</td>
   <td>false</td>
   <td>
    <p>Appends the tooltip to a specific element. Example: <code>container: 'body'</code></p>
   </td>
 </tr>
</tbody>
</table>

## Disabled elements

Elements with the `disabled` parameter aren't interactive and cannot be focused, clicked or hovered which stops tooltips from working entirely. The only way around this which works for all our supported browsers is to wrap the button in a containing `<div>` or `<span>`, ideally made focuseable with `tabindex="0"`, and attach the tooltip to that element.

<p class="callout callout--info">
<code>pointer-events: none;</code> will automatically be applied to all <code>disabled</code> elements within a tooltip wrapper.
</p>

{% raw %}
```twig
<div rel="tooltip" data-toggle="tooltip" data-placement="right" title="Can't touch this" tabindex="0">
  {{ 
    html.button({
      'label': 'Disabled Button',
      'disabled', true
    })
  }}
</div>
```
{% endraw %}

<div class="pulsar-example">
  <div rel="tooltip" data-toggle="tooltips" data-placement="right" title="Can't touch this">
    <button class="btn" disabled>Disabled Button</button>
  </div>
</div>

## Accessibility

> Tooltips are popup messages typically triggered by moving a mouse over a control or widget causing a small popup window to appear with additional information about the control. For accessibility, the user should be able to activate tooltips using the keyboard. When a form control or widget receives keyboard focus, the tooltip popup should display. When the form control or widget loses focus, the tooltip should disappear.
> <cite><a href="https://www.w3.org/wiki/PF/ARIA/BestPractices/Tooltips">https://www.w3.org/wiki/PF/ARIA/BestPractices/Tooltips</a></cite>

Tooltips should only be used on elements that can normally be accessed/interacted by keyboard navigation. Although you can make any element focusable with the `tabindex="0"` attribute this would add potentially confusing tab stops on non-interactive elements for keyboard users and is not recommended (the exception to this is for wrappers around disabled elements, which mimics the previously available keyboard focus on disabled elements).

This example demonstrates how tooltips can be triggered when tabbing through a form:

<div class="pulsar-example form">
  <fieldset>
    <legend class="legend">Tab through this form to trigger tooltips</legend>
    <div class="form__group">
        <label for="inputText1" class="control__label">Text input</label>
        <div class="controls">
            <input id="inputText1" name="inputText1" type="text" class="form__control" data-toggle="tooltips" data-placement="right" title="Hello!">
        </div>
    </div>
    <div class="form__group">
        <label for="inputText2" class="control__label">Text input</label>
        <div class="controls">
            <input id="inputText2" name="inputText2" type="text" class="form__control" data-toggle="tooltips" data-placement="right" title="You look nice :)">
        </div>
    </div>
    <div class="form__group">
        <label for="inputText3" class="control__label">Text input</label>
        <div class="controls">
            <input id="inputText3" name="inputText3" type="text" class="form__control" data-toggle="tooltips" data-placement="right" title="Bye!">
        </div>
    </div>
  </fieldset>
</div>