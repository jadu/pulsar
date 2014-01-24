<?php

use Behat\Gherkin\Node\PyStringNode,
    Behat\Gherkin\Node\TableNode,
    Behat\Behat\Exception\PendingException,
    Behat\MinkExtension\Context\MinkContext;

/*
 * This file is part of the Behat.
 * (c) Konstantin Kudryashov <ever.zet@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Behat test suite context.
 *
 * @author      Konstantin Kudryashov <ever.zet@gmail.com>
 */
class FeatureContext extends MinkContext
{
    /**
     * Environment variable
     *
     * @var     string
     */
    private $env;

    /**
     * Last runned command name.
     *
     * @var     string
     */
    private $command;

    /**
     * Last runned command output.
     *
     * @var     string
     */
    private $output;

    /**
     * Last runned command return code.
     *
     * @var     integer
     */
    private $return;

    /**
     * XPath for the empty row which is created on certain actions
     * @var string
     */
    private $newRowXPath = "//div[contains(concat(' ', @class, ' '), ' widget-row-new ')]";

    /**
     * XPath for the widget drag handle which a user drags from the tray to the homepage
     * @var string
     */
    private $handleXPath = "//div[contains(concat(' ', @class, ' '), ' tray__detail ')]//div[contains(concat(' ', @class, ' '), ' ui-draggable ')]";

    /**
     * Initializes context.
     *
     * @param   array   $parameters
     */
    public function __construct(array $parameters = array())
    {
    }

    /**
     * @Given /^I am on the homepages designer$/
     * @Given /^I am editing an empty homepage$/
     */
    public function openHomepageDesigner()
    {
        $this->visit('/app/homepages');
        $this->lastRowID = 'row-1';
    }

    /**
     * @Given /^I am on the "([^"]*)" homepage$/
     */
    public function iAmOnTheHomepage($guid)
    {
        if(!$guid) {
           throw new \Exception('No homepage supplied');
        }
        $this->visit('/app/homepages/?homepage='.$guid);
    }

    /**
     * @When /^I click on the \"([^\"]*)\" button$/
     */
    public function iClickOnTheButton($arg1)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $button = $page->findButton($arg1);

