Interface buttons — while they look the same — can be links, buttons or inputs and can be used anywhere in the UI for different needs.

Available attributes:

	{{ html.button(label, class, id, type, href, attributes) }}

----

## Multiple Tags (type)

Where possible, you should use the default button type, but buttons can also be links and inputs. 

	{{ html.button('Button') }}
	{{ html.button('Link Button', null, 'link', null, 'http://myurl.com') }}
	{{ html.button('Input Button', null, 'input') }}
	{{ html.button('Submit Button', null, 'submit') }}
	
<button class="btn">Button</button>
<a href="http://myurl.com" class="btn" role="button">Link Button</a>
<input type="button" class="btn" value="Input Button" />
<input type="submit" class="btn" value="Submit Button" />

----

## Variations (class)

The following modifier classes can be applied to the `class` attribute to change the visual appearance of all button types

	<!-- The normal type of button you should use -->
	{{ html.button('Default') }}
	
	<!-- In the context of a full UI, this is the main thing we want the user to do next -->
	{{ html.button('Primary', 'btn--primary') }}
	
	<!-- Indicates a successful or positive action -->
	{{ html.button('Success', 'btn--success') }}
	
	<!-- Indicates a dangerous or destructive action -->
	{{ html.button('Danger', 'btn--danger') }}
	
	<!-- Indicates caution should be taken here -->
	{{ html.button(html.icon('warning-sign') ~ ' Warning', 'btn--warning') }}
	
	<!-- Contextual button for informational alert messages -->
	{{ html.button('Info ' ~ html.icon('chevron-sign-right'), 'btn--info') }}
	
	<!-- Rarely used, a good example is a 'locked content' button -->
	{{ html.button(html.icon('lock') ~ ' Inverse', 'btn--inverse') }}
	
<button class="btn">Default</button>
<button class="btn btn--primary">Primary</button>
<button class="btn btn--success">Success</button>
<button class="btn btn--danger">Danger</button>
<button class="btn btn--warning"><i class="icon-warning-sign"></i> Warning</button>
<button class="btn btn--info">Info <i class="icon-chevron-sign-right"></i></button>
<button class="btn btn--inverse"><i class="icon-lock"></i> Inverse</button>

----
	
## Disabled Buttons

Adding the `is-disabled` class to a button will automatically add the `disabled` attribute to `button` `input` and `submit` type buttons.

	{{ html.button('Disabled Button', 'is-disabled') }}

	// output:
	// <button class="btn is-disabled" disabled="disabled">Disabled Button</button>
	
<button class="btn is-disabled" disabled>Disabled Button</button>