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
    }

    /** @BeforeFeature */
    public static function setupFeature($event)
    {

    }

    /**
     * @BeforeScenario
     */
    public function before($event) {
        $this->jQueryWait();
    }

    /**
     * @Given /^I am on the "([^"]*)" tab$/
     */
    public function iAmOnTheTab($tabID)
    {
        $this->visit('/lexicon?tab=' . strtolower($tabID));
    }

    /**
     * @When /^I select table row (\d+)$/
     */
    public function iSelectTableRow($index)
    {
        $page = $this->getSession()->getPage();
        $checkbox = $page->find('xpath', "//div[contains(concat(' ', @class, ' '), ' is-active ')]//tr[" . $index . "]//input[@type='checkbox']");

        if (!$checkbox) {
            throw new \Exception('No checkbox found for row ' . $index);
        }

        $checkbox->check();
    }

    /**
     * @Then /^the "([^"]*)" checkbox should be indeterminate$/
     */
    public function theCheckboxShouldBeIndeterminate($attribute)
    {
        $page = $this->getSession()->getPage();

        $checkbox = $page->find('xpath', "//div[contains(concat(' ', @class, ' '), ' is-active ')]//input[@data-action='" . $attribute ."']");

        if ($checkbox->getAttribute('indeterminate') != true) {
            throw new \Exception('Checkbox should be indeterminate');
        }
    }


    // /**
    //  * @Then /^the "([^"]*)" store should contain:$/
    //  */
    // public function theStoreShouldContain($storageKey, TableNode $table)
    // {
    //     $session = $this->getSession();

    //     $storage = $session->evaluateScript("localStorage.getItem('" . $storageKey . "');");

    //     var_dump($storage);
    //     $this->iPutABreakpoint();
    // }

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
