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
    public function iAmOnTheHomepagesDesigner()
    {
        $this->visit('/app/homepages');
    }

    /**
     * @When /^I click on the \'([^\']*)\' button$/
     */
    public function iClickOnTheButton($arg1)
    {
        $this->clickLink($arg1);
    }

    /**
     * @Then /^the grid should be hidden$/
     */
    public function theGridShouldBeHidden()
    {
        $grid = $this->getSession()->getPage()->find("css", ".grid-master");

        if ($grid->isVisible()) {
            throw new \Exception('Grid is not hidden');
        }
    }

    /**
     * @Then /^the grid should be visible$/
     */
    public function theGridShouldBeVisible()
    {
        $grid = $this->getSession()->getPage()->find("css", ".grid-master");

        if (!$grid->isVisible()) {
            throw new \Exception('Grid is not visible');
        }
    }
}
