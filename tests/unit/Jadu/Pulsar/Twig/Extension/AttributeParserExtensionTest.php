<?php

namespace Jadu\Pulsar\Twig\Extension;

class AttributeParserExtensionTest extends \PHPUnit\Framework\TestCase
{
    public $ext;

    public function setUp(): void
    {
        parent::setUp();
        $this->ext = new AttributeParserExtension(array());
    }

    public function testGetName()
    {
        $this->assertEquals('attribute_parser_extension', $this->ext->getName());
    }

    public function testParseAttributesReturnsFalseIfNoAttributesSupplied()
    {
        $tests = array('', false, null, array());
        foreach ($tests as $test) {
            $this->assertEquals(false, $this->ext->parseAttributes($test));
        }
    }

    public function testParseAttributesReturnsFalseIfEmptyStringSupplied()
    {
        $this->assertEquals(false, $this->ext->parseAttributes(''));
    }

    public function testParseAttributesReturnsFalseIfEmptyArraySupplied()
    {
        $this->assertEquals(false, $this->ext->parseAttributes([]));
    }

    public function testParseAttributesParsesSingleAttribute()
    {
        $dataIn = array('slim' => 'shady');
        $dataOut = ' slim="shady"';
        $this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
    }

    public function testParseAttributesParsesMultipleAttributes()
    {
        $dataIn = array('slim' => 'shady', 'marshall' => 'mathers', 'eminem' => true);
        $dataOut = ' slim="shady" marshall="mathers" eminem';
        $this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
    }

    public function testParseAttributesEscapesDoubleQuotes()
    {
        $dataIn = array('foo' => 'bar"baz');
        $dataOut = ' foo="bar&quot;baz"';
        $this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
    }

    public function testParseAttributesConvertsHtmlEntities()
    {
        $dataIn = array('foo' => '<span>bar</span> <blink>baz</blink>');
        $dataOut = ' foo="&lt;span&gt;bar&lt;/span&gt; &lt;blink&gt;baz&lt;/blink&gt;"';
        $this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
    }

    public function testParseAttributesRemovesAttributeWithEmptyValues()
    {
        $dataIn = array('foo' => '');
        $dataOut = '';
        $this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
    }

    public function testParseAttributesRemovesAttributesWithNullValues()
    {
        $dataIn = array('foo' => null);
        $dataOut = '';
        $this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
    }

    public function testParseAttributesTransformsTrueBooleanAttribute()
    {
        $dataIn = array('foo' => true);
        $dataOut = ' foo';
        $this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
    }

    public function testParseAttributesIgnoresFalseBooleanAttribute()
    {
        $dataIn = array('foo' => false);
        $dataOut = '';
        $this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
    }

    public function testParseAttributesIgnoresArrayValues()
    {
        $dataIn = array('foo' => array('bar'));
        $dataOut = '';
        $this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
    }

    public function testParseAttributesAllowsZeroStrings()
    {
        $dataIn = array('foo' => '0');
        $dataOut = ' foo="0"';
        $this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
    }

    public function testDisabledAddsDisabledClass()
    {
        $dataIn = array('disabled' => true);
        $dataOut = ' class="is-disabled"';
        $this->assertStringContainsString($dataOut, $this->ext->parseAttributes($dataIn));
    }

    public function testDisabledAddsDisabledClassToButton()
    {
        $dataIn = array('disabled' => true);
        $dataOut = ' disabled';
        $this->assertStringContainsString($dataOut, $this->ext->parseAttributes($dataIn, array('tag' => 'button')));
    }

    public function testDisabledAddsDisabledClassToFieldset()
    {
        $dataIn = array('disabled' => true);
        $dataOut = ' disabled';
        $this->assertStringContainsString($dataOut, $this->ext->parseAttributes($dataIn, array('tag' => 'fieldset')));
    }

    public function testDisabledAddsDisabledClassToInput()
    {
        $dataIn = array('disabled' => true);
        $dataOut = ' disabled';
        $this->assertStringContainsString($dataOut, $this->ext->parseAttributes($dataIn, array('tag' => 'input')));
    }

    public function testDisabledAddsDisabledClassToOption()
    {
        $dataIn = array('disabled' => true);
        $dataOut = ' disabled';
        $this->assertStringContainsString($dataOut, $this->ext->parseAttributes($dataIn, array('tag' => 'option')));
    }

    public function testDisabledAddsDisabledClassToSelect()
    {
        $dataIn = array('disabled' => true);
        $dataOut = ' disabled';
        $this->assertStringContainsString($dataOut, $this->ext->parseAttributes($dataIn, array('tag' => 'select')));
    }

    public function testDisabledAddsDisabledClassToTextarea()
    {
        $dataIn = array('disabled' => true);
        $dataOut = ' disabled';
        $this->assertStringContainsString($dataOut, $this->ext->parseAttributes($dataIn, array('tag' => 'textarea')));
    }

    public function testDisabledDoesNotAddDisabledClassToDiv()
    {
        $dataIn = array('disabled' => true);
        $dataOut = ' disabled';
        $this->assertStringNotContainsString($dataOut, $this->ext->parseAttributes($dataIn, array('tag' => 'div')));
    }

    public function testDisabledDoesNotAddDisabledClassToLinks()
    {
        $dataIn = array('disabled' => true);
        $dataOut = ' disabled';
        $this->assertStringNotContainsString($dataOut, $this->ext->parseAttributes($dataIn, array('tag' => 'a')));
    }

    public function testDisabledAddsAriaDisabledToLinks()
    {
        $dataIn = array('disabled' => true);
        $dataOut = ' aria-disabled="true';
        $this->assertStringContainsString($dataOut, $this->ext->parseAttributes($dataIn, array('tag' => 'a')));
    }

    public function testDisabledAddsAriaDisabledToLinksOnlyOnce()
    {
        $dataIn = array('disabled' => true, 'aria-disabled' => 'true');
        $dataOut = ' aria-disabled="true" aria-disabled="true"';
        $this->assertStringNotContainsString($dataOut, $this->ext->parseAttributes($dataIn, array('tag' => 'a')));
    }

    public function testDisabledMergesDisabledClassToExistingClasses()
    {
        $dataIn = array('disabled' => true, 'class' => 'foo');
        $dataOut = ' class="foo is-disabled"';
        $this->assertStringContainsString($dataOut, $this->ext->parseAttributes($dataIn));
    }

    public function testDisabledOnlyAddsDisabledClassOnce()
    {
        $dataIn = array('disabled' => true, 'class' => 'is-disabled');
        $dataOut = ' class="is-disabled"';
        $this->assertStringContainsString($dataOut, $this->ext->parseAttributes($dataIn));
    }

    public function testDisabledOnlyMergesDisabledClassOnce()
    {
        $dataIn = array('disabled' => true, 'class' => 'foo is-disabled');
        $dataOut = ' class="foo is-disabled"';
        $this->assertStringContainsString($dataOut, $this->ext->parseAttributes($dataIn));
    }

}
