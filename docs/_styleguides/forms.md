---
layout: page
title: Forms Styleguide
---

Pulsar form helpers provide all the necessary markup and styling required to build a responsive, robust form layout. All helpers provide a set of common options allowing you to provide useful labels, placeholders and guidance popovers or indicate whether fields are required or in an error state.

<p class="callout callout--danger">
All user interfaces within the Continuum platform *must* meet WCAG 2.0 compliance.
</p>

## Accessibility & WCAG Compliance

Pulsar form helpers are designed to make building accessible forms as easy as possible, however there are a few things you will need to consider and test for.

### How to test

Use the WebAim [Web Accessibility Evaluation Tool's Chrome extension](http://wave.webaim.org/extension/) (WAVE) to view your UIs and resolve any 'red flag' errors as part of your normal testing process. You should spend some time [familiarising yourself](http://wave.webaim.org/help) with the WAVE tool and the types of errors it will highlight. Remember, the absence of errors does not necessarily indicate that a given UI is accessible, but it will help catch accessibility errors that break WCAG 2.0 AA compliance.

<figure>
<img src="{{ site.baseurl }}/assets/image_examples/wave-tool.png" alt="Screenshot of the WAVE tool in Chrome">
<figcaption>The WAVE tool will highlight the number of errors (in red) which need to be resolved.</figcaption>
</figure>

### Use IDs in form helpers

If you're using form helpers, you *must* supply an `id` attribute. Pulsar's form helpers will automatically link both the label and the input so that screenreaders will correctly announce the elements.

{% code_example form_helpers/text %}

## Labelling standalone inputs

There may be times when a design calls for an input without an explicit label next to it, but there are a couple of methods you can use to label the inputs. You should use one of the following strategies to avoid an error in WAVE.

### Hidden label

Form helpers can use hidden labels which will be ready by screenreaders but not visible in the UI. For helpers, use the `'show-label': false` option to visually hide them.

{% code_example styleguides/hidden-label %}

### aria-labelledby

If another visible element on the page can be used to label the input, like a 
The input can then use the `aria-labelledby` attribute to specify the element you're using as a label.

To do this, the element acting as the label must have an `id`, we recommend namespacing IDs used only for labels as `id="aria-something"` so that other developers will understand that this ID exists for accessibility reasons. No styles or javascript behaviour should be hooked into `aria-` namespaced IDs.

{% code_example styleguides/aria-labelledby %}

### aria-label

You can specify a label directly on the input with the `aria-label` attribute, this should be used only when a visible label is not present, or cannot be created.

{% code_example styleguides/aria-label %}

## Validation states

All form helpers can be styled with the validation state classes through the `class` option. The helpers will style their labels and help text appropriately. For error states, you should use the `error` option of the form helper to also pass an error message to the field.

##### Error

Highlight fields that contain invalid values which will need resolving before a form can be successully submitted. This class is automatically set when using a form helper's `error` option.

```css
.has-error
```
<div class="pulsar-example form">
    <div class="form__group has-error">
        <label for="inputText" class="control__label">Text input</label>
        <div class="controls">
            <input id="inputText" name="inputText" type="text" class="form__control">
        </div>
    </div>

    <div class="form__group has-error">
        <label for="inputText" class="control__label">Text input</label>
        <div class="controls">
            <input id="inputText" name="inputText" type="text" class="form__control">
            <span class="help-block is-error"><i class="icon-warning-sign"></i> Helpful error message</span>
        </div>
    </div>
</div>

##### Success

Show that a field has the expected value, or that it has been saved/updated successfully.

```css
.has-success
```

<div class="pulsar-example form">
    <div class="form__group has-success">
        <label for="inputText" class="control__label">Text input</label>
        <div class="controls">
            <input id="inputText" name="inputText" type="text" class="form__control">
        </div>
    </div>
</div>

##### Warning

Use to highlight non-critical issues with form data, such as a textarea containing too many characters than we'd recommend.

```css
.has-warning
```

<div class="pulsar-example form">
    <div class="form__group has-warning">
        <label for="inputText" class="control__label">Text input</label>
        <div class="controls">
            <input id="inputText" name="inputText" type="text" class="form__control">
        </div>
    </div>
</div>

##### Changed

Use to visually highlight when a field value may have changed. Particularly important if a user updating one field causes another field to change.

```css
.has-changed
```

<div class="pulsar-example form">
    <div class="form__group has-changed">
        <label for="inputText" class="control__label">Text input</label>
        <div class="controls">
            <input id="inputText" name="inputText" type="text" class="form__control">
        </div>
    </div>
</div>

## Placeholders

A hint to the user of what can be entered in the control.

Do not use the placeholder attribute instead of a `<label>` element. Their purposes are different: the `<label>` attribute describes the role of the form element; that is, it indicates what kind of information is expected, the placeholder attribute is a hint about the format the content should take. There are cases in which the placeholder attribute is never displayed to the user, so the form must be understandable without it.

Placeholders should:

* Not have a full stop at the end (unless part of the expected input)

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

<div class="pulsar-example form">
    <div class="form__group">
        <label for="text-example-1" class="control__label">National Insurance Nō</label>
        <div class="controls">
            <input id="text-example-1" placeholder="AB 12 34 56 C" type="text" class="form__control">
        </div>
    </div>
</div>

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

<div class="pulsar-example form">
    <div class="form__group form__group--medium">
        <label for="text-example-2" class="control__label">National Insurance Nō</label>
        <div class="controls">
            <input id="text-example-2" type="text" class="form__control">
            <span class="help-block">You can find this on your payslip. For example, AB 12 34 56 C</span>
        </div>
    </div>
</div>

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

<div class="pulsar-example form">
    <div class="form__group" data-toggle="tooltips" title="" data-original-title="">
        <label for="inputText" class="control__label">Text input <i data-container="body" data-content="Keywords aren’t used by most search engines and using too many can harm your site’s position in their rankings" data-placement="bottom" data-toggle="popover" class="icon-question-sign input-group-guidance" data-original-title="" title=""></i></label>
        <div class="controls">
            <input id="inputText" name="inputText" type="text" class="form__control">
        </div>
    </div>
</div>

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

<div class="pulsar-example form">
    <div class="form__group form__group--mini">
        <label class="control__label">Mini</label>
        <div class="controls">
            <input id="inputText" name="inputText" type="text" class="form__control">
        </div>
    </div>
</div>

```twig
{ 'class': 'form__group--small' }
```

<div class="pulsar-example form">
    <div class="form__group form__group--small">
        <label class="control__label">Small</label>
        <div class="controls">
            <input id="inputText" name="inputText" type="text" class="form__control">
        </div>
    </div>
</div>

```twig
{ 'class': 'form__group--medium' }
```

<div class="pulsar-example form">
    <div class="form__group form__group--medium">
        <label class="control__label">Medium</label>
        <div class="controls">
            <input id="inputText" name="inputText" type="text" class="form__control">
        </div>
    </div>
</div>


```twig
{ 'class': 'form__group--regular' }
```

<div class="pulsar-example form">
    <div class="form__group">
        <label class="control__label">Regular</label>
        <div class="controls">
            <input id="inputText" name="inputText" type="text" class="form__control">
        </div>
    </div>
</div>

```twig
{ 'class': 'form__group--large' }
```

<div class="pulsar-example form">
    <div class="form__group form__group--large">
        <label class="control__label">Large</label>
        <div class="controls">
            <input id="inputText" name="inputText" type="text" class="form__control">
        </div>
    </div>
</div>


```twig
{ 'class': 'form__group--full' }
```

<div class="pulsar-example form">
    <div class="form__group form__group--full">
        <label class="control__label">Full</label>
        <div class="controls">
            <input id="inputText" name="inputText" type="text" class="form__control">
        </div>
    </div>
</div>

## Label alignment

The default style of forms is to have the label next to the input however there are a couple of alternatives which might work better, depending on your form’s needs.

### Top label

```twig
{ 'class': 'form__group--top' }
```

<div class="pulsar-example form">
    <div class="form__group form__group--top">
        <label class="control__label">Long label that we want to put on its own line for whatever reason</label>
        <div class="controls">
            <input placeholder="Placeholder" type="text" class="form__control">
            <p class="help-block">Example block-level help text here.</p>
        </div>
    </div>
</div>

### Flush top label

```twig
{ 'class': 'form__group--top form__group--flush' }
```

<div class="pulsar-example form">
    <div class="form__group form__group--top form__group--flush">
        <label class="control__label">The same as above, but this time we also add the .form__group--flush class to keep everything on the left edge</label>
        <div class="controls">
            <input placeholder="Placeholder" type="text" class="form__control">
            <p class="help-block">Example block-level help text here.</p>
        </div>
    </div>
</div>

## Indented elements

Often you will need to use elements other than full form inputs which you to be aligned with the other form inputs. Use the indent class to arrange these, either on a single element or on a wrapper element.

```twig
{ 'class': 'form__indent' }
```

<div class="pulsar-example form">
    <button class="btn form__indent">This Button Has No Form Label</button>
</div>

## Regular HTML elements

<div class="pulsar-example form">

    <p>This is a plain ol’ paragraph and a couple of lists, their left edge should be on the far left.</p>

    <ul>
        <li>Unordered List</li>
        <li>Unordered List</li>
    </ul>

    <ol>
        <li>Unordered List</li>
        <li>Unordered List</li>
    </ol>

    <div class="form__indent">
        <p>This is the same plain ol’ paragraph, but now we're wrapped in a <code>form__indent</code> class which should make our left edge match the form controls.</p>
        <ul>
            <li>Unordered List</li>
            <li>Unordered List</li>
        </ul>
        <ol>
            <li>Unordered List</li>
            <li>Unordered List</li>
        </ol>
    </div>
</div>

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

<div class="pulsar-example form">

    <div class="form__group">
        <label for="inputPrepend" class="control__label">Prepended input with icon</label>
        <div class="controls">
            <div class="input-group">
                <span class="input-group-addon"><i class="icon-envelope-o"></i></span>
                <input id="inputPrepend" name="inputPrepend" placeholder="Email address" type="text" class="form__control">
            </div>
        </div>
    </div>

    <div class="form__group">
        <label for="inputPrepend" class="control__label">Appended input with icon</label>
        <div class="controls">
            <div class="input-group">
                <input id="inputPrepend" name="inputPrepend" placeholder="Telephone number" type="text" class="form__control">
                <span class="input-group-addon"><i class="icon-phone"></i></span>
            </div>
        </div>
    </div>

    <div class="form__group">
        <label for="inputAppend" class="control__label">Appended input with text</label>
        <div class="controls">
            <div class="input-group">
                <input id="inputAppend" name="inputAppend" placeholder="Placeholder" type="text" class="form__control">
                <span class="input-group-addon">.com</span>
            </div>
        </div>
    </div>

    <div class="form__group">
        <label for="inputPrependAppend" class="control__label">Prepended &amp; Appended with text</label>
        <div class="controls">
            <div class="input-group">
                <span class="input-group-addon">www.</span>
                <input id="inputPrependAppend" name="inputPrependAppend" placeholder="Placeholder" type="text" class="form__control">
                <span class="input-group-addon">.com</span>
            </div>
        </div>
    </div>
</div>

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

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputPrependAppend" class="control__label">Postcode</label>
        <div class="controls">
            <div class="input-group has-btn-appended">
                <input id="inputPrependAppend" name="inputAppend" placeholder="For example, LE19 1RJ" type="text" class="form__control">
                <span class="input-group-btn">
                    <button class="btn">Find</button>
                </span>
            </div>
        </div>
    </div>
</div>

Like icons and text, buttons can be appended, prepended or both:

<div class="pulsar-example form">
    <div class="form__group">
        <label for="inputPrependAppend" class="control__label">Prepended button</label>
        <div class="controls">
            <div class="input-group has-btn-prepended">
                <span class="input-group-btn">
                    <button class="btn">Button</button>
                </span>
                <input id="inputPrependAppend" name="inputPrepended" placeholder="Placeholder" type="text" class="form__control">
            </div>
        </div>
    </div>

    <div class="form__group">
        <label for="inputPrependAppend" class="control__label">Appended button</label>
        <div class="controls">
            <div class="input-group has-btn-appended">
                <input id="inputPrependAppend" name="inputAppend" placeholder="Placeholder" type="text" class="form__control">
                <span class="input-group-btn">
                    <button class="btn">Button</button>
                </span>
            </div>
        </div>
    </div>


    <div class="form__group">
        <label for="inputPrependAppend" class="control__label">Appended and prepended buttons</label>
        <div class="controls">
            <div class="input-group has-btn-prepended has-btn-appended">
                <span class="input-group-btn">
                    <button class="btn btn--primary">Button</button>
                </span>
                <input id="inputPrependAppend" name="inputAppend" placeholder="Placeholder" type="text" class="form__control">
                <span class="input-group-btn">
                    <button class="btn">Button</button>
                </span>
            </div>
        </div>
    </div>
</div>
