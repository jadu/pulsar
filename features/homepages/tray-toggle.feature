Feature: Toggle Tray
	as a content author 
	i need to be able to show and hide the widget tray
	so that i can choose when to view which widgets i have available without the information constantly being visible

Scenario: Tray hidden by default
	Given I am on the homepages designer
	When I do nothing
	Then the tray should be hidden
	And the 'Widgets' button should not be toggled

Scenario: Show tray
	Given I am on the homepages designer
	When I click on the 'Widgets' button
	Then the tray should be visible
	And the 'Widgets' button should be toggled

Scenario: Hide tray
	Given the tray is visible
	When I click on the 'Widgets' button
	Then the tray should be hidden
	And the 'Widgets' button should not be toggled