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
     * Initializes context.
     *
     * @param   array   $parameters
     */
    public function __construct(array $parameters = array())
    {
        // $this->useContext('hooks', new Hooks());
        // $this->useContext('support', new Support());
    }

    /**
     * @When /^I do nothing$/
     */
    public function iDoNothing()
    {
    }

    /**
     * @Given /^I am on the homepages designer$/
     */
    public function openHomepageDesigner()
    {
        $this->visit('/app/homepages');
    }

    /**
     * @When /^I click on the \'([^\']*)\' button$/
     */
    public function iClickOnTheButton($arg1)
    {
        $this->jqueryWait();
        $page = $this->getSession()->getPage();
        $button = $page->findLink($arg1);

        $button->click();
    }

    /**
     * @Given /^the \'([^\']*)\' button should be toggled$/
     */
    public function theButtonShouldBeToggled($arg1)
    {
        $page = $this->getSession()->getPage();
        $button = $page->findLink($arg1);

        if (!$button->hasClass('active')) {
            throw new \Exception('Button is not toggled');
        }
    }

    /**
     * @Given /^the \'([^\']*)\' button should not be toggled$/
     */
    public function theButtonShouldNotBeToggled($arg1)
    {
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
        $this->spin(function($context) {
            $page = $this->getSession()->getPage();
            $grid = $page->find("css", ".grid-master");

            if (!$grid->isVisible()) {
                throw new \Exception('Grid is not visible');
            }

            return true;
        });
    }

    /**
     * @Given /^the grid is hidden$/
     * @Then /^the grid should be hidden$/
     */
    public function assertGridNotVisible()
    {
        $this->spin(function($context) {
            $page = $this->getSession()->getPage();
            $grid = $page->find("css", ".grid-master");

            if ($grid->isVisible()) {
                throw new \Exception('Grid is visible');
            }

            return true;
        });
    }

    /**
     * @Then /^the tray should be visible$/
     */
    public function assertTrayIsVisible()
    {
        $this->jqueryWait();        
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
        $this->jqueryWait();
        $page = $this->getSession()->getPage();
        $grid = $page->find("css", ".tray");

        if ($grid->isVisible()) {
            throw new \Exception('Tray is visible');
        }
    }

    /**
     * @Given /^the tray is visible$/
     */
    public function openTray() 
    {
        $this->openHomepageDesigner();
        $this->jqueryWait();
        $page = $this->getSession()->getPage();
        $link = $page->findLink('Widgets');
        $link->click();

        $this->assertTrayIsVisible();
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
     * @Given /^row (\d+) contains the widgets:$/
     * @Given /^row (\d+) contains the widget:$/
     * @Then /^row (\d+) should contain the widgets:$/
     * @Then /^row (\d+) should contain the widget:$/
     */
    public function rowShouldContainTheWidgets($arg1, TableNode $fields)
    {
        $rows = $fields->getRows();

        $this->spin(function ($context) use ($arg1,$rows) {
            foreach ($rows as $row) {
                foreach ($row as $value) {
                    $widget = $this->getSession()->getPage()->find('xpath', "//div[contains(concat(' ', @class, ' '), ' widget-row ')][" . $arg1 . "]//div[@data-widget-guid='" . $value . "']");

                    if (!$widget) {
                        throw new \Exception(sprintf('The widget "%s" is not visible on this page, but it should be.', $value));
                    }
                }
            }
            return true;
        });
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
        $handle = $page->find('css', '.tray__detail .ui-draggable');
        $this->jqueryWait();

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
        
        $page = $this->getSession()->getPage();
        
        $this->jqueryWait();

        $lastRow = $page->find('css', '.widget-row-new');
        $widgets = $lastRow->find('css', '.homepage-widget');

        if ($widgets) {
            throw new \Exception('A new row has not been created or the row is not empty');
        }
    }

    /**
     * @When /^I drag the handle to row (\d+)$/
     */
    public function iDragTheHandleToRow($arg1)
    {
        $page = $this->getSession()->getPage();
        $session = $this->getSession()->getDriver()->getWebDriverSession();

        $handle = $page->find('css', '.tray__detail .ui-draggable');
        $target = $page->find('xpath', "//div[contains(concat(' ', @class, ' '), ' ui-droppable ')][" . $arg1 . "]");
        
        $this->jqueryWait();
        
        $from = $session->element('xpath',$handle->getXpath());
        $to = $session->element('xpath',$target->getXpath());
        //now perform drag and drop
        $session->moveto(array('element' => $from->getID())); //move to source location, using reference to source element
        $session->buttondown(""); //click mouse to start drag, defaults to left mouse button
        $session->moveto(array('element' => $to->getID())); //move to target location, using reference to target element
        $session->buttonup(""); //release mouse to complete drag and drop operation
    }


    protected function jqueryWait($duration = 10000)
    {
        $this->getSession()->wait($duration, '(typeof(jQuery)=="undefined" || (0 === jQuery.active && 0 === jQuery(\':animated\').length))');
    }

    public function spin ($lambda, $wait = 10)
    {
        for ($i = 0; $i < $wait; $i++)
        {
            try {
                if ($lambda($this)) {
                    return true;
                }
            } catch (Exception $e) {
                // do nothing
            }

            sleep(1);
        }

        $backtrace = debug_backtrace();

        throw new Exception(
            "Timeout thrown by " . $backtrace[1]['class'] . "::" . $backtrace[1]['function'] . "()\n" .
            $backtrace[1]['file'] . ", line " . $backtrace[1]['line']
        );
    }
}