        $button->click();
    }

    /**
     * @Given /^I click on the widget\'s button with class "([^"]*)"$/
     */
    public function iClickOnTheButtonWithClass($arg1)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();

        $lastWidget = $page->findById($this->lastWidgetId);

        if (!$lastWidget) {
            throw new \Exception('Widget "' . $this->lastWidgetId . '" not found');
        }

        $button = $lastWidget->find('css', $arg1);

        if (!$button || !$button->isVisible()) {
            throw new \Exception('Button "' . $arg1 . '" not found or not visible');
        }
        $button->click();
    }

    /**
     * @Given /^the \"([^\"]*)\" button should be toggled$/
     */
    public function assertButtonIsToggled($arg1)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $button = $page->findLink($arg1);

        if (!$button->hasClass('active')) {
            throw new \Exception('Button is not toggled');
        }
    }

    /**
     * @Given /^the \"([^\"]*)\" button should not be toggled$/
     */
    public function assertButtonNotToggled($arg1)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $button = $page->findLink($arg1);

        if ($button->hasClass('active')) {
            throw new \Exception('Button is toggled');
        }
    }


    /**
     * @Then /^the grid should be visible$/
     */
    public function assertGridIsVisible()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $grid = $page->find("css", ".grid-master");

        if (!$grid->isVisible()) {
            throw new \Exception('Grid is not visible');
        }
    }

    /**
     * @Given /^the grid is hidden$/
     * @Then /^the grid should be hidden$/
     */
    public function assertGridNotVisible()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $grid = $page->find("css", ".grid-master");

        if ($grid->isVisible()) {
            throw new \Exception('Grid is visible');
        }
    }

    /**
     * @Then /^the tray should be visible$/
     */
    public function assertTrayIsVisible()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $grid = $page->find("css", ".tray");

        if (!$grid->isVisible()) {
            throw new \Exception('Tray is not visible');
        }
    }

    /**
     * @Given /^the tray is hidden$/
     * @Then /^the tray should be hidden$/
     */
    public function assertTrayNotVisible()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $grid = $page->find("css", ".tray");

        if ($grid->isVisible()) {
            throw new \Exception('Tray is visible');
        }
    }

    /**
     * @Given /^the tray is visible$/
     */
    public function trayIsVisible()
    {
        $this->openHomepageDesigner();
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $link = $page->findLink('Widgets');
        $link->click();

        $this->assertTrayIsVisible();
    }

    /**
     * @When /^I open the tray$/
     */
    public function openTray()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $link = $page->findLink('Widgets');
        $link->click();
        
        $this->jQueryWait();
        $this->assertTrayIsVisible();
    }

    /**
     * @Given /^the tray is closed$/
     */
    public function closeTray()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $link = $page->findLink('Widgets');

        $this->assertTrayIsVisible();

        $link->click();
        
        $this->jQueryWait();
        $this->assertTrayNotVisible();
    }

    /**
     * @Then /^I should see a list of categories$/
     */
    public function iShouldSeeAListOfCategories()
    {
        $page = $this->getSession()->getPage();
        $category_list = $page->find("css", ".tray__categories");
        $categories = $category_list->findAll('css', 'li');

        if (!$categories) {
            throw new \Exception('No categories found');
        }
    }

    /**
     * @Then /^(?:|I )should see the categories:$/
     */
    public function iShouldSeeAllCategories(TableNode $fields)
    {
        $page = $this->getSession()->getPage();

        foreach ($fields->getRows() as $row) {
            foreach ($row as $value) {
                $category = $page->find('xpath', "//div[contains(concat(' ', @class, ' '), ' tray__categories ')]//li[contains(., '" . $value . "')]");
                if (!$category) {
                    throw new \Exception(sprintf('The category "%s" is not visible on this page, but it should be.', $value));
                }
            }
        }
    }

    /**
     * @When /^I click on the \"([^"]*)\" category$/
     */
    public function iClickOnTheCategory($arg1)
    {
        $page = $this->getSession()->getPage();
        $category = $page->find('xpath', "//div[contains(concat(' ', @class, ' '), ' tray__categories ')]//li[contains(., '" . $arg1 . "')]");
        $category->click();
    }

    /**
     * @When /^I click on the "([^"]*)" widget$/
     */
    public function iClickOnTheWidget($arg1)
    {
        $page = $this->getSession()->getPage();
        $widget = $page->find('xpath', "//div[contains(concat(' ', @class, ' '), ' tray__widgets ')]//li[contains(., '" . $arg1 . "')]");
        $widget->click();
    }

    /**
     * @Then /^(?:|I )should see the widgets:$/
     */
    public function iShouldSeeTheWidgets(TableNode $fields)
    {
        $page = $this->getSession()->getPage();

        foreach ($fields->getRows() as $row) {
            foreach ($row as $value) {
                $widget = $page->find('xpath', "//div[contains(concat(' ', @class, ' '), ' tray__widgets ')]//li[contains(., '" . $value . "')]");
                if (!$widget) {
                    throw new \Exception(sprintf('The widget "%s" is not visible on this page, but it should be.', $value));
                }
            }
        }
    }

    /**
     * @Then /^I should see the following rows:$/
     */
    public function iShouldSeeTheRows(TableNode $table)
    {
        $this->jqueryWait();
        $page = $this->getSession()->getPage();

        foreach ($table->getRows() as $row) {
            foreach ($row as $value) {
                $this->jQueryWait();
                $found = $page->find('css', '#'.$value);
                if (!$found) {
                    throw new \Exception('Could not find '.$value);
                }
            }
        }
    }

    /**
     * @Given /^row (\d+) contains the widgets:$/
     * @Given /^row (\d+) contains the widget:$/
     * @Then /^row (\d+) should contain the widgets:$/
     * @Then /^row (\d+) should contain the widget:$/
     */
    public function rowShouldContainTheWidgets($arg1, TableNode $fields)
    {
        $rows = $fields->getRows();

        foreach ($rows as $row) {
            foreach ($row as $value) {
                $widget = $this->getSession()->getPage()->find('xpath', "//div[contains(concat(' ', @class, ' '), ' widget-row ')][" . $arg1 . "]//div[@data-widget-guid='" . $value . "']");

                if (!$widget) {
                    throw new \Exception(sprintf('The widget "%s" is not visible on this page, but it should be.', $value));
                }
            }
        }
    }

    /**
     * @Then /^the new row should contain the widget:$/
     */
    public function newRowShouldContainTheWidget(TableNode $fields)
    {
        $guids = $fields->getRows();

        $page = $this->getSession()->getPage();
        $newRow = $page->find('css', '#' . $this->lastRowID);

        $this->jQueryWait();

        foreach ($guids as $guid) {
            foreach ($guid as $value) {
                $widget = $newRow->find('xpath', "//div[@data-widget-guid='" . $value . "']");

                if (!$widget) {
                    throw new \Exception(sprintf('The widget "%s" is not visible on this page, but it should be.', $value));
                }
            }
        }
    }

    /**
     * @Then /^the widget title should be "([^"]*)"$/
     */
    public function theWidgetTitleShouldBe($arg1)
    {
        $this->assertSession()->elementTextContains('css', '.widget__title', $arg1);
    }

    /**
     * @Given /^the drag handler "([^"]*)" attribute should be "([^"]*)"$/
     */
    public function theDragHandlerAttributeShouldBe($arg1, $arg2)
    {
        $page = $this->getSession()->getPage();
        $handle = $page->find('xpath', $this->handleXPath);

        $this->jQueryWait();

        if ($handle->getAttribute($arg1) != $arg2) {
            throw new \Exception('Attribute should be "' . $arg1 . '"');
        }
    }

    /**
     * @Then /^a new row should be created$/
     * @Given /^a new row has been created$/
     */
    public function aNewRowShouldBeCreated()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();

        $lastRow = $page->find('css', '.widget-row-new');

        $session = $this->getSession()->getDriver()->getWebDriverSession();
        $session->buttonup("");

        if (!$lastRow) {
            throw new \Exception('A new row was expected, but not found');
        }

        $widgets = $lastRow->findAll('css', '.homepage-widget');

        if ($widgets) {
            throw new \Exception('A new row has not been created or the row is not empty');
        }
    }

    /**
     * @When /^I drag the handle to row (\d+)$/
     */
    public function iDragTheHandleToRow($arg1)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $session = $this->getSession()->getDriver()->getWebDriverSession();

        $targetRow = "//div[contains(concat(' ', @class, ' '), ' ui-droppable ')][" . $arg1 . "]";

        $from = $session->element('xpath', $this->handleXPath);

        $session->moveto(array('element' => $from->getID()));
        $session->buttondown("");

        $to = $session->element('xpath', $targetRow);

        $session->moveto(array('element' => $to->getID()));
        $session->buttonup("");
    }

    /**
     * @When /^I drag the handle to the new row$/
     */
    public function iDragTheHandleToTheNewRow()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $session = $this->getSession()->getDriver()->getWebDriverSession();

        $from = $session->element('xpath', $this->handleXPath);

        $session->moveto(array('element' => $from->getID()));
        $session->buttondown("");

        $this->jQueryWait();
        $to = $session->element('xpath', $this->newRowXPath);

        $session->moveto(array('element' => $to->getID()));
        $session->buttonup("");

        // get last row's ID
        $this->jQueryWait();
        $this->rowXPath = $this->newRowXPath;
        $this->lastRowID = $to->getAttribute('id');
    }

     /**
     * @Given /^I start dragging the "([^"]*)" widget$/
     */
    public function iStartDraggingTheWidget($arg1)
    {
        $this->jQueryWait();
        $session = $this->getSession()->getDriver()->getWebDriverSession();

        $from = $session->element('xpath', $this->handleXPath);

        $session->moveto(array('element' => $from->getID()));
        $session->buttondown("");
    }

    /**
     * @When /^I stop dragging$/
     */
    public function iStopDragging()
    {
        $this->jQueryWait();
        $session = $this->getSession()->getDriver()->getWebDriverSession();
        $session->buttonup("");
    }

    /**
     * @Then /^the new row should be removed$/
     */
    public function theNewRowShouldBeRemoved()
    {
        $page = $this->getSession()->getPage();
        $newRow = $page->find('css', '.widget-row-new');

        if ($newRow) {
            throw new \Exception('New row present');
        }
    }


    /**
     * @Given /^I have at least one row$/
     */
    public function iHaveAtLeastOneRow()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $rows = $page->find('css', '.widget-row');

        if (!$rows) {
            throw new \Exception('Homepage has no rows');
        }
    }

    /**
     * @Given /^I have (\d+) rows$/
     */
    public function iHaveRows($count)
    {
        $this->jQueryWait();

        $this->openHomepageDesigner();
        $this->openTray();
        $this->iClickOnTheCategory('Bill Murray');
        $this->iClickOnTheWidget('Image');

        for ($i = 1; $i <= $count; $i++) {
            $this->iDragTheHandleToRow($i);
        }

        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $rowCount = sizeof($page->findAll('css', '.widget-row'));

        if ($rowCount != $count) {
            throw new \Exception(sprintf('%s rows were expected, but %d row(s) found', $count, $rowCount));
        }
    }

    /**
     * @Given /^I have a row with (\d+) widget(s?)$/
     */
    public function iHaveARowWithWidget($count)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();

        $this->openHomepageDesigner();
        $this->openTray();
        $this->iClickOnTheCategory('Bill Murray');
        $this->iClickOnTheWidget('Image');

        for ($i = 1; $i <= $count; $i++) {
            $this->jQueryWait();
            $this->iDragTheHandleToRow(1);
        }

        $this->lastRowID = 'row-1';
        sleep(1);
    }

    /**
     * @Then /^my rows should have the remove-row button$/
     */
    public function myRowsShouldHaveTheRemoveRowButton()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $rows = $page->findAll('css', '.widget-row');

        foreach ($rows as $row) {
            $removeRowButton = $row->find('css', '.row-handler .remove-row');
            if (!$removeRowButton) {
                throw new \Exception('Row does not have remove-row button');
            }
        }
    }

    /**
     * @When /^I click the remove button on row (\d+)$/
     */
    public function iClickTheRemoveButtonOnRow($rowNo)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $row = $page->find('xpath', "//div[contains(concat(' ', @class, ' '), ' widget-row ')][" . $rowNo . "]");

        if (!$row) {
            throw new \Exception('Row is not present, and it should be');
        }

        $removeButton = $row->find('css', '.remove-row');
        $removeButton->click();

        $this->rowNo = $rowNo;
    }

    /**
     * @When /^I click the row\'s "([^"]*)" button$/
     */
    public function iClickTheRowSButton($locator)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $row = $page->find('css', '#' . $this->lastRowID);

        if (!$row) {
            throw new \Exception('Row is not present, and it should be');
        }

        $button = $row->find('css', $locator);
        $button->click();

    }

    /**
     * @Then /^the widgets should fill the row$/
     */
    public function theWidgetsShouldFillTheRow()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $row = $page->find('css', '#' . $this->lastRowID);
        $rowHandler = $row->find('css', '.row-handler');

        if (!$row) {
            throw new \Exception('Row is not present, and it should be');
        }

        // get available width of row
        preg_match("/\bgrid-span-(\d+)\b/", $rowHandler->getAttribute('class'), $matches);
        $rowWidth = $matches[1];

        $widgets = $row->findAll('css', '.homepage-widget');

        if (!$widgets) {
            throw new \Exception('The row contains no widgets, it really should');
        }

        // wait for resize operation to complete
        $this->jQueryWait();

        $spanCount = 0;
        foreach ($widgets as $widget) {
            preg_match("/\bgrid-span-(\d+)\b/", $widget->getAttribute('class'), $matches);

            if (!$matches) {
                throw new \Exception('Could not find the widget grid width');
            }

            $spanCount += $matches[1];
        }

        if ($spanCount != $rowWidth) {
            throw new \Exception('Total widget spans do not equal the full width of the row');
        }
    }

    /**
     * @Given /^I remove widget (\d+) on row (\d+)$/
     */
    public function iRemoveWidgetOnRow($widgetNo, $rowNo)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();

        $this->iHoverOverWidgetOnRow($widgetNo, $rowNo);
        $this->jQueryWait();

        $removeButton = $page->find('xpath', "//div[@id='row-" . $rowNo . "']//div[contains(concat(' ', @class, ' '), ' homepage-widget ')][" . $widgetNo . "]//a[contains(concat(' ', @class, ' '), ' remove-widget ')]");

        $removeButton->click();
        $this->jQueryWait();
    }

    /**
     * @Given /^I hover over widget (\d+) on row (\d+)$/
     */
    public function iHoverOverWidgetOnRow($widgetNo, $rowNo)
    {
        $this->jQueryWait();
        sleep(1);

        $session = $this->getSession()->getDriver()->getWebDriverSession();

        $xpath = "//div[@id='row-" . $rowNo . "']//div[contains(concat(' ', @class, ' '), ' homepage-widget ')][" . $widgetNo . "]";

        $element = $session->element('xpath', $xpath);

        $session->moveto(array('element' => $element->getID()));

        $this->jQueryWait();


        $this->hoveredWidget = $xpath;
        $this->lastWidgetId = $element->getAttribute('id');
        $this->widgetNo = $widgetNo;
        $this->rowNo = $rowNo;
    }

    /**
     * @Given /^the resize handle should be visible$/
     */
    public function theResizeHandleShouldBeVisible()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $widget = $page->find('xpath', $this->hoveredWidget);
        $resizer = $widget->find('css', '.resizer');

        if (!$resizer->isVisible()) {
            throw new \Exception('Resize handle is not visible');
        }
    }

    /**
     * @Then /^the widget should be highlighted$/
     */
    public function theWidgetOnRowShouldBeHighlighted()
    {
        $this->jQueryWait();
        if (!$this->rowNo || !$this->widgetNo) {
            throw new \Exception('Required widget or row not found');
        }

        $page = $this->getSession()->getPage();
        $widget = $page->find('xpath', "//div[@id='row-" . $this->rowNo . "']//div[contains(concat(' ', @class, ' '), ' homepage-widget ')][" . $this->widgetNo . "]");

        $overlay = $widget->find('css', '.overlay');

        if (!$overlay->isVisible()) {
            throw new \Exception('Widget overlay is not visible');
        }
    }

    /**
     * @Then /^I should see the "([^"]*)" link$/
     */
    public function iShouldSeeTheAction($arg1)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $widget = $page->find('xpath', $this->hoveredWidget);
        $link = $widget->find('css', $arg1);

        if (!$link) {
            throw new \Exception('Link not found');
        }
    }

    /**
     * @Then /^I should see the "([^"]*)" button$/
     */
    public function iShouldSeeTheButton($arg1)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();

        $button = $page->findButton($arg1);

        if (!$button) {
            throw new \Exception('Button "' . $arg1 . '" not found');
        }
    }

    /**
     * @When /^I duplicate widget (\d+) on row (\d+)$/
     */
    public function iDuplicateWidgetOnRow($arg1, $arg2)
    {
        throw new PendingException();
    }

    /**
     * @Then /^the row should be removed$/
     */
    public function rowShouldBeRemoved()
    {
        $this->jQueryWait();

        if (!$this->rowNo) {
            throw new \Exception('Row number has not been set');
        }

        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $row = $page->find('css', '#row-' . $this->rowNo);

        if ($row) {
            throw new \Exception('Row has not been removed');
        }
    }

    /**
     * @Then /^I should see the "([^"]*)" modal$/
     */
    public function checkModalByID($arg1)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();

        $modal = $page->findById($arg1);

        if (!$modal || !$modal->isVisible()) {
            throw new \Exception('Modal "#' . $arg1 . '" not found, or is not visible');
        }
    }

    /**
     * @Then /^I should see the element "([^"]*)"$/
     */
    public function iShouldSeeTheElement($arg1)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();

        $element = $page->find('css', $arg1);

        if (!$element || !$element->isVisible()) {
            throw new \Exception('Element "' . $arg1 . '" not found, or is not visible');
        }
    }

    /**
     * @Then /^I should not see the element "([^"]*)"$/
     */
    public function iShouldNotSeeTheElement($arg1)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();

        $element = $page->find('css', $arg1);

        if ($element && $element->isVisible()) {
            throw new \Exception('Unexpected element "' . $arg1 . '" found');
        }
    }

    /**
     * @Then /^the row\'s "([^"]*)" button should be enabled$/
     */
    public function theRowSButtonShouldBeEnabled($locator)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();

        $row = $page->find('css', '#' . $this->lastRowID);
        $button = $row->find('css', $locator);

        if ($button->hasClass('disabled')) {
            throw new \Exception('The button is not active');
        }
    }

    /**
     * @Then /^the row\'s "([^"]*)" button should be disabled$/
     */
    public function theRowSButtonShouldBeDisabled($locator)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();

        $row = $page->find('css', '#' . $this->lastRowID);
        $button = $row->find('css', $locator);

        if (!$button->hasClass('disabled')) {
            throw new \Exception('The button is not disabled');
        }
    }



    /**
     * @Given /^the order of the rows is:$/
     * @Then /^the order of the rows should be:$/
     */
    public function theOrderOfTheRowsIs(TableNode $table)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $rows = $page->findAll('css', '.widget-row');

        $rowIDs = $table->getRows();
        $i = 0;

        foreach ($rows as $row) {
            if (!isset($rowIDs[$i][0])) {
                break;
            }
            if ($row->getAttribute('id') != $rowIDs[$i][0]) {
                throw new \Exception('Rows are not in correct order');
            }
            $i++;
        }

        return true;
    }

    /**
     * @When /^I drag "([^"]*)" to "([^"]*)"$/
     */
    public function iDragRowToRow($arg1, $arg2)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $session = $this->getSession()->getDriver()->getWebDriverSession();

        $from = $session->element('xpath', "//div[@id='" . $arg1 . "']//div");
        $to = $session->element('xpath', "//div[@id='" . $arg2 . "']//div");

        $session->moveto(array('element' => $from->getID()));
        $session->buttondown("");
        sleep(1);
        $session->moveto(array('element' => $to->getID()));
        $session->buttonup("");
    }

     /**
     * @Given /^I have not specified a homepage to load$/
     */
    public function iHaveNotSpecifiedAHomepageToLoad()
    {
        $this->jQueryWait();
        $url = $this->getSession()->getCurrentUrl();
        if(strstr($url, '?homepage=')) {
            throw new \Exception('A homepage parameter has been set');
        }
    }
    /**
     * @When /^I remove all widgets from the row$/
     */
    public function iRemoveAllWidgetsFromTheRow()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $session = $this->getSession()->getDriver()->getWebDriverSession();

        $row = $page->find('css', '#' . $this->lastRowID);

        if (!$row) {
            throw new \Exception(sprintf('Row "%s" was not found', $this->lastRowID));
        }

        $widgets = $row->findAll('css', '.homepage-widget');

        if (!$widgets) {
            throw new \Exception('The row contains no widgets');
        }

        foreach ($widgets as $widget) {
            $element = $session->element('xpath', $widget->getXpath($widget));
            $session->moveto(array('element' => $element->getID()));
            $removeButton = $widget->find('css', '.remove-widget');
            $removeButton->click();
        }
    }

    /**
     * @Then /^I should see (\d+) empty row$/
     */
    public function iShouldSeeEmptyRow($arg1)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $rows = $page->findAll('css', '.widget-row');

        if (sizeof($rows) != $arg1) {
            throw new \Exception('Not showing a single row');
        }
        foreach ($rows as $row) {
            $widgets = $row->find('css', '.homepage-widget');
            if ($widgets) {
                throw new \Exception('Row ' . $arg1 . ' contains widgets');
            }
        }
    }

    /**
     * @Then /^the row should still be visible$/
     */
    public function theRowShouldStillBeVisible()
    {
        $page = $this->getSession()->getPage();
        $row = $page->find('css', '#' . $this->lastRowID);

        if (!$row || !$row->isVisible()) {
            throw new \Exception('Row is not present or is not visible');
        }
    }

    /**
     * @Then /^the "([^"]*)" button should be disabled on rows:$/
     */
    public function theButtonShouldBeDisabledOnRows($locator, TableNode $table)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();

        foreach ($table->getRows() as $row) {
            foreach ($row as $value) {
                
                $homepagerow = $page->find('css', '#' . $value);
                $this->lastRowID = $value;

                if (!$homepagerow) {
                    throw new \Exception('Row not found');
                }

                $button = $homepagerow->find('css', $locator);

                if (!$button->hasClass('disabled')) {
                    throw new \Exception('The button is not disabled');
                }
            }
        }
    }

    /**
     * @Given /^the "([^"]*)" button should be enabled on rows:$/
     */
    public function theButtonShouldBeEnabledOnRows($locator, TableNode $table)
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();

        foreach ($table->getRows() as $row) {
            foreach ($row as $value) {
                
                $homepagerow = $page->find('css', '#' . $value);

                if (!$homepagerow) {
                    throw new \Exception('Row not found');
                }

                $button = $homepagerow->find('css', $locator);

                if ($button->hasClass('disabled')) {
                    throw new \Exception('The button is disabled');
                }
            }
        }
    }

    /**
     * @Then /^all rows should be droppable$/
     */
    public function allRowsShouldBeDroppable()
    {
        $this->jQueryWait();
        $page = $this->getSession()->getPage();
        $rows = $page->find('css', '.widget-row');

        if (!$rows) {
            throw new \Exception('No rows found');
        }

        foreach ($rows as $key => $row) {
            $this->jQueryWait();
            if (!$row->hasClass('ui-droppable')) {
                throw new \Exception(sprintf('Row "%s" is not droppable', $row->getAttribute('id')));
            }
        }
    }

    protected function jQueryWait($duration = 10000)
    {
        $this->getSession()->wait($duration, '(typeof(jQuery)=="undefined" || (0 === jQuery.active && 0 === jQuery(\':animated\').length))');
    }

    /**
     * Pauses the scenario until the user presses a key. Useful when debugging a scenario.
     *
     * @Then /^(?:|I )put a breakpoint$/
     */
    public function iPutABreakpoint()
    {
        fwrite(STDOUT, "\033[s    \033[93m[Breakpoint] Press \033[1;93m[RETURN]\033[0;93m to continue...\033[0m");
        while (fgets(STDIN, 1024) == '') {}
        fwrite(STDOUT, "\033[u");

        return;
    }

}
