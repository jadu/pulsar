<?php

namespace Jadu\Pulsar\Twig\Extension;

use Twig_Extension;
use Twig_SimpleFunction;

class GetConstantExtension extends Twig_Extension
{
    public function getFunctions()
    {
        return array(
            new Twig_SimpleFunction('get_constant', array($this, 'getConstant')),
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
     * @return string       The value of the constant, null if not defined
     */
    public function getConstant($name = '')
    {
        if (empty($name) || !defined($name)) {
            return null;
        }

        return constant($name);
    }
}
