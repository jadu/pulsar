<?php

namespace Jadu\Pulsar\Twig\Extension;

/**
 * Base URL
 */
class BaseUrlExtension extends \Twig_Extension
{

    public function getName() 
    {
        return 'base_url_extension';
    }

    public function getGlobals()
    {
        return array(
            'base_url' => $this->getBaseUrl()
        );
    }

    public function getBaseUrl()
    {
        return "http://" . $_SERVER['HTTP_HOST'] . '/';
    }

}
