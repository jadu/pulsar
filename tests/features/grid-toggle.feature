Feature: Toggle Grid
	as a content author 
	i need to be able to see how my homepage grid is structured with columns and gutters
	so that i can properly visualise the underlying design structure of my website and get an idea of the constraints within which i can move and resize widgets

Scenario: Grid visible by default
	Given I am on the homepages designer
	When I do nothing
	Then the grid should be visible

Scenario: Hide grid
	Given I am on the homepages designer
	When I click on the 'Hide Grid' button
	Then the grid should be hidden

Scenario: Show grid
	Given I am on the homepages designer
	When I click on the 'Show Grid' button
	Then the grid should be visible