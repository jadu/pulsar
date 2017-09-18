---
layout: page
title: Panel
category: Components
---

Display important information in a prominent container.

## Example usage

{% code_example html_helpers/panel %}

<div class="example">
    <div class="panel">
        <div class="panel__title">
            <i class="icon-info-sign"></i> Default panel
        </div>
        <div class="panel__body">
            <p>What you wanna ball with the kid
            Watch your step you might fall
            Trying to do what I did
            Mama-unh mama-unh mama come closer
            In the middle of the club with the rub-a-dub, unh</p>
        </div>
    </div>
</div>

## Options

Option  | Type   | Description
------- | ------ | --------------------------------------------------------------
actions | array  | An array of `html.button` options to be displayed within the panel
body    | string | The main content of the panel
class   | string | CSS classes, space separated
icon    | string | Icon to display next to the panel title (optional)
id      | string | A unique identifier, if required
title   | string | The title of the panel (optional)
data-*  | string | Data attributes, eg: `'data-foo': 'bar'`

## State Variations

Use the standard state variations to reinforce the message your panel is displaying.

<div class="example">
    <div class="panel">
        <div class="panel__title">
            <i class="icon-info-sign"></i> Default panel
        </div>
        <div class="panel__body">
            <p>What you wanna ball with the kid
                Watch your step you might fall
                Trying to do what I did
                Mama-unh mama-unh mama come closer
                In the middle of the club with the rub-a-dub, unh</p>
        </div>
    </div>
</div>

`.panel--info`

<div class="example">
    <div class="panel panel--info">
        <div class="panel__title">
            <i class="icon-question-sign"></i> Info panel
        </div>
        <div class="panel__body">
            <p>No love for the haters, the haters
                Mad cause I got floor seats at the Lakers
                See me on the fifty yard line with the Raiders
                Met Ali he told me I’m the greatest
                I got the fever for the flavor of a crowd pleaser</p>
        </div>
    </div>
</div>

`.panel--success`

<div class="example">
    <div class="panel panel--success">
        <div class="panel__title">
            <i class="icon-ok-sign"></i> Success panel
        </div>
        <div class="panel__body">
            <p>DJ play another
                From the prince of this
                Your highness
                Only mad chicks ride in my whips
                South to the west to the east to the north</p>
        </div>
    </div>
</div>

`.panel--warning`

<div class="example">
    <div class="panel panel--warning">
        <div class="panel__title">
            <i class="icon-warning-sign"></i> Warning panel
        </div>
        <div class="panel__body">
            <p>Bought my hits and watch ’em go off a go off
                Ah yes yes y’all ya don't stop
                In the winter or the (summertime)
                I makes it hot
                Gettin jiggy wit ’em</p>
        </div>
    </div>
</div>

`.panel--danger`

<div class="example">
    <div class="panel panel--danger">
        <div class="panel__title">
            <i class="icon-exclamation-sign"></i> Danger panel
        </div>
        <div class="panel__body">
            <p>Eight-fifty I.S. if you need a lift
                Who’s the kid in the drop
                Who else Will Smith
                Livin’ that life some consider a myth Rock from south street to one two fifth</p>
        </div>
    </div>
</div>

`.panel--inverse`

<div class="example">
    <div class="panel panel--inverse">
        <div class="panel__title">
            <i class="icon-remove-sign"></i> Inverse panel
        </div>
        <div class="panel__body">
            <p>Women used to tease me
                Give it to me now nice and easy
                Since I moved up like George and Wheezy
                Cream to the maximum I be askin’ ’em
                Would you like to bounce with the brother that’s platinum</p>
        </div>
    </div>
</div>

## Additional styles

Chain together styles to achieve the most appropriate layout for your needs.

###### Panel without title/icon

<div class="example">
    <div class="panel">
        <div class="panel__body">
            <p>Panels don't need a title or an icon and can be used as standout containers</p>
        </div>
    </div>
</div>

`.panel--padded`

<div class="example">
    <div class="panel panel--padded">
        <div class="panel__body">
            <p>Panels can have increased vertical padding</p>
        </div>
    </div>
</div>

`.centered`

<div class="example">
    <div class="panel centered">
        <div class="panel__body">
            <p>Center content where appropriate</p>
        </div>
    </div>
</div>

## Call to Action

The `actions` option will accept an array of options which will be passed to the `html.button()` helper.

For actions styles, use a combination of `.btn--outline` and `.btn--small` with either `.btn--inverse` or `.btn--white` depending on the colour of the panel you're using.

