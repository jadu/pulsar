Closes a form with the desired submit actions, usually used in conjunction with [submit inputs](./Submit).

----

Available parameters:

    {{ form.form_end(actions) }}

Actions should typically be an array of submits/buttons/button groups which are rendered inline.

Example usage:
    
    {{ 
        form.form_end([
            html.button(label = 'Register', type = 'link', href = '/register'),
            form.submit(label = 'Sign in')
        ]) 
    }}

        <div class="form__actions">
            <a href="/register" class="btn" role="button">Register</a>
            <input type="submit" class="btn" value="Sign in" />
        </div>
    </form>