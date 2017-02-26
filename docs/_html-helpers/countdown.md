---
layout: page
title: Countdown
category: HTML helpers
---

Add a live countdown to a specific date/time. This is a basic implementation for the time being, speak to Pulsar team if you need extra functionality as per [http://hilios.github.io/jQuery.countdown/documentation.html](http://hilios.github.io/jQuery.countdown/documentation.html)

## Example usage

{% raw %}
```twig
{{
    html.countdown({
        'final-date': '2020/01/01 12:34:00',
        'format': '%ww %dd %Hh %Mm %S',
        'label': 'Expires 01/01/2010 at 12:34pm'
    })
}}
```
{% endraw %}

This will render a simple string which will start counting down. You can style this as you wish. You can provide your own `format` string to provide the most appropriate countdown (ie: there's no point having a countdown using weeks if the final date is only based a few hours away).

## Options

Option     | Type   | Description
---------- | ------ | --------------------------------------------------------------
class      | string | CSS classes, space separated
final-date | string | A native date() object, epoch timestamp (milliseconds) or date string
format     | string | A `strftime` string to format the countdown output (default: `%ww %dd %Hh %Mm %S`)
id         | string | A unique identifier, if required
label      | string | A fallback string to display if no js available
data-*     | string | Data attributes, eg: `'data-foo': 'bar'`
