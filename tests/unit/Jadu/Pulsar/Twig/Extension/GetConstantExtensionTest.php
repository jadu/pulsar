<?php

namespace Jadu\Pulsar\Twig\Extension;

class GetConstantExtensionTest extends \PHPUnit_Framework_TestCase
{
    public function setUp()
    {
        $this->ext = new GetConstantExtension(array());
        define('STRING', 'foo');
        define('BOOL', true);
        define('INT', 42);
        define('NULL', null);
    }

    public function testGetName()
    {
        $this->assertEquals('get_constant_extension', $this->ext->getName());
    }

    public function testGetConstantReturnsNullByDefault()
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
}
