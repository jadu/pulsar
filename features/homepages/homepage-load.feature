Feature: Load Homepage
  as a content author
  i need to be able to load a specific homepage or be presented with a blank homepage
  so that i can build a new homepage or edit an existing one

Scenario: Load a blank homepage
  Given I am on the homepages designer
  And I have not specified a homepage to load
  Then I should see 1 empty row

Scenario: Load the fillmurray homepage
  Given I am on the "fillmurray" homepage
  Then I should see the following rows:
    | row-1 |
    | row-2 |

Scenario: Rows on blank homepage should be droppable
  Given I am on the homepages designer
  Then all rows should be droppable

Scenario: Rows on test homepage should be droppable
  Given I am on the "fillmurray" homepage
  Then all rows should be droppable