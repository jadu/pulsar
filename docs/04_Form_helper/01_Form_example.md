There are separate helpers to start and end a form, your individual inputs will be within these two 'tags'. See the individual documentation for these tags for the full explanation of their Available parameters.

## A simple form example

	{{ form.create('/login') }}
	{{ form.input('Username') }}
	{{ form.password('Password') }}
	{{ form.end(html.submit('Login')) }}

Output: 

	<form class="form--horizontal" target="/login" method="POST">

        <div class="form__group">
        	<label class="control__label">Username</label>
        	<div class="controls">
                <input type="text" class="form__control">
            </div>
    	</div>

        <div class="form__group">
        	<label class="control__label">Password</label>
        	<div class="controls">
            	<input type="password" class="form__control">
            </div>
    	</div>

        <div class="form__actions">
			<input type="submit" value="Login" />
        </div>

    </form>