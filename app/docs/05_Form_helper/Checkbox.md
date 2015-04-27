Creates a checkbox which can be pre-checked and grouped with other checkboxes.

----

Available parameters:

    {{ form.checkbox(label, id, class, name, checked = false, help) }}

Examples:

    {{ form.checkbox(label = 'Checkbox with left label') }}

    <div class="form__group">
        <label for="inputCheckboxLeft" class="checkbox__label">Checkbox with left label</label>
        <div class="controls">
            <input type="checkbox" id="inputCheckboxLeft" name="inputCheckboxLeft" checked="">
        </div>
    </div>

    {{ form.checkbox_right(
        label = 'Pre-checked, with right label',
        id = 'inputCheckboxRight',
        name = 'inputCheckboxInline',
        checked = true) }}

    <div class="form__group">
        <div class="checkbox">
            <label for="inputCheckboxRight" class="checkbox__label">
                <input type="checkbox" id="inputCheckboxRight" name="inputCheckboxInline" checked="">
                Pre-checked, with right label
            </label>
        </div>
    </div>

<form class="form--horizontal">
<div class="form__group">
    <label class="checkbox__label">Checkbox with left label</label>
    <div class="controls">
        <input type="checkbox" />
    </div>
</div>
</form>

<form class="form--horizontal">
<div class="form__group">
    <div class="checkbox">
        <label for="inputCheckboxRight" class="checkbox__label">
            <input type="checkbox" id="inputCheckboxRight" name="inputCheckboxInline" checked="">
            Pre-checked with right label
        </label>
    </div>
</div>
</form>

### Checkbox groups

You can group checkboxes together into logical blocks by wrapping them with the `checkbox_group` helper, this is particularly useful for creating inline checkboxes if your options are relatively small.

```twig
{{
    form.checkbox_group([
        form.checkbox_inline({
            'label': 'Inline',
            'id': 'foo',
            'name': 'foo'
        }),
        form.checkbox_inline({
            'label': 'Check',
            'id': 'bar',
            'name': 'bar',
            'checked': true
        }),
        form.checkbox_inline({
            'label': 'Boxes',
            'id': 'baz',
            'name': 'baz'
        })
    ])
}}
```

<form class="form--horizontal">
<div class="form__group">
    <div class="checkbox">
        <label for="foo" class="checkbox--inline">
        <input type="checkbox" id="foo" name="foo" />
                Inline
        </label>
        <label for="bar" class="checkbox--inline">
        <input type="checkbox" id="bar" name="bar" checked="checked" />
                Check
        </label>
        <label for="baz" class="checkbox--inline">
        <input type="checkbox" id="baz" name="baz" />
                Boxes
        </label>
    </div>
</div>
</form>
