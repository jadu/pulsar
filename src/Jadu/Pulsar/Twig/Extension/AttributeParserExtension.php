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
	 * @return string A space separated string of key="value" attributes ready
	 *                for including in an HTML element
	 */
	public function parseAttributes($attributes, array $args = array())
	{
		if (empty($attributes)) {
			return '';
		}

		$html = array();

		// If `class` is present, move it to the end of the attributes array so
		// that classes can be added based on the presence of other attributes
		if (array_key_exists('class', $attributes)) {
			$class = $attributes['class'];
			unset($attributes['class']);
			$attributes['class'] = $class;
		}

		// Parse the attributes
		foreach ($attributes as $key => &$value) {

			// Only work with non-empty, non-array values, or zero as a string
			if ((!empty($value) && !is_array($value)) || $value === '0') {

				// Booleans should only output the key, everything else should
				// be key="value"
				switch (is_bool($value)) {
					case true:

						// Only output the key if true, do nothing if false
						if ($value) {
							$html[] = htmlspecialchars($key);

							// Add extra things based on certain properties, but
							// always check whether they've already been supplied
							if ($key == 'required') {

								// Add ARIA property
								$html[] = 'aria-required="true"';
							}
							else if ($key == 'disabled') {
								$disabledClass = '';

								if (!array_key_exists('class', $attributes)) {

									// Simply add disabled class as a string if it doesn't exist
									$html[] = 'class="is-disabled"';
								}
								else if (strpos($attributes['class'], 'is-disabled') === false) {

									// Merge with existing classes if they exist;
									// Classes have been moved to the end of the
									// array so they can be processed last
    								$attributes['class'] .= ' is-disabled';
								}

								// Add ARIA property
								$html[] = 'aria-disabled="true"';
							}
						}
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
