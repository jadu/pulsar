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

    public function defaultAttributes($attributes, array $default)
    {
        if (is_null($attributes)) {
            $attributes = array();
        }

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
     *                [tag] A tag name to also include in the output, mainly
     *                used to allow us to prevent invalid attributes from being
     *                passed to the markup
     *
     *                Example:
     *                    attributes({'disabled'}, {'tag': ('a')})
     *
     *                The above example will let us pass the disabled option to
     *                allow us to create the necessary ARIA attributes and
     *                classes, but we can test the tag argument to then strip
     *                the `disabled` boolean from also being output as it's
     *                invalid HTML
     * @return string A space separated string of key="value" attributes ready
     *                for including in an HTML element
     */
    public function parseAttributes($attributes, array $args = array())
    {
        $html = array();

        $disableableElements = array('button', 'fieldset', 'input', 'optgroup', 'option', 'select', 'textarea');
        $usingTag = false;

        if (isset($args['tag'])) {
            $usingTag = true;
            $tag = $args['tag'];
            $html[] = $tag;
        }
        else if (empty($attributes)) {
            return '';
        }

        // As classes can be supplied as a string, we'll' switch them to an
        // array to allow us to add new classes based on other attributes
        $classes = isset($attributes['class']) ? explode(' ', $attributes['class']) : array();
        unset($attributes['class']);

        // Because we check this attribute a few times, we'll default it to `false` if it hasn't been set
        if (!array_key_exists('disabled', $attributes)) {
            $attributes['disabled'] = false;
        }

        // Check if a disable class has been supplied, and set the `disabled` attr if so
        if (in_array('is-disabled', $classes)) {
            $attributes['disabled'] = true;
        }

        // Set the `is-disabled` class if it hasn't already been passed as an option
        if ($attributes['disabled'] === true && !in_array('is-disabled', $classes)) {
            $classes[] = 'is-disabled';
        }

        // If the element isn't disableable, use `aria-disabled` instead of `disabled`
        if ($usingTag && !in_array($tag, $disableableElements) && $attributes['disabled'] === true) {
            $attributes['aria-disabled'] = 'true';
            unset($attributes['disabled']);
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
                        }
                        break;
                    default:
                        $html[] = htmlspecialchars($key) . '="' . htmlspecialchars($value) . '"';
                        break;
                }
            }
        }

        // Re-stringify the classes array, as long as we have some
        if (!empty($classes)) {
            $html[] = ' class="' . trim(implode(' ', array_unique($classes))) . '"';
        }

        if (!empty($html)) {
            if ($usingTag) {
                return implode(' ', $html);
            }
            else {
                return ' ' . implode(' ', $html);
            }
        }

        return '';
    }

}
