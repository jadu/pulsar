<?php

namespace Jadu\Pulsar\Twig\Extension;

class UrlParamsExtensionTest extends \PHPUnit_Framework_TestCase
{
    public function setUp()
    {
        $this->ext = new UrlParamsExtension(array());
    }

    public function testGetName()
    {
        $this->assertEquals('url_params_extension', $this->ext->getName());
    }

    public function testGetDefaultTab() 
    {
        $this->assertEquals(null, $this->ext->getActiveTab());
    }

    public function testGetActiveTab() 
    {
        $ext = new UrlParamsExtension(array('tab' => 3));
        $this->assertEquals(3, $ext->getActiveTab());
    }

    public function testGetGlobals() 
    {
        $key = 'active_tab';

        $ext = new UrlParamsExtension(array('tab' => 3));
        $globals = $ext->getGlobals();

        $this->assertArrayHasKey($key, $globals);
        $this->assertEquals(3, $globals[$key]);
    }
}
