<?php

namespace Jadu\Pulsar\Twig\Extension;

class FileExistsExtensionTest extends \PHPUnit_Framework_TestCase
{
	public function setUp()
	{
		$this->ext = new FileExistsExtension(array());
	}

	public function testGetName()
	{
		$this->assertEquals('file_exists_extension', $this->ext->getName());
	}

	public function testFileExists()
	{
		$this->assertEquals(TRUE, $this->ext->fileExists(__FILE__));
	}

	public function testFileNotExists()
	{
		$this->assertEquals(FALSE, $this->ext->fileExists('non_existant_file.txt'));
	}
}
