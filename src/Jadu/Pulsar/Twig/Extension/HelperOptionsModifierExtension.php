<?php

namespace Jadu\Pulsar\Twig\Extension;

class HelperOptionsModifierExtension extends \Twig_Extension
{
    /**
     * Name of this extension
     *
     * @return string
     */
    public function getName()
    {
        return 'modify_options';
    }

    /**
     * Register the `modify_options()` function with Twig.
     *
     * @return array The Twig function
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('modify_options', array($this, 'modifyOptions'))
        );
    }

    /**
     * Returns a modified options array including error flag, error and help guids
     *
     * @param  array    $options    The form helper options
     * @return array|boolean
     */
    public function modifyOptions($options)
    {
        // If we don't have $options, abandon ship
        if ($options === null) {
            return false;
        }

        // If no ID has been provided, we need to create one
        if (!array_key_exists('id', $options) || empty($options['id'])) {
            $options['id'] = 'id-guid-' . rand();
        }

        // Check if errors are present in options
        if (array_key_exists('error', $options) && !empty($options['error'])) {
            $errors = is_array($options['error']) ?  $options['error'] : [$options['error']];

            $numberOfErrors = count($errors);
            $errorGuids = array();

            // Set has_error for aria-invalid use
            $options['has_error'] = true;

            // Build guids for errors
            for ($i = 0; $i < $numberOfErrors; $i++) {
                $errorGuids[] = 'help-guid-' . rand();
            }

            $options['error_ids'] = $errorGuids;
        }

        // Check if errors are present in options
        if (array_key_exists('help', $options) and !empty($options['help']) ) {
            $options['help_id'] = 'help-guid-' . rand();
        }

        return $options;
    }
}
