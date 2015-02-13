<?php

namespace Jadu\Pulsar\Twig\Extension;

class AttributeParserExtensionTest extends \PHPUnit_Framework_TestCase
{
	public function setUp()
	{
		$this->ext = new AttributeParserExtension(array());
	}

	public function testGetName()
	{
		$this->assertEquals('attribute_parser_extension', $this->ext->getName());
	}

	public function testParseAttributesReturnsFalseIfNoAttributesSupplied()
	{
		$tests = ['', false, null, []];
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
		$dataIn = ['slim' => 'shady'];
		$dataOut = 'slim="shady"';
		$this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
	}

	public function testParseAttributesParsesMultipleAttributes()
	{
		$dataIn = ['slim' => 'shady', 'marshall' => 'mathers', 'eminem' => true];
		$dataOut = 'slim="shady" marshall="mathers" eminem="1"';
		$this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
	}

	public function testParseAttributesEscapesDoubleQuotes()
	{
		$dataIn = ['foo' => 'bar"baz'];
		$dataOut = 'foo="bar&quot;baz"';
		$this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
	}

	public function testParseAttributesConvertsHtmlEntities()
	{
		$dataIn = ['foo' => '<span>bar</span> <blink>baz</blink>'];
		$dataOut = 'foo="&lt;span&gt;bar&lt;/span&gt; &lt;blink&gt;baz&lt;/blink&gt;"';
		$this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn));
	}

	public function testParseAttributesIgnoresItemsInIgnoresList()
	{
		$dataIn = ['slim' => 'shady', 'marshall' => 'mathers', 'eminem' => true];
		$ignores = ['slim', 'eminem'];
		$dataOut = 'marshall="mathers"';

		$this->assertEquals($dataOut, $this->ext->parseAttributes($dataIn, $ignores));
	}

}
