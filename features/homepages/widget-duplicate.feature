Feature: Duplicating widgets
	as a content author 
	i need to be able to duplicate an existing widget
	so that i can rapidly build up my homepage by copying existing content

Scenario: Duplication option present
	Given I have a row with 1 widget
	And I hover over widget 1 on row 1
	And I click on the widget's button with class ".edit-widget-settings"
	Then I should see the "Duplicate" button

Scenario: Duplicate widget on painted homepage
	Given I am on the "fillmurray" homepage
	And row 1 contains the widget:
		| fillmurray |
	And I hover over widget 1 on row 1
	And I click on the widget's button with class ".edit-widget-settings"
	And I click on the "Duplicate" button
	Then row 1 should contain the widgets:
		| fillmurray |
		| fillmurray |

Scenario: Duplicate widget on a new homepage
	Given I am on the homepages designer
	And I open the tray
	And I click on the "Bill Murray" category
	And I click on the "Image" widget
	And I drag the handle to row 1
	And row 1 contains the widgets:
		| image |
	And I hover over widget 1 on row 1
	And I click on the widget's button with class ".edit-widget-settings"
	When I click on the "Duplicate" button
	Then row 1 should contain the widgets:
		| image |
		| image |