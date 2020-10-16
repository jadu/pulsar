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
        $this->assertEquals('sanitise_extension', $this->ext->getName());
    }

    public function testSanitise() {
        $dataIn = '<button onclick="1" class="safe">safe <script>unsafe</script></button>';
        $dataOut = '<button class="safe">safe unsafe</button>';
        $this->assertEquals($dataOut, $this->ext->sanitise($dataIn));
    }

}