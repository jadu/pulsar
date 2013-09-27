<?php

namespace Jadu\Pulsar\Twig\Extension;

class UrlParamsExtensionTest extends \PHPUnit_Framework_TestCase
{
    public function setUp()
    {
        $this->ext = new UrlParamsExtension();
    }

    public function testGetName()
    {
        $this->assertEquals('url_params_extension', $this->ext->getName());
    }

    public function testGetDefaultTab() 
    {
        $this->assertEquals(1, $this->ext->getActiveTab());
    }

    public function testGetActiveTab() 
    {
        $_GET['tab'] = 3;
        $this->assertEquals(3, $this->ext->getActiveTab());
    }

    public function testGetGlobals() 
    {
        $_GET['tab'] = 3;
        $key = 'active_tab';
        $globals = $this->ext->getGlobals();

        $this->assertArrayHasKey($key, $globals);
        $this->assertEquals(3, $globals[$key]);
    }
}
