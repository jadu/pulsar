<?php

namespace Jadu\Pulsar\Twig\Macro;
require_once __DIR__ . '/../../vendor/autoload.php';

use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use RecursiveRegexIterator;
use RegexIterator;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Yaml\Parser;

class VisualRegressionTest
{

    public function setUp()
    {

    }

    private function getFixturesPath()
    {
        return __DIR__ . '/../../tests/unit/Jadu/Pulsar/Twig/Macro/Fixtures/';
    }

    /**
     * Recursively fetch test cases from within the fixtures directory.
     *
     * @return array
     */
    public function getTestCases()
    {
        $directory = new RecursiveDirectoryIterator($this->getFixturesPath());
        $iterator = new RecursiveIteratorIterator($directory);
        $regex = new RegexIterator($iterator, '/.*\.html\.twig$/i', RecursiveRegexIterator::GET_MATCH);

        $files = array();
        foreach ($regex as $result) {
            $files[] = array($result[0]);
        }

        return $files;
    }

    public function generateSpiderFile($testCases)
    {
        $parser = new Parser();
        $yaml = new Yaml();

        $yamlTestCases = [];
        $configFile = __DIR__ . '/../../wraith.yml';
        $endTestCase = end($testCases);

        foreach ($testCases as $testCase) {
            $testCasePath = explode('Fixtures/', $testCase[0])[1];
            $yamlTestCases[str_replace(array('/', '.'), '-', $testCasePath)] = '/' . $testCasePath;
        }

        $config = $parser->parse(file_get_contents($configFile));
        $config['paths'] = $yamlTestCases;

        file_put_contents($configFile, $yaml->dump($config));
    }

}

$test = new VisualRegressionTest();
$test->generateSpiderFile($test->getTestCases());
