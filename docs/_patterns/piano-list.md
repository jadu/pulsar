---
layout: page
title: Piano list
category: Patterns
---

Piano lists allow users to quickly navigate through multiple 'items' and see further details or forms related to that item. They're particularly useful for chronologically ordered content like messages or notes.

## Structure

The DOM structure is largely as follows, `.piano__item-content` is nested within `.piano__item` to facilitate the way piano list elements stacks on mobile.

```
.
├── .piano-wrapper
|   └── .piano
|       └── .piano__items
|           └── .piano__item
|               └── a
|               |   └── .piano__item-header
|               |       └── .piano__user (optional)
|               |       └── .piano__title
|               |       └── .piano__time (optional)
|               └── .piano__item-content (for selected/active items only)
|                   └── .piano__item-content-header
|                   └── .message
|                   └── .piano__form
```

## Switching content

Because piano UIs have the potential to be very large and contain a lot of data we don't provide the ability for all content to be present on page load. The `piano__item--content` blocks can be swapped either through a page refresh or, preferably, through an AJAX request (the ideal situation is AJAX with a page refresh non-js fallback).

## Markup example

{% raw %}
```twig
{% extends '@pulsar/pulsar/components/tab.html.twig' %}
{% import '@pulsar/pulsar/v2/helpers/html.html.twig' as html %}
{% import '@pulsar/pulsar/v2/helpers/form.html.twig' as form %}
{% import '@pulsar/pulsar/helpers/flash.html.twig' as flash %}

{% block tab_content %}

<div class="piano-wrapper">
    <div class="piano">
        <ul class="piano__items">

<!-- expanded item --------------------------------------------------------- -->

            <li class="piano__item is-selected">
                <a href="/piano_item_link_one">
                    <div class="piano__item-header">
                        <strong class="piano__user">
                            <img src="avatar.jpg" class="piano__avatar">
                            <span class="badge badge--primary piano__item-badge"
                              data-toggle="tooltip"
                              title="There is 1 message in this conversation">
                              1</span>
                            Billy Joel
                        </strong>
                        <p class="piano__title">Piano title</p>
                        <time class="piano__time">21/01/2016 14:05
                          <small>(10 days ago)</small></time>
                    </div>
                </a>

                <div class="messages piano__item-content">
                    <header class="piano__item-content-header">
                      Piano title</header>

                    <div class="message">
                        <time>14:05 <small>(10 days ago)</small></time>
                        <span class="sender">Billy Joel</span>
                        <span class="recipient">to Customer, Support</span>

                        <div class="message-body">
                            <p>It's nine o'clock on a Saturday
                            The regular crowd shuffles in<br />
                            There's an old man sitting next to me
                            Making love to his tonic and gin</p>
                        </div>
                    </div>

                    <form class="form piano__form" method="post" action="/foo">
                        <textarea id="message_message" name="message[message]"
                          required="required"
                          class="message-reply textarea form__control"
                          placeholder="Click here to reply to all"></textarea>
                        <button type="submit" class="btn btn--primary"
                          id="sendReply">Reply</button>
                    </form>
                </div>

            </li>

<!-- collapsed item --------------------------------------------------------- -->

            <li class="piano__item">
                <a href="/piano_item_link_two">
                    <div class="piano__item-header">
                        <strong class="piano__user">
                            <img src="avatar.jpg" class="piano__avatar">
                            <span class="badge badge--primary piano__item-badge"
                              data-toggle="tooltip"
                              title="There is 1 message in this conversation">
                              1</span>
                            Billy Joel
                        </strong>
                        <p class="piano__title">Piano title</p>
                        <time class="piano__time">21/01/2016 14:05
                          <small>(10 days ago)</small></time>
                    </div>
                </a>
            </li>

<!-- ------------------------------------------------------------------------ -->

        </ul> <!-- /.piano__items -->
    </div> <!-- /.piano -->
</div> <!-- /.piano-wrapper -->

{% endblock tab_content %}
```
{% endraw %}