{% raw %}
```twig
{{
    html.panel({
        'title': 'Hello',
        'body': 'You need to do a thing.',
        'actions': [
            {
                'label': 'Don’t Do the Thing',
                'class': '.btn--outline .btn--small .btn--inverse'
            },
            {
                'label': 'Do the Thing',
                'class': '.btn--outline .btn--small .btn--inverse'
            }
        ]
    })
}}
```
{% endraw %}

<div class="example">
    <div class="panel">
        <i aria-hidden="true" class="icon-info-sign panel__icon"></i>
        <div class="panel__title">
            Hello
        </div>
        <div class="panel__body">
            You need to do a thing.
            <button class="btn btn--outline btn--small btn--inverse">Don’t Do The Thing</button>&nbsp;<button class="btn btn--outline btn--small btn--inverse">Do The Thing</button>
        </div>
    </div>
</div>

## Action positions

{% raw %}
```twig
{{
    html.panel({
        'title': 'Default (left) placement',
        'body': 'You need to do a thing.',
        'actions_placement': 'left',
        'actions': [
            {
                'label': 'Don’t Do the Thing',
                'class': '.btn--outline .btn--small .btn--inverse'
            },
            {
                'label': 'Do the Thing',
                'class': '.btn--outline .btn--small .btn--inverse'
            }
        ]
    })
}}
```
{% endraw %}

<div class="panel">
    <i aria-hidden="true" class="icon-info-sign panel__icon"></i>
    <div class="panel__title">Default (left) placement</div>
    <div class="panel__body">
        You need to do a thing.
        <div class="panel__actions">
            <button class="btn btn--outline btn--small btn--inverse">Don’t Do The Thing</button>
            <button class="btn btn--outline btn--small btn--inverse">Do The Thing</button>
        </div>
    </div>
</div>

{% raw %}
```twig
{{
    html.panel({
        'title': 'Inline placement',
        'body': 'You need to do a thing.',
        'actions_placement': 'inline',
        'actions': [
            {
                'label': 'Don’t Do the Thing',
                'class': '.btn--outline .btn--small .btn--inverse'
            },
            {
                'label': 'Do the Thing',
                'class': '.btn--outline .btn--small .btn--inverse'
            }
        ]
    })
}}
```
{% endraw %}

<div class="example">
    <div class="panel">
        <i aria-hidden="true" class="icon-info-sign panel__icon"></i>
        <div class="panel__title">Inline placement</div>
        <div class="panel__body">
            You need to do a thing.
            <div class="panel__actions panel__actions--inline">
                <button class="btn btn--outline btn--small btn--inverse">Don’t Do The Thing</button>
                <button class="btn btn--outline btn--small btn--inverse">Do The Thing</button>
            </div>
        </div>
    </div>
</div>

{% raw %}
```twig
{{
    html.panel({
        'title': 'Centered placement',
        'body': 'You need to do a thing.',
        'actions_placement': 'center',
        'actions': [
            {
                'label': 'Don’t Do the Thing',
                'class': '.btn--outline .btn--small .btn--inverse'
            },
            {
                'label': 'Do the Thing',
                'class': '.btn--outline .btn--small .btn--inverse'
            }
        ]
    })
}}
```
{% endraw %}

<div class="example">
    <div class="panel">
        <i aria-hidden="true" class="icon-info-sign panel__icon"></i>
        <div class="panel__title">Centered placement</div>
        <div class="panel__body">
            You need to do a thing.
            <div class="panel__actions panel__actions--center">
                <button class="btn btn--outline btn--small btn--inverse">Don’t Do The Thing</button>
                <button class="btn btn--outline btn--small btn--inverse">Do The Thing</button>
            </div>
        </div>
    </div>
</div>

{% raw %}
```twig
{{
    html.panel({
        'title': 'Right placement',
        'body': 'You need to do a thing.',
        'actions_placement': 'right',
        'actions': [
            {
                'label': 'Don’t Do the Thing',
                'class': '.btn--outline .btn--small .btn--inverse'
            },
            {
                'label': 'Do the Thing',
                'class': '.btn--outline .btn--small .btn--inverse'
            }
        ]
    })
}}
```
{% endraw %}

<div class="example">
    <div class="panel">
        <i aria-hidden="true" class="icon-info-sign panel__icon"></i>
        <div class="panel__title">Right placement</div>
        <div class="panel__body">
            You need to do a thing.
            <div class="panel__actions panel__actions--right">
                <button class="btn btn--outline btn--small btn--inverse">Don’t Do The Thing</button>
                <button class="btn btn--outline btn--small btn--inverse">Do The Thing</button>
            </div>
        </div>
    </div>
</div>
