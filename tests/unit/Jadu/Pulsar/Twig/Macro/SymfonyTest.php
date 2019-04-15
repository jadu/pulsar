<?php

namespace Jadu\Pulsar\Twig\Macro;

use Jadu\Pulsar\Twig\Extension\ArrayExtension;
use Jadu\Pulsar\Twig\Extension\AttributeParserExtension;
use Jadu\Pulsar\Twig\Extension\ConfigExtension;
use Jadu\Pulsar\Twig\Extension\ConstantDefinedExtension;
use Jadu\Pulsar\Twig\Extension\GetConstantExtension;
use Jadu\Pulsar\Twig\Extension\HelperOptionsModifierExtension;
use Jadu\Pulsar\Twig\Extension\RelativeTimeExtension;
use Jadu\Pulsar\Twig\Extension\UrlParamsExtension;
use Jadu\Pulsar\Twig\Extension\TabsExtension;

use Symfony\Component\Validator\Validation;
use Symfony\Bridge\Twig\Form\TwigRendererEngine;
use Symfony\Component\Form\Forms;
use Symfony\Component\Form\FormRenderer;
use Symfony\Component\Form\Extension\Validator\ValidatorExtension;
use Symfony\Component\Form\Extension\Csrf\CsrfExtension;
use Symfony\Component\Security\Csrf\CsrfTokenManager;
use Symfony\Component\Translation\Translator;
use Symfony\Component\Translation\Loader\XliffFileLoader;
use Symfony\Bridge\Twig\Extension\TranslationExtension;
use Symfony\Bridge\Twig\Extension\FormExtension;
use Symfony\Bridge\Twig\Form\TwigRenderer;

use Symfony\Component\Form\Extension\Core\Type\TextType;

use Twig_Environment;
use Twig_Loader_Filesystem;
use Twig_Loader_Array;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use RecursiveRegexIterator;
use RegexIterator;

class SymfonyTest extends \PHPUnit\Framework\TestCase
{
    protected $twig;

    public function setUp()
    {
        $baseDir = __DIR__ . '/../../../../../../';

        define('DEFAULT_FORM_THEME', 'pulsar.html.twig');
        
        define('FIXTURES_DIR', realpath(__DIR__ . '/Fixtures/'));
        define('VENDOR_DIR', realpath($baseDir . 'vendor'));
        define('VENDOR_FORM_DIR', VENDOR_DIR . '/symfony/form');
        define('VENDOR_TWIG_BRIDGE_DIR', VENDOR_DIR . '/symfony/twig-bridge');
        define('VIEWS_DIR', realpath($baseDir . 'views'));
        
        // Set up the Translation component
        $translator = new Translator('en');
        $translator->addLoader('xlf', new XliffFileLoader());
        $translator->addResource('xlf', VENDOR_FORM_DIR . '/Resources/translations/validators.en.xlf', 'en', 'validators');
            
        $loader = new Twig_Loader_Filesystem(array(
            __DIR__,
            FIXTURES_DIR,
            VENDOR_TWIG_BRIDGE_DIR . '/Resources/views/Form',
            VIEWS_DIR,
        ));
        
        $loader->addPath($baseDir . 'views', 'pulsar');
        $loader->addPath($baseDir . 'tests/css', 'cssTests');
        
        // $loader = new \Twig\Loader\ChainLoader([$loader1, $loader2]);
        
        $this->twig = new \Twig\Environment($loader,
            array(
                'cache' => false,
                'debug' => true,
                'strict_variables' => true
                )
            );
        
        $this->twig->addExtension(new ArrayExtension());
        $this->twig->addExtension(new AttributeParserExtension());
        $this->twig->addExtension(new ConfigExtension($baseDir . 'pulsar.json'));
        $this->twig->addExtension(new ConstantDefinedExtension());
        $this->twig->addExtension(new HelperOptionsModifierExtension());
        $this->twig->addExtension(new TranslationExtension($translator));
        $this->twig->addExtension(new \Twig\Extension\DebugExtension());

        $formEngine = new TwigRendererEngine(array(DEFAULT_FORM_THEME));

        $formEngine->setEnvironment($this->twig);

        $this->twig->addExtension(new FormExtension(new TwigRenderer($formEngine)));
        
        $this->twig->addRuntimeLoader(new \Twig_FactoryRuntimeLoader(array(
            \Symfony\Component\Form\FormRenderer::class => function () use ($formEngine) {
                return new \Symfony\Component\Form\FormRenderer($formEngine);
            },
        )));
        
        // // Set up the Form component
        $this->formFactory = Forms::createFormFactoryBuilder()->getFormFactory();
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

        // Normalise random ids generated and used by help text
        $output = preg_replace('/(guid-)\w+/', 'guid-1', $output);
        
        return $output;
    }

    public function compareOutput($input, $form, $fixture)
    {
        $expected = $this->normalizeOutput($this->twig->render('form/' . $fixture));
        preg_match("/<body[^>]*>(.*?)<\/body>/is", $expected, $expectedMatches);
        
        $actual = $this->twig->render('symfony.html.twig', ['formTest' => $form->createView()]);
        preg_match("/<form[^>]*>(.*?)<\/form>/is", $actual, $actualMatches);
        
        $this->assertEquals($this->normalizeOutput($expectedMatches[1]), $this->normalizeOutput($actualMatches[1]));
    }
    
    public function testTextFieldBasic ()
    {
        $input = '{{ form_row(formTest.field) }}';

        $form = $this->formFactory->createBuilder()
            ->add('field', TextType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();
            
        $this->compareOutput($input, $form, 'text-label.html.twig');
    }

    public function testTextFieldHelp ()
    {
        $input = '{{ form_row(formTest.field) }}';

        $form = $this->formFactory->createBuilder()
            ->add('field', TextType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();
            
        $this->compareOutput($input, $form, 'text-help.html.twig');
    }
}
