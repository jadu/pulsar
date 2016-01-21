<?php

namespace Jadu\Pulsar\Twig\Macro;

use Jadu\Pulsar\Twig\Extension\ArrayExtension;
use Jadu\Pulsar\Twig\Extension\AttributeParserExtension;
use Jadu\Pulsar\Twig\Extension\ConfigExtension;
use Jadu\Pulsar\Twig\Extension\ConstantDefinedExtension;
use Jadu\Pulsar\Twig\Extension\RelativeTimeExtension;
use Jadu\Pulsar\Twig\Extension\UrlParamsExtension;
use Jadu\Pulsar\Twig\Extension\TabsExtension;
use Twig_Environment;
use Twig_Loader_Filesystem;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use RecursiveRegexIterator;
use RegexIterator;

class MacroTest extends \PHPUnit_Framework_TestCase
{
    protected $twig;

    public function setUp()
    {
        $baseDir = __DIR__ . '/../../../../../../';

        $loader = new Twig_Loader_Filesystem($this->getFixturesPath());
        $loader->addPath($baseDir . 'views', 'pulsar');

        $this->twig = new Twig_Environment($loader, array(
            'cache' => false,
            'strict_variables' => true,
        ));

        $this->twig->addExtension(new ArrayExtension());
        $this->twig->addExtension(new AttributeParserExtension());
        $this->twig->addExtension(new ConfigExtension($baseDir . 'pulsar.json'));
        $this->twig->addExtension(new ConstantDefinedExtension());
        $this->twig->addExtension(new RelativeTimeExtension());
        $this->twig->addExtension(new UrlParamsExtension(array()));
        $this->twig->addExtension(new TabsExtension());
    }

    private function getFixturesPath()
    {
        return __DIR__ . '/Fixtures/';
    }

    /**
     * @dataProvider getTestCases
     */
    public function testMacroOutput($templateFile)
    {
        // Use the same filename but remove .twig from the extension
        $expectedOutput = file_get_contents(substr($templateFile, 0, -5));

        // Remove fixture path from the template name
        $templateName = substr($templateFile, strlen($this->getFixturesPath()));

        $this->assertEquals($this->normalizeOutput($expectedOutput), $this->normalizeOutput($this->twig->render($templateName)));
    }

    /**
     * The Twig macros will often return unpretty HTML. This method normalizes the HTML
     * rendered by Twig and in the expected output file so that they match more loosely.
     *
     * @param string $output
     */
    private function normalizeOutput($output)
    {
        // Remove extra whitesapce
        $output = implode(' ', preg_split('/\s+/', trim($output)));

        // Remove extra whitespace within tags
        $output = preg_replace('/>\s+/', '>', $output);
        $output = preg_replace('/\s+</', '<', $output);

        return $output;
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
}
