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
	 * @param  array  $args       Arguments to affect the output:
	 *                [ignores] A list of keys to remove. This takes precedence
	 *                over other options
	 *                [includes] A list of keys to be output, all others will be
	 *                ignored
	 *                [defaults] Additional attributes to be included, if the
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

		$html = [];

		// Handle default attributes
		if (array_key_exists('defaults', $args)) {
			foreach ($args['defaults'] as $key => $value) {

				// If attribute exists, merge it
				if (array_key_exists($key, $attributes)) {
					$attributes[$key] = $attributes[$key] . ' ' . $args['defaults'][$key];
					continue;
				}

				// Otherwise, just add a new attribute
				$html[] = htmlspecialchars($key) . '="' . htmlspecialchars($value) . '"';
			}
		}

		// Parse the attributes
		foreach ($attributes as $key => $value) {

			// if an item is in the ignores list, or is not in the includes list
			// then skip it.
			if (
				(
					(array_key_exists('ignores', $args)
					&& in_array($key, $args['ignores']))
					|| (array_key_exists('includes', $args)
					&& !in_array($key, $args['includes']))
				)
			) {
				continue;
			}

			$html[] = htmlspecialchars($key) . '="' . htmlspecialchars($value) . '"';
		}

		return implode(' ', $html);
	}

}
