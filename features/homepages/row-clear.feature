Feature: Clear row
	as a content author
	i need to able to clear a row of all widgets without removing the row
	so that i can quickly rewrite sections of my content without removing the rows entirely

Scenario: Rows should have clear-row button
	Given I am on the homepages designer
	And I have at least one row
	Then my rows should have the ".clear-row" button
	And the row's ".clear-row" button should be disabled

Scenario: Clear row button should be enabled if action is applicable
	Given I have a row with 1 widget
	Then the row's ".clear-row" button should be enabled

Scenario: Clear row button should be disabled after clearing row
	Given I have a row with 1 widget
	When I click on the row's ".clear-row" button
	Then the row should be empty
	And the row's ".clear-row" button should be disabled
