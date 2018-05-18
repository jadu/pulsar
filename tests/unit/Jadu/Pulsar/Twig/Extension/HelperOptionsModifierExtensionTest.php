<?php

namespace Jadu\Pulsar\Twig\Extension;

class HelperOptionsModifierExtensionTest extends \PHPUnit_Framework_TestCase
{
    public function setUp()
    {
        $this->ext = new HelperOptionsModifierExtension();
    }

    public function testGetName()
    {
        $this->assertEquals('modify_options', $this->ext->getName());
    }

    public function testNullReturnsFalse()
    {
        $this->assertEquals(false, $this->ext->modifyOptions(null));
    }

    public function testOptionsModifiedIfHelpSupplied()
    {
        $dataIn = array('help' => 'example help');
        $result = $this->ext->modifyOptions($dataIn);
        self::assertSame('example help', $result['help']);
        self::assertRegExp('/^guid-\d+$/', $result['help_id']);
    }

    public function testOptionsModifiedIfErrorSupplied()
    {
        $dataIn = array('error' => 'example error');
        $result = $this->ext->modifyOptions($dataIn);
        self::assertSame('example error', $result['error']);
        self::assertSame(true, $result['has_error']);
        self::assertRegExp('/^guid-\d+$/', $result['error_ids'][0]);
    }

    public function testOptionsModifiedIfHelpAndErrorSupplied()
    {
        $dataIn = array('error' => 'example error', 'help' => 'example help');
        $result = $this->ext->modifyOptions($dataIn);
        self::assertSame('example help', $result['help']);
        self::assertRegExp('/^guid-\d+$/', $result['help_id']);
        self::assertSame('example error', $result['error']);
        self::assertSame(true, $result['has_error']);
        self::assertRegExp('/^guid-\d+$/', $result['error_ids'][0]);
    }
}
