<?php

namespace Jadu\Pulsar\Twig\Extension;

class ArrayExtension extends \Twig_Extension
{

	/**
	 * Returns a list of filters.
	 *
	 * @return array
	 */
	public function getFilters()
	{
		$filters = array(
			new \Twig_SimpleFilter(
				'exclude',
				array($this, 'excludeFromArray'),
				$options = array()
			),
			new \Twig_SimpleFilter(
				'only',
				array($this, 'onlyFromArray'),
				$options = array()
			),
		);
		return $filters;
	}

	/**
	 * Name of this extension
	 *
	 * @return string
	 */
	public function getName()
	{
		return 'array_extension';
	}

	/**
	 * Returns only items not present in the filter list
	 * @param  array        $array    The array to filter
	 * @param  string|array $excludes The list of items to exclude
	 * @return array                  The filtered array
	 */
	public function excludeFromArray(array $array, $excludes = null)
	{
		if (!is_array($excludes) && !is_string($excludes)) {
			return $array;
		}

		if (is_string($excludes)) {
			$excludes = explode(' ', $excludes);
		}

		$out = array();

		foreach ($array as $key => $value) {
			if (!in_array($key, $excludes)) {
				$out[$key] = $value;
			}
		}

		return $out;
	}

	/**
	 * Returns only items present in the filter list
	 * @param  array        $array    The array to filter
	 * @param  string|array $excludes The list of items to include
	 * @return array                  The filtered array
	 */
	public function onlyFromArray(array $array, $only = null)
	{
		if (!is_array($only) && !is_string($only)) {
			return array();
		}

		if (is_string($only)) {
			$only = explode(' ', $only);
		}

		$out = array();

		foreach ($array as $key => $value) {
			if (in_array($key, $only)) {
				$out[$key] = $value;
			}
		}

		return $out;
	}

}
