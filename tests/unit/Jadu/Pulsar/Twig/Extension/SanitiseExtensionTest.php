<?php

namespace Jadu\Pulsar\Twig\Extension;

class SanitiseExtensionTest extends \PHPUnit\Framework\TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->ext = new SanitiseExtension();
    }

    public function testGetName()
    {
        $this->assertEquals('sanitise', $this->ext->getName());
    }

}