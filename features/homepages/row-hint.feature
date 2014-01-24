Feature: Load Homepage
  as a content author
  i need to be able to see instructional text explaining what to do on an empty homepage
  so that i quickly understand how to add widgets to my homepage

Scenario: First row in an empty homepage should tell user what to do
  Given I am on the homepages designer
  Then I should see the element ".row-hint"

 Scenario: Adding a widget to the first row should remove the hint
  Given I have a row with 1 widget
  Then I should not see the element ".row-hint"