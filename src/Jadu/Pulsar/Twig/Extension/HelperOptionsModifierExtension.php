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
     * @return array
     */
    public function modifyOptions($options)
    {
        // If we don't have $options, abandon ship
        if ($options === null) {
            return false;
        }

        // Check if errors are present in options
        if (array_key_exists('error', $options) and count($options['error']) > 0) {
            $numberOfErrors = count($options['error']);
            $errorGuids = array();

            // Set has_error for aria-invalid use
            $options['has_error'] = true;

            // Build guids for errors
            for ($i = 0; $i < $numberOfErrors; $i++) {
                $errorGuids[] = 'guid-' . rand();
            }

            $options['error_ids'] = $errorGuids;
        }

        // Check if errors are present in options
        if (array_key_exists('help', $options) and count($options['help']) > 0) {
            $options['help_id'] = 'guid-' . rand();
        }

        return $options;
    }
}
