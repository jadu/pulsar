<?php

namespace Jadu\Pulsar\Twig\Extension;

class UrlParamsExtensionTest extends \PHPUnit\Framework\TestCase
{
    public function setUp(): void
    {
        parent::setUp();
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

    public function testView()
    {
        $ext = new UrlParamsExtension(array('view' => 'foo'));
        $this->assertEquals('foo', $ext->getView());
    }

    public function testGetGlobals()
    {
        $ext = new UrlParamsExtension(array('tab' => 3, 'theme' => 'foo', 'view' => 'foo'));
        $globals = $ext->getGlobals();

        $this->assertArrayHasKey('active_tab', $globals);
        $this->assertEquals(3, $globals['active_tab']);

        $this->assertArrayHasKey('view', $globals);
        $this->assertEquals('foo', $globals['view']);
    }
}
