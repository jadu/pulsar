<?php

namespace Jadu\Pulsar\Twig\Extension;

use Twig_Environment;
use Twig_Loader_Array;

class GetConstantExtensionTest extends \PHPUnit\Framework\TestCase
{
    public function setUp()
    {
        $this->ext = new GetConstantExtension();

        defined('STRING') or define('STRING', 'foo');
        defined('BOOL') or define('BOOL', true);
        defined('INT') or define('INT', 42);
        defined('NULL') or define('NULL', null);
    }

    public function testGetName()
    {
        $this->assertEquals('get_constant_extension', $this->ext->getName());
    }

    public function testGetConstantFunction()
    {
        $loader = new Twig_Loader_Array(array(
            'index.html' => '{{ get_constant("STRING") }}',
        ));

        $twig = new Twig_Environment($loader);
        $twig->addExtension(new GetConstantExtension());

        $this->assertEquals('foo', $twig->render('index.html'));
    }

    public function testGetConstantReturnsNullFallbackByDefault()
    {
        $this->assertEquals(null, $this->ext->getConstant());
    }

    public function testGetUndefinedConstantReturnsNull()
    {
        $this->assertEquals(null, $this->ext->getConstant('WAT'));
    }

    public function testGetStringConstantReturnsString()
    {
        $this->assertEquals('foo', $this->ext->getConstant('STRING'));
    }

    public function testGetBoolConstantReturnsBool()
    {
        $this->assertEquals(true, $this->ext->getConstant('BOOL'));
    }

    public function testGetIntConstantReturnsInt()
    {
        $this->assertEquals(42, $this->ext->getConstant('INT'));
    }

    public function testGetNullConstantReturnsNull()
    {
        $this->assertEquals(null, $this->ext->getConstant('NULL'));
    }

    public function testGetConstantReturnsFallback()
    {
        $this->assertEquals('bar', $this->ext->getConstant(null, 'bar'));
    }
}
