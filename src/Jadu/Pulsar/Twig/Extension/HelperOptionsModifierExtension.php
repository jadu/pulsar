<?php

namespace Jadu\Pulsar\Twig\Extension;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class HelperOptionsModifierExtension extends AbstractExtension
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
            new TwigFunction('modify_options', array($this, 'modifyOptions'))
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

        // Check if errors are present in options
        if (array_key_exists('error', $options) && !empty($options['error'])) {
            $errors = is_array($options['error']) ?  $options['error'] : [$options['error']];

            $numberOfErrors = count($errors);
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
        if (array_key_exists('help', $options) and !empty($options['help']) ) {
            $options['help_id'] = 'guid-' . rand();
        }

        return $options;
    }
}
