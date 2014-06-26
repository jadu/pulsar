<?php

namespace Jadu\Pulsar\Twig\Extension;

/**
 * File Exists
 *
 * Allows a view to check for the existence of a file
 *
 * Unit tests: TODO
 */
class FileExistsExtension extends \Twig_Extension
{
	public function getName()
	{
		return 'file_exists_extension';
	}

	public function getFunctions()
	{
		return array(
			new \Twig_SimpleFunction('file_exists', array($this, 'fileExists'))
		);
	}

	public function fileExists($file)
	{
		if (file_exists($_SERVER['DOCUMENT_ROOT'] . $file))
		{
			return true;
		}

		return false;
	}
}
