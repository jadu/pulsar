---
layout: page
title: Forms Styleguide
---

Pulsar form helpers provide all the necessary markup and styling required to build a responsive, robust form layout. All helpers provide a set of common options allowing you to provide useful labels, placeholders and guidance popovers or indicate whether fields are required or in an error state.

## Accessibility

Pulsar form helpers are designed to make building accessible forms as easy as possible, however there are a few things you will need to consider and test for.

### How to test

Use the WebAim [Web Accessibility Evaluation Tool's Chrome extension](http://wave.webaim.org/extension/) (WAVE) to view your UIs and resolve any 'red flag' errors as part of your normal testing process. You should spend some time [familiarising yourself](http://wave.webaim.org/help) with the WAVE tool and the types of errors it will highlight. Remember, the absence of errors does not necessarily indicate that a given UI is accessible, but it will help catch accessibility errors that break WCAG 2.0 AA compliance.

### Use IDs in form helpers

If you're using form helpers, you *must* supply an `id` attribute. Pulsar's form helpers will automatically link both the label and the input so that screenreaders will correctly announce the elements.

### Labelling standalone inputs

There may be times when a design calls for an input without an explicit label next to it, but can still be labelled by another element, such as a table heading column label.

To do this, the element acting as the label must have an `id`, we recommend namespacing IDs used only for labels as `id="aria-something"` so that other developers will understand that this ID exists for accessibility reasons. No styles or javascript behaviour should be hooked into `aria-` namespaced IDs.

###### Example

{% raw %}
```twig
<table>
    <thead>
        <tr>
            <th id="aria-foo">Select</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                {{
                    form.checkbox({
                        'id': 'foo',
                        'aria-labelledby': 'aria-foo'
                    })
                }}
            </td>
        </tr>
    </tbody>
</table>
```
{% endraw %}

## Validation states

All form helpers can be styled with the validation state classes through the `class` option. The helpers will style their labels and help text appropriately. For error states, you should use the `error` option of the form helper to also pass an error message to the field.

##### Error

Highlight fields that contain invalid values which will need resolving before a form can be successully submitted. This class is automatically set when using a form helper's `error` option.

```css
.has-error
```

<p data-height="220" data-theme-id="24005" data-slug-hash="dppvzp" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/dppvzp/">docs - form - text error states</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

##### Success

Show that a field has the expected value, or that it has been saved/updated successfully.

```css
.has-success
```

<p data-height="80" data-theme-id="24005" data-slug-hash="ZppZJN" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ZppZJN/">docs - form - text success</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

##### Warning

Use to highlight non-critical issues with form data, such as a textarea containing too many characters than we'd recommend.

```css
.has-warning
```

<p data-height="80" data-theme-id="24005" data-slug-hash="ZppZXN" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ZppZXN/">docs - form - text warning</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

##### Changed

Use to visually highlight when a field value may have changed. Particularly important if a user updating one field causes another field to change.

```css
.has-changed
```

<p data-height="80" data-theme-id="24005" data-slug-hash="RGGpLV" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/RGGpLV/">docs - form - text changed</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Placeholders

A hint to the user of what can be entered in the control.

Do not use the placeholder attribute instead of a `<label>` element. Their purposes are different: the `<label>` attribute describes the role of the form element; that is, it indicates what kind of information is expected, the placeholder attribute is a hint about the format the content should take. There are cases in which the placeholder attribute is never displayed to the user, so the form must be understandable without it.

Placeholders should:

* Not have a full stop at the end

{% raw %}
```twig
{{
    form.text({
        'label': 'National Insurance Nō',
        'id': 'text-example-1',
        'placeholder': 'AB 12 34 56 C'
    })
}}
```
{% endraw %}

<p data-height="80" data-theme-id="24005" data-slug-hash="EgyNQo" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/EgyNQo/">docs - form - text placeholder</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Help text

It's almost always preferable to use `help` instead of placeholders, as these aren't hidden as soon as the input has focus.

Help text should:

* Use sentence case
* Not have a full stop at the end

{% raw %}
```twig
{{
    form.text({
        'label': 'National Insurance Nō',
        'id': 'text-example-2',
        'help': 'You can find this on your payslip. For example, AB 12 34 56 C'
    })
}}
```
{% endraw %}

<p data-height="110" data-theme-id="24005" data-slug-hash="WGxozA" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/WGxozA/">docs - form - text help</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Guidance

Provide extra information to help a user understand a form field. Guidance is only shown when the user clicks or taps on the question mark symbol so should not be used to contain critical information where `help` would be more appropriate.

{% raw %}
```twig
{{
    form.text({
        'label': 'Keywords',
        'id': 'foo',
        'guidance': 'Keywords aren’t used by most search engines and using too many can harm your site’s position in their rankings'
    })
}}
```
{% endraw %}

<p data-height="200" data-theme-id="24005" data-slug-hash="QKEpKk" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/QKEpKk/">docs - form - text guidance</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Input widths

Modify your input widths to suit your expected inputs, if you only want two digits there’s no point using a full width field.

The following width classes are available:

```scss
form__group--mini
form__group--small
form__group--medium
form__group--regular
form__group--large
form__group--xlarge
form__group--full
```

Passing a width via the form helper's `class` attribute will apply it to the form group. For example, applying `form__group--full`:

```html
<div class="form__group form__group--full">
    <label class="control__label">Label</label>
    <div class="controls">
        <input id="foo" name="foo" type="text" class="form__control">
    </div>
</div>
```

If you require more fine-grained control you can apply the same width classes to specific form controls.

```scss
form__control--mini
form__control--small
form__control--medium
form__control--regular
form__control--large
form__control--xlarge
form__control--full
```

```html
<div class="form__group">
    <label class="control__label">Label</label>
    <div class="controls">
        <input id="foo" name="foo" type="text" class="form__control form__control--full">
    </div>
</div>
```

### Width Examples

```twig
{ 'class': 'form__group--mini' }
```

<div><p data-height="110" data-theme-id="24005" data-slug-hash="zKAOEJ" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/zKAOEJ/">docs - form - text mini</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>


```twig
{ 'class': 'form__group--small' }
```

<div><p data-height="110" data-theme-id="24005" data-slug-hash="ALEAxg" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ALEAxg/">docs - form - text small</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>


```twig
{ 'class': 'form__group--medium' }
```

<div><p data-height="110" data-theme-id="24005" data-slug-hash="WGAZrO" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/WGAZrO/">docs - form - text medium</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>


```twig
{ 'class': 'form__group--regular' }
```

<div><p data-height="110" data-theme-id="24005" data-slug-hash="ZpQzAR" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ZpQzAR/">docs - form - text regular</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

```twig
{ 'class': 'form__group--large' }
```

<div><p data-height="110" data-theme-id="24005" data-slug-hash="RGAbrP" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/RGAbrP/">docs - form - text large</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>


```twig
{ 'class': 'form__group--full' }
```

<div><p data-height="110" data-theme-id="24005" data-slug-hash="amdoGX" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/amdoGX/">docs - form - text full</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Label alignment

The default style of forms is to have the label next to the input however there are a couple of alternatives which might work better, depending on your form’s needs.

### Top label

```twig
{ 'class': 'form__group--top' }
```

<div><p data-height="190" data-theme-id="24005" data-slug-hash="ALEAJJ" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/ALEAJJ/">docs - form - top label</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

### Flush top label

```twig
{ 'class': 'form__group--top form__group--flush' }
```

<div><p data-height="190" data-theme-id="24005" data-slug-hash="PGkYxb" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/PGkYxb/">docs - form - top label flush</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Indented elements

Often you will need to use elements other than full form inputs which you to be aligned with the other form inputs. Use the indent class to arrange these, either on a single element or on a wrapper element.

```twig
{ 'class': 'form__indent' }
```

<div><p data-height="100" data-theme-id="24005" data-slug-hash="wzrrZb" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/wzrrZb/">docs - form - indented button</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Regular HTML elements

<div><p data-height="440" data-theme-id="24005" data-slug-hash="PGkkKV" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/PGkkKV/">docs - form - regular elements</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script></div>

## Appended and Prepend inputs

Inputs can be prepended and appended with icons, text or buttons to provide additional visual hints or context to a field.

The following options are available to almost all form helpers.

Option       | Type   | Description
------------ | ------ | ---------------------------------------------------------
append       | string | Text or markup to include after the input element
append_type  | string | Use only when appending a button. `button` is the only valid value
prepend      | string | Text or markup to include before the input element
prepend_type | string | Use only when prepending a button. `button` is the only valid value

{% raw %}
```twig
{{
    form.text({
        'label': 'Amount',
        'prepend': '£'
    })
}}
```
{% endraw %}

<p data-height="388" data-theme-id="24005" data-slug-hash="xEGakp" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/xEGakp/">Appended and prepended icons and text </a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Whilst buttons can be used to link an input to a related action:

{% raw %}
```twig
{{
    form.text({
        'label': 'Postcode',
        'placeholder': 'For example, LE19 1RJ',
        'append': html.button({ 'label': 'Find' })
    })
}}
```
{% endraw %}

<p data-height="88" data-theme-id="24005" data-slug-hash="JRdaYr" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/JRdaYr/">Appended and prepended buttons - postcode example</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Like icons and text, buttons can be appended, prepended or both:

<p data-height="243" data-theme-id="24005" data-slug-hash="kkWjoY" data-default-tab="result" data-user="pulsar" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/kkWjoY/">Appended and prepended buttons</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>
