---
layout: page
title: Rules
category: Patterns
---

The rules UI allows users to build a logical ruleset using simple `WHEN` `AND/OR` & `THEN` blocks.

![Rules UI example gif](/assets/image_examples/rules.gif)

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

![When rule example](/assets/image_examples/rule-when.png)

### And

{% code_example rule_helpers/and-bare %}

![When rule example](/assets/image_examples/rule-and.png)

### Or

An OR block can only be used in conjunction with a WHEN or an AND It cannot be used standalone.

{% code_example rule_helpers/or-bare %}

![When rule example](/assets/image_examples/rule-or.png)

### Then

Chooses the action, or combination of actions to perform as long as the required conditions in the ruleset have been met.

{% code_example rule_helpers/then-bare %}

![When rule example](/assets/image_examples/rule-then.png)

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

