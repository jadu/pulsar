---
layout: page
title: Rules
category: Patterns
---

The rules UI allows users to build a logical ruleset using simple `WHEN` `AND/OR` & `THEN` blocks.

![Rules UI example gif]({{ site.baseurl }}/assets/image_examples/rules.gif)

## Layout

The rules container can be placed in different UI contexts depending on the requirements of the interface.

The minimum required HTML structure is as follows:

```html
<div id="rule-form-container" class="rules-container">
    <!-- form start -->
    <!-- rule title -->

    <div class="rules">
        <!-- rule blocks -->
    </div>

    <!-- enable rule checkbox -->
    <!-- end form -->
</div>
```

## Rules

A rule is built from 'rule blocks', there are three types of rule blocks.

| Rule block | Purpose |
| WHEN       | A trigger which causes this rule to run |
| AND (when) | Another trigger, which must be met for this rule to run |
| OR (when)  | An alternative trigger, which will cause the rule to run if met |
| THEN       | An action, which will be performed if the triggers and conditions are met |
| AND (then) | Another action, which will be performed after the previous THEN action |

The simplest rule would be a WHEN and a THEN.

* WHEN {something happens}
* THEN {do something}

Additional conditions can be aded to make the rule more specific.

* WHEN {something happens}
* AND {this happens too}
* THEN {do something}

Multple conditions and actions can be performed by the same rule.

* WHEN {something happens}
    * OR {this happens}
* AND {this happens}
    * AND {this happens too}
* THEN {do something}
    * AND {do this too}

## Rule block helpers

There are separate helpers for each of the WHEN/AND/OR/THEN conditions, they all accept the same options.

Option       | Type   | Description
------------ | ------ | ---------------------------------------------------------
inputs       | array  | Array of `form` helpers to be displayed within the rule
removeable   | bool   | Allow this rule to be removed (shows (x) icon) (default: false for WHEN, true for AND/OR/THEN)
show_and     | bool   | Show AND link underneath the rule (default: true)
show_or      | bool   | Show OR link underneath the rule (default true for WHEN/AND/OR, false for THEN)

### When

There is only one WHEN condition per ruleset, it is typically not removeable.

{% code_example rule_helpers/when-bare %}

![When rule example]({{ site.baseurl }}/assets/image_examples/rule-when.png)

### And

{% code_example rule_helpers/and-bare %}

![When rule example]({{ site.baseurl }}/assets/image_examples/rule-and.png)

### Or

An OR block can only be used in conjunction with a WHEN or an AND It cannot be used standalone.

{% code_example rule_helpers/or-bare %}

![When rule example]({{ site.baseurl }}/assets/image_examples/rule-or.png)

### Then

Chooses the action, or combination of actions to perform as long as the required conditions in the ruleset have been met.

{% code_example rule_helpers/then-bare %}

![When rule example]({{ site.baseurl }}/assets/image_examples/rule-then.png)

## Example rule block with inputs

The inputs used by a rule block are normal form helpers, usually select/select2 elements. Use the `show-label: false` option to hide the form field label in a screenreader friendly way.

{% raw %}
```twig
{{
    rule.block_when({
        'removeable': false,
        'inputs': [
            form.select2({
                'label': 'Choose trigger',
                'placeholder': 'Choose trigger',
                'show-label': false,
                'options':
                [
                    {
                        'label': 'XForms Pro',
                        'options': [
                            {
                                'label': 'Form is submitted',
                                'value': 'foo'
                            },
                            {
                                'label': 'Form is started',
                                'value': 'bar'
                            }
                        ]
                    }
                ]
            })
        ]
    })
}}
```
{% endraw %}

As a developer, you will implement logical choice trees within a given help block, usually driven by select/select2 helpers, allowing a user to be presented with additional options depending on their choices. (These will typically be fetched by ajax).

Where possible, you should design the labels within your rule blocks to be read as a sentence, for example.

* WHEN [form] is [submitted]
* AND [user] is [signed in]
* THEN [send email confirmation] to [address]

## Rule block modifiers

The following classes, when applied to the top level element, will modify certain visual states of the rule block.

Pass classes through the `class` attribute of the rule helpers.

{% raw %}
```twig
{{
    rule.block_when({
        'class': 'rule--indented',
        'inputs': [
```
{% endraw %}

| Class | Effect |
| ----- | ------ |
| `.rule--indented` | Indents a step by 20px, used to denote sub-rules. |

## Displaying errors

You will normally need to do two things to properly indicate errors in a rule block.

1. Add a danger panel to the top of the UI, explaining there are issues that need to be resolved further down in the UI
1. Add an error message to the rule block
1. Highlight the specific field causing the error

![rule error example]({{ site.baseurl }}/assets/image_examples/rule-error-four.png)

The `error` option, when supplied, will automatically apply the required error styling to the rule block.

### Adding error messages to the rule block

{% raw %}
```twig
{{
    rule.block__or({
        'error': 'Something went wrong...'
        ...
```
{% endraw %}

![rule error example]({{ site.baseurl }}/assets/image_examples/rule-error-one.png)

In some cases you may need to add more than one error (e.g. field 1 has x error, field 2 has y error), the `error` field can accept an array of strings rather than a single string.

{% raw %}
```twig
{{
    rule.block__or({
        'error': [
            'This is error one',
            'This is error two'
        ]
        ...
```
{% endraw %}

![rule error example]({{ site.baseurl }}/assets/image_examples/rule-error-three.png)

### Highlighting invalid fields

To properly communicate which specific form elements within a rule are causing the error, you should add the common `has-error` class where appropriate.

{% raw %}
```twig
{{
    rule.block__or({
        'error': 'Something went wrong...',
        'inputs': [
            form.select2({
                'class': 'has-error'
                ...
```
{% endraw %}

![rule error example]({{ site.baseurl }}/assets/image_examples/rule-error-two.png)
