<?php

namespace Jadu\XFormsPro\Twig\Extension;

use Twig_Extension;
use Twig_SimpleFunction;

class ConstantDefinedExtension extends Twig_Extension
{
    public function getFunctions()
    {
        return array(
            new Twig_SimpleFunction('constant_defined', 'defined'),
        );
    }

    /**
     * Name of this extension
     *
     * @return string
     */
    public function getName()
    {
        return 'constant_defined';
    }
}
