Feature: Widget hover
	as a content author 
	i need to see additional controls when i hover over a widget
	so that i can choose when to modify a widget without the icons constantly cluttering up the UI

Scenario: show overlay on hover
	Given I am on the homepages designer
	And I hover over widget 1 on row 1
	Then the widget should be highlighted
	And the resize handle should be visible

Scenario: overlay shows widget controls
	Given I am on the homepages designer
	When I hover over widget 1 on row 1
	Then I should see the ".edit-widget-settings" link
	And I should see the ".remove-widget" link