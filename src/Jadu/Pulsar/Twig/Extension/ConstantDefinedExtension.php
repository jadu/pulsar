<?php

namespace Jadu\Pulsar\Twig\Extension;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class ConstantDefinedExtension extends AbstractExtension
{
    public function getFunctions()
    {
        return array(
            new TwigFunction('constant_defined', 'defined'),
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
