# data-ui-* attributes for common interaction patterns

Proposed introduction of `data-ui` namespaced attributes to allow engineers to quickly wire up common interactions and reduce javascript duplication.

## Potential attributes 

* `data-ui-action`
* `data-ui-target`
* `data-ui-group`
* `data-ui-switch`

----

## data-ui-action

Perform an action on the element(s) matching the selector specified in `data-ui-target`. These may be simple wrappers around jQuery functionality (like `$.show()`) but allow us to standardise/maintain the behaviour of `$.show()` by maintaining it's parameters in one place. They may also be hooks into more fully-featured plugins like repeatables.

	<button data-ui-action="hide" data-ui-target=".foo">Hide Foo</button>

Possible parameters

* show
* hide
* toggle-visibility
* add-another
* remove

## data-ui-target

Specifies a CSS selector upon which to perform the action specified by `data-ui-action`

	<button data-ui-action="hide" data-ui-target=".foo">Hide Foo</button>

	<p class="foo">I am the target</p>

## data-ui-group

Allows multiple elements in a given UI to be associated together in a group regardless of their location in the UI, actions may then be performed on the entire group.

	<button data-ui-group="foo">My Foo Button</button>

	<a href="#foo" data-ui-group="foo">My Foo Link</a>

See `data-ui-switch` for an example where this is required.

## data-ui-switch

Provides a toggle which makes the `data-ui-target` element visible, and hides the other elements within the `data-ui-group`

	<label for="foo-yes">Yes</label>
	<input type="radio" id="foo-yes" name="foo-choice" 
		data-ui-switch="choice-message" data-ui-target="#bar-yes" />

	<label for="foo-no">No</label>
	<input type="radio" id="foo-no" name="foo-choice" 
		data-ui-switch="choice-message" data-ui-target="#bar-no" />

	<!-- hidden by 
	<p id="bar-yes" class="hide" data-ui-group="choice-message">
		Yis! :)
	</p>

	<p id="bar-no" class="hide" data-ui-group="choice-message">
		Aww :(
	</p>
