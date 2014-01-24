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

Scenario: Confirmation modal shown when attempting to clear a row
	Given I have a row with 1 widget
	When I click on the row's ".clear-row" button
	Then I should see the "clear_row_modal" modal

Scenario: Clear row button should be disabled after clearing row
	Given I have a row with 1 widget
	When I clear the row
	Then the row should be empty
	And the row's ".clear-row" button should be disabled

Scenario: Clear action should only affect the parent row
	Given I am on the "fillmurray" homepage
	When I clear row 2
	Then the row should be empty
	And row 1 should not be empty