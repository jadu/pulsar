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

        define('DEFAULT_FORM_THEME', 'form_div_layout.html.twig');
        
        define('VENDOR_DIR', realpath($baseDir . 'vendor'));
        define('VENDOR_FORM_DIR', VENDOR_DIR . '/symfony/form');
        define('VENDOR_TWIG_BRIDGE_DIR', VENDOR_DIR . '/symfony/twig-bridge');
        define('VIEWS_DIR', realpath(__DIR__ . '/../views'));
    }

    private function initForm ($input)
    {
        // Set up the Translation component
        $translator = new Translator('en');
        $translator->addLoader('xlf', new XliffFileLoader());
        $translator->addResource('xlf', VENDOR_FORM_DIR . '/Resources/translations/validators.en.xlf', 'en', 'validators');

        $loader1 = new \Twig\Loader\ArrayLoader([
            'index.html' => $input
        ]);
            
        $loader2 = new Twig_Loader_Filesystem(array(
            VIEWS_DIR,
            VENDOR_TWIG_BRIDGE_DIR . '/Resources/views/Form'
        ));

        $loader = new \Twig\Loader\ChainLoader([$loader1, $loader2]);

        $this->twig = new \Twig\Environment($loader,
            array(
                'cache' => false,
                'strict_variables' => true
            )
        );
        
        $this->twig->addExtension(new ArrayExtension());
        $this->twig->addExtension(new AttributeParserExtension());
        $this->twig->addExtension(new ConstantDefinedExtension());
        $this->twig->addExtension(new HelperOptionsModifierExtension());
        $this->twig->addExtension(new TranslationExtension($translator));

        $formEngine = new TwigRendererEngine(array(DEFAULT_FORM_THEME));
        $formEngine->setEnvironment($this->twig);

        $this->twig->addExtension(new FormExtension(new TwigRenderer($formEngine)));
        
        $this->twig->addRuntimeLoader(new \Twig_FactoryRuntimeLoader(array(
            \Symfony\Component\Form\FormRenderer::class => function () use ($formEngine) {
                return new \Symfony\Component\Form\FormRenderer($formEngine);
            },
        )));
        
        // Set up the Form component
        $this->formFactory = Forms::createFormFactoryBuilder()->getFormFactory();
    }

    private function renderForm ($input, $form)
    {
        
        return $this->twig->render('index.html', ['formTest' => $form->createView()]);
    }
    
    public function testBasicTextField ()
    {       
        $input = '{{ form_row(formTest.basic) }}';
        
        $this->initForm($input);

        $form = $this->formFactory->createBuilder()
            ->add('basic', TextType::class, array(
                'label' => 'Text field foo',
                'required' => false
            ))
            ->getForm();
            
        $expected = '<div><label for="form_basic">Text field</label><input type="text" id="form_basic" name="form[basic]" /></div>';
            
        $this->assertEquals($expected, $this->renderForm($input, $form));
    }
}