---
layout: page
title: Loading spinner
category: Components
---

Give feedback to the user that something is happening or that information is
being retrieved from the server.

Adding the `hide` class will allow you to place the loading markup in the DOM on
pageload for you to toggle with javascript.

## Example usage

{% code_example html_helpers/loading %}

<div class="pulsar-example">
    <div class="loading"><i>Loading...</i></div>
</div>

## Options

Option | Type   | Description
-----  | ------ | --------------------------------------------------------------
class  | string | CSS classes, space separated
id     | string | A unique identifier, if required
data-* | string | Data attributes, eg: `'data-foo': 'bar'`
