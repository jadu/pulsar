---
layout: page
title: Time
category: Form helpers
---

Generates a text input using the [timepicker](https://github.com/jonthornton/jquery-timepicker) plugin which allows the input and selection of times.

## Dependencies

Time elements need the `PulsarFormComponent` to be included in your browserify configuration.

Depending on your setup, this will probably need to be in be in a file called `index.js` or `main.js`.

```javascript
var PulsarFormComponent = require('/path/to/pulsar/PulsarFormComponent');

$(function () {
    var $html = $('html');

    pulsarForm = new PulsarFormComponent($html);
    pulsarForm.init();
});
```

This will then affect all input elements with the `data-timepicker="true"` attribute (which will be included automatically if you're using the helpers).

## Example usage

{% code_example form_helpers/time %}

## Options applied to parent wrapper

Option       | Type   | Description
------------ | ------ | ---------------------------------------------------------
append       | string | Text or markup to include after the input element
append_type  | string | Use only when appending a button. `button` is the only valid value
class        | string | A space separated list of class names
guidance     | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help         | string | Additional guidance information to be displayed next to the input
label        | string | Text for the `<label>` companion element
prepend      | string | Text or markup to include before the input element
prepend_type | string | Use only when prepending a button. `button`is the only valid value
required     | bool   | Visually indicates that the field must be completed
show-label   | bool   | Control visibility of the `<label>` element without affecting layout (default: true)

## Options applied to input

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
autofocus   | bool   | Whether the field should have input focus on page load
disabled    | bool   | Stops the element from being interactive if true
form        | string | Specific one or more forms this label belongs to
id          | string | A unique identifier, if required
name        | string | The name of this control
placeholder | string | A short hint that describes the expected value
required    | bool   | Adds `required` and `aria-required="true"` attributes
value       | string | Specifies the value of the input
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`

Any other options not listed here will be applied to the input.

## Additional timepicker options

Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-` as in `data-time-format="H:i:s"`.

Option              | Type   | Description
------------------- | ------ | ---------------------------------------------------------
appendTo            | string | Override where the dropdown is appended, `default: body`
className           | string | A class name to apply to the input that has the timepicker dropdown
closeOnWindowScroll | bool   | Close the timepicker when the window is scrolled, `default: false`
disableTimeRanges   | array  | Disable selection of certain time ranges. Input is an array of time pairs, like `[['3:00am', '4:30am'], ['5:00pm', '8:00pm']]`. The start of the interval will be disabled but the end won't. `default: []`
disableTextInput    | bool   | Disable typing in the timepicker input box; force users to select from list. `default: false`
maxTime             | string | The time that should appear last in the dropdown list. Can be used to limit the range of time options
minTime             | string | The time that should appear first in the dropdown list
orientation         | string | By default the timepicker dropdown will be aligned to the bottom right of the input element, or aligned to the top left if there isn't enough room below the input. Force alignment with `l` (left), `r` (right), `t` (top), and `b` (bottom). Examples: `tl`, `rb`. `default: 'l'`
timeFormat          | string | How times should be displayed in the list and input element. Uses PHP's date() formatting syntax. Characters can be escaped with a preceeding double slash (e.g. H\\\hi). `default: 'g:ia'`

More options can be found in the timepicker [docs](https://github.com/jonthornton/jquery-timepicker)
