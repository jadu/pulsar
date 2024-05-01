<?php

namespace Jadu\Pulsar\Twig\Extension;

use \Twig\Environment;
use Twig\Loader\ArrayLoader;

class ConstantDefinedExtensionTest extends \PHPUnit\Framework\TestCase
{
    public $ext;

    public function setUp(): void
    {
        $this->ext = new ConstantDefinedExtension();
    }

    public function testGetName()
    {
        $this->assertEquals('constant_defined', $this->ext->getName());
    }

    public function testConstantDefinedFunction()
    {
        $loader = new \Twig\Loader\ArrayLoader(array(
            'index.html' => '{% if constant_defined("FOO") %}true{% endif %}',
        ));

        $twig = new \Twig\Environment($loader);
        $twig->addExtension(new ConstantDefinedExtension());

        define('FOO', true);

        $this->assertEquals('true', $twig->render('index.html'));
    }
}
