---
layout: page
title: Compound
category: Form helpers
---

The compound helper allows you to build a form group using multiple separate inputs with a single common label, and render those in a screenreader-friendly way.

## Options

Option     | Type   | Description
---------- | ------ | ----------------------------------------------------
class      | string | A space separated list of class names
error      | string | Text to explain an error/validation condition. Also adds error state styling to all fields
guidance   | string | Text to be displayed in a popover, adds a (?) icon after the input
id         | string | A unique identifier, will also be used as the label's `for` attribute
help       | string | Additional guidance information to be displayed next to the input
inputs     | array  | One or more form inputs to display
label      | string | Text for the `<label>` companion element
required   | bool   | Visually indicates that the field must be completed
data-*     | string | Data attributes, eg: `'data-foo': 'bar'`

<h2>Defining inputs</h2>

The `inputs` option accepts the same hash of `options` you would normally pass to a form helper, however you will need to explicitly define the `type` of input to create, which currently can be `text`, `textarea`, `select` or `select2`.

You should provide sensible labels as well as unique IDs for each individual inputs so that screenreaders can announce the separate fields sensibly, use `show-label': false` to visually hide them from the user interface.

{% raw %}
```twig
{{
    form.compound({
        'id': 'foo',
        'label': 'Example'
        'inputs': [
            {
                'class': 'form__control-col--1',
                'label': 'Day',
                'id': 'dd',
                'placeholder': 'DD',
                'show-label': false,
                'type': 'text'
            }
        ]
    })
}}
```
{% endraw %}

## Example patterns using form.compound

{% code_example form_helpers/compound-dob %}

<div class="pulsar-example form">
    <fieldset id="bar" class="form__group form__group--compound">
        <legend class="control__label" id="bar[label]">Date of birth</legend>
        <div class="controls">
            <label for="dd" id="dd[label]" class="control__label hide">Day</label>
            <input id="dd" placeholder="DD" type="text" class="form__control form__control-col--1">

            <label for="mm" id="mm[label]" class="control__label hide">Month</label>
            <input id="mm" placeholder="MM" type="text" class="form__control form__control-col--1">

            <label for="yyyy" id="yyyy[label]" class="control__label hide">Year</label>
            <input id="yyyy" placeholder="YYYY" type="text" class="form__control form__control-col--1">

            <span class="help-block">For example: 25 12 1980</span>
        </div>
    </fieldset>
</div>

{% code_example form_helpers/compound-dob-partial-error %}

<div class="pulsar-example form">
    <fieldset id="bar" class="form__group form__group--compound has-error form__group--partial-state">
        <legend class="control__label" id="comp-10[label]">Example with one invalid field and error </legend>
        <div class="controls">
            <label for="dd" id="dd[label]" class="control__label hide">Day</label>
            <input id="dd" placeholder="DD" type="text" class="form__control form__control-col--1">

            <label for="mm" id="mm[label]" class="control__label hide">Month</label>
            <input id="mm" placeholder="MM" type="text" class="form__control form__control-col--1 has-error">

            <label for="yyyy" id="yyyy[label]" class="control__label hide">Year</label>
            <input id="yyyy" placeholder="YYYY" type="text" class="form__control form__control-col--1">

            <span class="help-block is-error"><i aria-hidden="true" class="icon-warning-sign"></i> Please complete your month of birth</span>

            <span class="help-block">For example: 25 12 1980</span>
        </div>
    </fieldset>
</div>

{% code_example form_helpers/compound-timeout %}

<div class="pulsar-example form">
<fieldset id="foo" class="form__group form__group--compound">
    <legend class="control__label" id="foo[label]">Timeout</legend>
    <div class="controls">
        <label for="value" id="value[label]" class="control__label hide">Value</label>
        <input id="value" maxlength="3" type="text" class="form__control form__control-col--1">

        <label for="Unit" id="Unit[label]" class="control__label hide">Unit of time</label>
        <select id="Unit" type="select" class="form__control u-width-auto select">
            <option value="sec">Seconds</option>
            <option value="min">Minutes</option>
        </select>

        <span class="help-block">How long the system should wait for a response, usually 30 seconds</span>
    </div>
</fieldset>
</div>
