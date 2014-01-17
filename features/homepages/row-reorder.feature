Feature: Reorder rows
	As a content author
	I need to be able to reorder the rows on my homepage
	So that i can quickly restructure the order of my content without having to recreate it

Scenario: Move row 1 to row 2
	Given I have 2 rows
	And the order of the rows is:
		| row-1 |
		| row-2 |
	When I drag "row-1" to "row-2"
	Then the order of the rows should be:
		| row-2 |
		| row-1 |

Scenario: Move row 2 to row 1
	Given I have 2 rows
	And the order of the rows is:
		| row-1 |
		| row-2 |
	When I drag "row-2" to "row-1"
	Then the order of the rows should be:
		| row-2 |
		| row-1 |

Scenario: Move row 1 to row 3
	Given I have 3 rows
	And the order of the rows is:
		| row-1 |
		| row-2 |
		| row-3 |
	When I drag "row-1" to "row-3"
	Then the order of the rows should be:
		| row-2 |
		| row-3 |
		| row-1 |