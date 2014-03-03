Feature: Datagrid selected items
	as a jadu administrator
	i need to be able to select an item, or multiple items
	so that i can perform actions on them

Scenario: Selected item should set indeterminate state on select-all checkbox
	Given I am on the "Filters" tab
	When I select table row 1
	Then the "select-all" checkbox should be indeterminate