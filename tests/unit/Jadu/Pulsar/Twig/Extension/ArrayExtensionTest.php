<?php

namespace Jadu\Pulsar\Twig\Extension;

class ArrayExtensionTest extends \PHPUnit\Framework\TestCase
{
	public $loader;
	public $env;
	public $ext;
	public $data;

	public function setUp(): void
	{
		parent::setUp();
		$this->loader = new \Twig_Loader_Filesystem();
		$this->env = new \Twig_Environment($this->loader);
		$this->ext = new ArrayExtension(array());
		$this->data = array('slim' => 'shady', 'marshall' => 'mathers', 'eminem' => true, 'class' => 'wrapper');
	}

	public function testGetName()
	{
		$this->assertEquals('array_extension', $this->ext->getName());
	}

	public function testExcludeFromArrayIgnoresUnsetExcludes()
	{
		$tests = ['', false, null, array()];
		foreach ($tests as $excludes) {
	        $this->assertEquals(
	        	$this->data,
	        	$this->ext->excludeFromArray(
	        		$this->data,
	        		$excludes
	        	)
	        );
	    }
	}

	public function testExcludeFromArrayExcludesSingleString()
	{
		$excludes = 'eminem';
		$dataOut = array('slim' => 'shady', 'marshall' => 'mathers', 'class' => 'wrapper');

        $this->assertEquals(
        	$dataOut,
        	$this->ext->excludeFromArray(
        		$this->data,
        		$excludes
        	)
        );
	}

	public function testExcludeFromArrayExcludesSpaceSeparatedString()
	{
		$excludes = 'eminem marshall';
		$dataOut = array('slim' => 'shady', 'class' => 'wrapper');

        $this->assertEquals(
        	$dataOut,
        	$this->ext->excludeFromArray(
        		$this->data,
        		$excludes
        	)
        );
	}

	public function testExcludeFromArrayExcludesArray()
	{
		$excludes = ['slim', 'class'];
		$dataOut = array('eminem' => true, 'marshall' => 'mathers');

        $this->assertEquals(
        	$dataOut,
        	$this->ext->excludeFromArray(
        		$this->data,
        		$excludes
        	)
        );
	}

	public function testExcludeFromArrayIsCaseInsensitive()
	{
		$excludes = ['SLIM', 'Class'];
		$dataOut = array('eminem' => true, 'marshall' => 'mathers');

        $this->assertEquals(
        	$dataOut,
        	$this->ext->excludeFromArray(
        		$this->data,
        		$excludes
        	)
        );
	}

	public function testOnlyFromArrayIgnoresUnsetValues()
	{
		$tests = ['', false, null, array()];
		foreach ($tests as $test) {
	        $this->assertEquals(
	        	array(),
	        	$this->ext->onlyFromArray(
	        		$this->data,
	        		$test
	        	)
	        );
	    }
	}

	public function testOnlyFromArrayIncludesOnlyFromSingleString()
	{
		$only = 'eminem';
		$dataOut = array('eminem' => true);

        $this->assertEquals(
        	$dataOut,
        	$this->ext->onlyFromArray(
        		$this->data,
        		$only
        	)
        );
	}

	public function testOnlyFromArrayIncludesOnlyFromSpaceSeparatedString()
	{
		$only = 'slim class';
		$dataOut = array('slim' => 'shady', 'class' => 'wrapper');

        $this->assertEquals(
        	$dataOut,
        	$this->ext->onlyFromArray(
        		$this->data,
        		$only
        	)
        );
	}

	public function testOnlyFromArrayIncludesOnlyFromArray()
	{
		$only = ['slim', 'class'];
		$dataOut = array('slim' => 'shady', 'class' => 'wrapper');

        $this->assertEquals(
        	$dataOut,
        	$this->ext->onlyFromArray(
        		$this->data,
        		$only
        	)
        );
	}

	public function testOnlyFromArrayIsCaseInsensitive()
	{
		$only = ['SLIM', 'Class'];
		$dataOut = array('slim' => 'shady', 'class' => 'wrapper');

        $this->assertEquals(
        	$dataOut,
        	$this->ext->onlyFromArray(
        		$this->data,
        		$only
        	)
        );
	}

}
