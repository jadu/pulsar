<?php

namespace Jadu\Pulsar\Twig\Extension;

use Twig_Environment;
use Twig_Loader_Array;

class ConstantDefinedExtensionTest extends \PHPUnit\Framework\TestCase
{
    public function setUp()
    {
        $this->ext = new ConstantDefinedExtension();
    }

    public function testGetName()
    {
        $this->assertEquals('constant_defined', $this->ext->getName());
    }
}
