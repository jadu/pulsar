Feature: Widget remove
	As a content author 
	I need to be able to remove widgets
	So that I can remove unwanted content from my homepage quickly and easily

Scenario: Rows should be left intact when removing the last widget in a row
	Given I have a row with 1 widget
	When I remove all widgets from the row
	Then the row should still be visible
