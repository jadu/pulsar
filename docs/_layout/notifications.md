---
layout: page
title: Notifications
category: Layout
---

Provides a prominent location for notifications to be displayed. A toolbar indicator highlights when new notifications are available and a dropdown list displays the actual notifications.

<div>
<p data-height="600" data-theme-id="16461" data-slug-hash="grmLyy" data-default-tab="result" data-user="pulsar" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/grmLyy/">docs - notifications</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>

## Toolbar indicator

{% raw %}
```twig
{{
    html.link({
        'class': 'notifications-toggle',
        'href': '#',
        'label': html.icon('bell'),
        'data-toggle': 'dropdown'
    })
}}
```
{% endraw %}

<div>
<p data-height="60" data-theme-id="24005" data-slug-hash="aNWXvz" data-default-tab="result" data-user="pulsar" class="codepen">See the Pen <a href="http://codepen.io/pulsar/pen/aNWXvz/">docs - notifications</a> by Pulsar (<a href="http://codepen.io/pulsar">@pulsar</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>

Toggle the states with common state classes

| Class                                    | Result                |
| ---------------------------------------- | --------------------- |
| `notifications-toggle`                   | greyed out (inactive) |
| `notifications-toggle is-active`         | black outline (active) |
| `notifications-toggle is-active has-new` | black outline with red indicator (new unreads) |

## Notifications list

The notifications list is a simple dropdown wrapper around multiple [media objects](media.md).

A main `notifications` container holds both the `notifications-toggle` and the `notifications-list`.

{% raw %}
```twig
<div class="dropdown notifications">
    {{
        html.link({
            'class': 'notifications-toggle is-active',
            'href': '#',
            'label': html.icon('bell'),
            'data-toggle': 'dropdown'
        })
    }}
    <div class="notifications-list dropdown__menu"><!--
        --><div class="notifications__header">
            <h1 class="notifications-title">Notifications</h1>
          <a href="#" class="notifications-dismiss">dismiss all</a>
        </div><!--
        --><div class="notification is-new">
            <div class="media">
                <img src="/images/favicons/cms/android-chrome-48x48.png" alt="CMS Logo" class="media__image" />

                <div class="media__body">
                    <button
                        type="button"
                        class="remove-button pull-right"
                        data-toggle="tooltips"
                        data-placement="left"
                        title="Dismiss"
                        data-action="remove"
                        data-action-target="#itemToRemove"
                        >
                        <i class="icon-remove"></i>
                    </button>
                    <p>CMS Continuum #29 now available.</p>
                    <span class="small-type muted">2 minutes ago</span>

                    <span class="divider"></span>

                    <p>We've updated our user manual to feature our new and improved user interface. If you need a copy, drop us a message and we'll be happy to send one over.</p>

                    <p><i class="icon-file-text-alt"></i> <a href="#">View detailed release notes</a></p>
                </div>
            </div>
        </div>

        <div class="notification">
            <div class="media">
                <img src="/images/favicons/xfp/android-chrome-48x48.png" alt="" class="media__image" />

                <div class="media__body">
                    <button
                        type="button"
                        class="remove-button pull-right"
                        data-toggle="tooltips"
                        data-placement="left"
                        title="Dismiss"
                        data-action="remove"
                        data-action-target="#itemToRemove"
                        >
                        <i class="icon-remove"></i>
                    </button>
                    <p>CMS Continuum #29 now available.</p>
                    <span class="small-type muted">2 minutes ago</span>

                    <span class="divider"></span>

                    <p>We've updated our user manual to feature our new and improved user interface. If you need a copy, drop us a message and we'll be happy to send one over.</p>

                    <p><i class="icon-file-text-alt"></i> <a href="#">View detailed release notes</a></p>
                </div>
            </div>
        </div>

        <div class="notifications__footer">
            <a href="#" class="notifications-all">View all</a>
        </div>
    </div>
</div>
```
{% endraw %}
