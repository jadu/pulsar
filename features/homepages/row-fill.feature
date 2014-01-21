Feature: Fill row
	as a content author
	i need to be able to easily resize all widgets within a row to fit the full width of a row
	so that i can quickly adjust my content to fit the full width of the available container

Scenario: Fill row button enabled if fill action applicable
	Given I have a row with 1 widget
	Then the row's ".fill-row" button should be enabled

Scenario: Fill row button disabled if fill action not applicable
	Given I have a row with 5 widgets
	Then the row's ".fill-row" button should be disabled

Scenario: Widget should resize to fill row
	Given I have a row with 1 widget
	When I click the row's ".fill-row" button
	Then the widgets should fill the row

Scenario: auto-fill capability should be checked on initial homepage load
	Given I am on the "fillmurray" homepage
	Then the ".fill-row" button should be enabled on rows:
		| row-1 |
	And the ".fill-row" button should be disabled on rows:
		| row-2 |
	Then the widgets should fill the row

Scenario: auto-fill capability should be checked on initial homepage load
	Given I am on the "fillmurray" homepage
	Then the ".fill-row" button should be enabled on rows:
		| row-1 |
	And the ".fill-row" button should be disabled on rows:
		| row-2 |

Scenario: A blank homepage should have an empty row which can't be auto-filled
	Given I am on the homepages designer
	Then the ".fill-row" button should be disabled on rows:
		| row-1 |
