<?php

namespace Jadu\Pulsar\Symfony;

use Jadu\Pulsar\Twig\Extension\ArrayExtension;
use Jadu\Pulsar\Twig\Extension\AttributeParserExtension;
use Jadu\Pulsar\Twig\Extension\ConfigExtension;
use Jadu\Pulsar\Twig\Extension\ConstantDefinedExtension;
use Jadu\Pulsar\Twig\Extension\HelperOptionsModifierExtension;
use PHPUnit\Framework\TestCase;
use Symfony\Bridge\Twig\Extension\FormExtension;
use Symfony\Bridge\Twig\Extension\TranslationExtension;
use Symfony\Bridge\Twig\Form\TwigRenderer;
use Symfony\Bridge\Twig\Form\TwigRendererEngine;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormRenderer;
use Symfony\Component\Form\Forms;
use Symfony\Component\Translation\Loader\XliffFileLoader;
use Symfony\Component\Translation\Translator;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Extension\DebugExtension;
use Twig_FactoryRuntimeLoader;
use Twig_Loader_Filesystem;

define('DEFAULT_FORM_THEME', 'pulsar.html.twig');
define('FIXTURES_DIR', realpath(__DIR__ . '/../Twig/Macro/Fixtures/'));

abstract class Symfony_TestCase extends TestCase
{
    /**
     * @var Environment
     */
    protected $twig;

    /**
     * @var FormFactoryInterface
     */
    protected $formFactory;

    /**
     * @throws LoaderError
     */
    protected function setUp()
    {
        $baseDir = __DIR__ . '/../../../../..';

        // Set up the Translation component
        $translator = new Translator('en');
        $translator->addLoader('xlf', new XliffFileLoader());
        $translator->addResource('xlf', $baseDir . '/vendor/symfony/form/Resources/translations/validators.en.xlf', 'en', 'validators');

        $loader = new Twig_Loader_Filesystem(
            array(
                __DIR__,
                FIXTURES_DIR,
                $baseDir . '/vendor/symfony/twig-bridge/Resources/views/Form',
                $baseDir . '/views',
            )
        );

        $loader->addPath($baseDir . '/views', 'pulsar');
        $loader->addPath($baseDir . '/tests/css', 'cssTests');

        $this->twig = new Environment(
            $loader,
            array(
                'cache' => false,
                'debug' => true,
                'strict_variables' => true,
            )
        );

        $this->twig->addExtension(new ArrayExtension());
        $this->twig->addExtension(new AttributeParserExtension());
        $this->twig->addExtension(new ConfigExtension($baseDir . '/pulsar.json'));
        $this->twig->addExtension(new ConstantDefinedExtension());
        $this->twig->addExtension(new HelperOptionsModifierExtension());
        $this->twig->addExtension(new TranslationExtension($translator));
        $this->twig->addExtension(new DebugExtension());

        $formEngine = new TwigRendererEngine(array(DEFAULT_FORM_THEME));
        $formEngine->setEnvironment($this->twig);

        $this->twig->addExtension(new FormExtension(new TwigRenderer($formEngine)));

        $this->twig->addRuntimeLoader(
            new Twig_FactoryRuntimeLoader(
                array(
                    FormRenderer::class => function () use ($formEngine) {
                        return new FormRenderer($formEngine);
                    },
                )
            )
        );

        // // Set up the Form component
        $this->formFactory = Forms::createFormFactoryBuilder()->getFormFactory();
    }

    /**
     * The Twig macros will often return unpretty HTML. This method normalizes the HTML
     * rendered by Twig and in the expected output file so that they match more loosely.
     *
     * @param string $output
     *
     * @return string|null
     */
    private function normalizeOutput($output)
    {
        // Remove extra whitesapce
        $output = implode(' ', preg_split('/\s+/', trim($output)));

        // Remove extra whitespace within tags
        $output = preg_replace('/>\s+/', '>', $output);
        $output = preg_replace('/\s+</', '<', $output);

        // Normalise random ids generated and used by help text
        $output = preg_replace('/(guid-)\w+/', 'guid-1', $output);

        // Move the type attribute to the start
        $inputs = explode('<input', $output);
        foreach ($inputs as $i => $input) {
            $matches = [];
            preg_match('/\stype=([^\s]*)/', $input, $matches);
            $inputs[$i] = reset($matches) . preg_replace('/\stype=([^\s]*)/', '', $input, 1);
        }

        $output = implode('<input', $inputs);

        // Switch around class and value when they're in the wrong order
        $output = preg_replace('/\sclass="([^"]*)"\svalue="([^"]*)"/', ' value="$2" class="$1"', $output);

        return $output;
    }

    /**
     * @param FormInterface $form
     * @param string $fixture
     *
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function compareOutput($form, $fixture)
    {
        $expected = $this->normalizeOutput($this->twig->render('form/' . $fixture));
        preg_match("/<body[^>]*>(.*?)<\/body>/is", $expected, $expectedMatches);

        $actual = $this->twig->render('symfony.html.twig', ['formTest' => $form->createView()]);
        preg_match("/<form[^>]*>(.*?)<\/form>/is", $actual, $actualMatches);

        $this->assertEquals($this->normalizeOutput($expectedMatches[1]), $this->normalizeOutput($actualMatches[1]));
    }

    function test_common()
    {
        $this->assertTrue(true);
    }
}
