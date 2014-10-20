Give feedback to the user that something is happening or that information is being retrieved from the server.

Setting the `visibility` attribute to `false` will allow you to place the loading markup in the DOM on pageload, then to toggle it with javascript.

----

Available attributes:

    {{ html.loading(visible = true) }}

<div class="loading loading--circle">
    <i></i>
</div>

<br />

## Select elements

The select element has support for the loading indicator built in, simply add the `is-loading` class to the helper.

    {{ 
        form.select(
            label = 'Select input', 
            class = 'form__group--regular is-loading', 
            id = 'inputSelect', 
            name = 'inputSelect', 
            options = {value1: 'loading...'}
        ) 
    }}

<form class="form--horizontal" method="POST">
    <div class="form__group form__group--regular is-loading">
        <label for="inputSelect" class="control__label">Select input</label>
        <div class="controls">
            <div class="loading loading--circle hide">
                <i></i>
            </div>
            <select class="form__control" id="inputSelect" name="inputSelect"><option value="value1">loading...</option></select>
        </div>
    </div>
</form>