Feature: Removing rows
	as a content author 
	i need to be warned if i attempt to delete a row which contains widgets and have to confirm whether i would like to proceed
	so that i understand the impact of my action and the effect it will have on the contents of the row 

Scenario: rows should have remove button
	Given I am on the homepages designer
	And I have at least one row
	Then my rows should have the remove-row button

Scenario: removing empty row should remove silently
	Given the tray is visible
	And I remove widget 1 on row 1
	When I click the remove button on row 1
	Then the row should be removed

Scenario: removing non-empty row should ask for confirmation
	Given the tray is visible
	When I click on the "Bill Murray" category
	And I click on the "Image" widget
	And I drag the handle to row 1
	When I click the remove button on row 1
	Then I should see the "remove_row_modal" modal

	