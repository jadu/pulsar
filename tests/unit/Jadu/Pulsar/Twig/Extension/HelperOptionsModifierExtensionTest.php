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
        $dataOut = array('help' => 'example help', 'help_id' => 'guid-1');
        $result = $this->ext->modifyOptions($dataIn);
        self::assertSame('example help', $result['help']);
        self::assertRegExp('/^guid-\d+$/', $result['help_id']);
    }

    public function testOptionsModifiedIfErrorSupplied()
    {
        $dataIn = array('error' => 'example error');
        $dataOut = array('error' => 'example error', 'has_error' => true, 'error_ids' => array('guid-2'));
        $result = $this->ext->modifyOptions($dataIn);
        self::assertSame('example error', $result['error']);
        self::assertSame(true, $result['has_error']);
        self::assertRegExp('/^guid-\d+$/', $result['error_ids'][0]);
    }

    public function testOptionsModifiedIfHelpAndErrorSupplied()
    {
        $dataIn = array('error' => 'example error', 'help' => 'example help');
        $dataOut = array('error' => 'example error', 'has_error' => true, 'help' => 'example help', 'help_id' => 'guid-3', 'error_ids' => array('guid-3'));
        $result = $this->ext->modifyOptions($dataIn);
        self::assertSame('example help', $result['help']);
        self::assertRegExp('/^guid-\d+$/', $result['help_id']);
        self::assertSame('example error', $result['error']);
        self::assertSame(true, $result['has_error']);
        self::assertRegExp('/^guid-\d+$/', $result['error_ids'][0]);
    }
}
