<?php

namespace Jadu\Pulsar\Twig\Extension;

/**
 * Attribute parser
 *
 * Takes an array of attributes to be converted into HTML formatted attributes
 * ready for use in an HTML element.
 *
 * Unit tests: tests/unit/AttribuetParserExtensionTest.php
 */
class AttributeParserExtension extends \Twig_Extension
{
	/**
	 * Get the name of this extension
	 *
	 * @return string The name of the extension
	 */
	public function getName()
	{
		return 'attribute_parser_extension';
	}

	/**
	 * Register the `attributes()` function with Twig.
	 *
	 * @return array The Twig function
	 */
	public function getFunctions()
	{
		return array(
			new \Twig_SimpleFunction(
				'attributes',
				array($this, 'parseAttributes'),
				array('is_safe' => array('html'))
			)
		);
	}

	/**
	 * Convert an array of attributes into a HTML friendly string.
	 *
	 * @param  array  $attributes An array of attributes to parse
	 * @param  array  $ignores    An array of keys to ignore from the output
	 * @return string             A space separated string of key="value"
	 * attributes ready for including in an HTML element
	 */
	public function parseAttributes($attributes = null, $ignores = null)
	{
		if (!isset($attributes) || empty($attributes)) {
			return false;
		}

		$html = '';

		foreach ($attributes as $key => $value) {

			// skip over any items whose key is present in the $ignores argument
			if (isset($ignores) && in_array($key, $ignores)) {
				unset($attributes[$key]);
				continue;
			}

			// add to the string, formatted as key="value"
			$html .= sprintf('%s="%s" ', $key, htmlentities($value));
		}

		// remove trailing space
		return rtrim($html);
	}

}
