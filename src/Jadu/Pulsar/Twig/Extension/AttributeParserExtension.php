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
	 * Returns a list of filters.
	 *
	 * @return array
	 */
	public function getFilters()
	{
		$filters = array(
			new \Twig_SimpleFilter(
				'defaults',
				array($this, 'defaultAttributes'),
				array('is_safe' => array('html'))
			)
		);
		return $filters;
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

	public function defaultAttributes(array $attributes, array $default)
	{
		$out = $attributes;

		foreach ($default as $key => $value) {
			if (array_key_exists($key, $attributes)) {
				$out[$key] = $value . ' ' . $attributes[$key];
				continue;
			}

			$out[$key] = $value;
		}

		return $out;
	}

	/**
	 * Convert an array of attributes into a HTML friendly string.
	 *
	 * @param  array  $attributes An array of attributes to parse
	 * @param  array  $args       Arguments to affect the output:
	 *                [exclude] A list of keys to remove. This takes precedence
	 *                over other options
	 *                [include] A list of keys to be output, all others will be
	 *                ignored
	 *                [default] Additional attributes to be included, if the
	 *                attribute exists in both $attributes and $args, the values
	 *                will be merged
	 * @return string             A space separated string of key="value"
	 * attributes ready for including in an HTML element
	 */
	public function parseAttributes($attributes, array $args = array())
	{
		if (empty($attributes)) {
			return '';
		}

		$html = array();

		// Parse the attributes
		foreach ($attributes as $key => $value) {

			// don't output attributes with empty values
			if (!empty($value)) {

				// booleans should only output the key, everything else should
				// be key="value"
				switch (is_bool($value)) {
					case true:
						$html[] = htmlspecialchars($key);
						break;
					default:
						$html[] = htmlspecialchars($key) . '="' . htmlspecialchars($value) . '"';
						break;
				}
			}
		}

		return implode(' ', $html);
	}

}
