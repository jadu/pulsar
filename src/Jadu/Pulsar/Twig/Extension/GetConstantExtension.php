<?php

namespace Jadu\Pulsar\Twig\Extension;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class GetConstantExtension extends AbstractExtension
{

    /**
     * Register the `get_constant` function with Twig
     *
     * @return array The Twig function
     */
    public function getFunctions()
    {
        return array(
            new TwigFunction('get_constant', array($this, 'getConstant')),
        );
    }

    /**
     * Name of this extension
     *
     * @return string
     */
    public function getName()
    {
        return 'get_constant_extension';
    }

    /**
     * Get constant value if defined, null if not
     *
     * @param  string $name The name of the constant
     * @param  string $fallback A fallback value, or type
     *
     * @return string The value of the constant, null if not defined
     */
    public function getConstant($name = '', $fallback = null)
    {
        if (empty($name) || !defined($name)) {
            return $fallback;
        }

        return constant($name);
    }
}
