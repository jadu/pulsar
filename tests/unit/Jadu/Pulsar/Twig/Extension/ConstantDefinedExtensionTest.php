<?php

namespace Jadu\Pulsar\Twig\Extension;

use Twig_Environment;
use Twig_Loader_Array;

class ConstantDefinedExtensionTest extends \PHPUnit\Framework\TestCase
{
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
        $loader = new Twig_Loader_Array(array(
            'index.html' => '{% if constant_defined("FOO") %}true{% endif %}',
        ));

        $twig = new Twig_Environment($loader);
        $twig->addExtension(new ConstantDefinedExtension());

        define('FOO', true);

        $this->assertEquals('true', $twig->render('index.html'));
    }
}
