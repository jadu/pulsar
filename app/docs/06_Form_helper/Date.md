Allow the user to pick a specific date from a calendar popover

----

Available parameters:

    {{ form.date(label, value, id, class, name, placeholder = 'dd/mm/yyyy', help, attributes) }}

#### Label

    {{ form.date(label = 'Date') }}

    <div class="form__group form__group--medium">
        <label class="control__label">Date</label>
        <div class="controls">
            <div class="input-group">
                <input type="text" class="form__control" placeholder="dd/mm/yyyy" data-datepicker="true" />
                <span class="input-group-addon"><i class="icon-calendar"></i></span>
            </div>
        </div>
    </div>

<form class="form--horizontal">
<div class="form__group form__group--medium">
    <label for="inputText" class="control__label">Date</label>
    <div class="controls">
        <div class="input-group">
            <input type="text" class="form__control" data-datepicker="true" placeholder="dd/mm/yyyy" />
            <span class="input-group-addon"><i class="icon-calendar"></i></span>
        </div>
    </div>
</div>
</form>

#### ID

    {{ form.date(
        label = 'Date', 
        id = 'date') }}

    <div class="form__group form__group--medium">
        <label for="inputDate" class="control__label">Date</label>
        <div class="controls">
            <div class="input-group">
                <input type="text" class="form__control" id="inputDate" placeholder="dd/mm/yyyy" data-datepicker="true" />
                <span class="input-group-addon"><i class="icon-calendar"></i></span>
            </div>
        </div>
    </div>

#### Class

The class is added to the `.form__group`, not the individual input.

    {{ form.date(
        label = 'Date', 
        id = 'inputDate', 
        class = 'form__group--large') }}

    <div class="form__group form__group--large">
        <label for="inputText" class="control__label">Date</label>
        <div class="controls">
            <div class="input-group">
                <input type="text" class="form__control" id="inputDate" placeholder="dd/mm/yyyy" data-datepicker="true" />
                <span class="input-group-addon"><i class="icon-calendar"></i></span>
            </div>
        </div>
    </div>

#### Name

    {{ form.date(
        label = 'Date', 
        id = 'inputDate', 
        class = 'form__group--large', 
        name = 'field[name]') }}

    <div class="form__group form__group--large">
        <label for="inputText" class="control__label">Date</label>
        <div class="controls">
            <div class="input-group">
                <input type="text" class="form__control" id="inputDate" name="field[name]" placeholder="dd/mm/yyyy" data-datepicker="true" />
                <span class="input-group-addon"><i class="icon-calendar"></i></span>
            </div>
        </div>
    </div>

#### Placeholder

    {{ form.date(
        label = 'Date', 
        id = 'inputDate', 
        class = 'form__group--large', 
        name = 'field[name]', 
        placedholder = 'Choose Date') }}

    <div class="form__group form__group--large">
        <label for="inputText" class="control__label">Date</label>
        <div class="controls">
            <input type="text" class="form__control" id="inputDate" name="field[name]" placeholder="Choose Date" data-datepicker="true" />
        </div>
    </div>

<form class="form--horizontal">
<div class="form__group form__group--medium">
    <label for="inputText" class="control__label">Date</label>
    <div class="controls">
        <div class="input-group">
            <input type="text" class="form__control" data-datepicker="true" placeholder="Choose Date"  data-datepicker="true" />
            <span class="input-group-addon"><i class="icon-calendar"></i></span>
        </div>
    </div>
</div>
</form>


#### Help text

    {{ form.date(
        label = 'Date', 
        id = 'inputDate', 
        class = 'form__group--large', 
        name = 'User[name]', 
        placeholder = 'Choose Date', 
        help = 'Something helpful this way comes') }}

    <div class="form__group form__group--large">
        <label for="inputText" class="control__label">Date</label>
        <div class="controls">
            <input type="text" class="form__control" id="inputDate" name="field[name]" placeholder="Choose Date" data-datepicker="true" />
            <p class="help-block">Something helpful this way comes</p>
        </div>
    </div>

<form class="form--horizontal">
<div class="form__group form__group--large">
    <label for="inputText" class="control__label">Date</label>
    <div class="controls">
        <div class="input-group">
            <input type="text" class="form__control" id="inputDate" name="field[name]" placeholder="Choose Date" data-datepicker="true" />
            <span class="input-group-addon"><i class="icon-calendar"></i></span>
        </div>
        <p class="help-block">Something helpful this way comes</p>
    </div>
</div>
</form>
