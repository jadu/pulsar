<?php

namespace Jadu\Pulsar\Twig\Extension;

class UrlParamsExtension extends \Twig_Extension 
{
    /**
     * Query string parameters
     * @var array
     */
    protected $parameters;

    public function __construct(array $parameters)
    {
        $this->parameters = $parameters;
    }

    public function getName() 
    {
        return 'url_params_extension';
    }

    public function getGlobals()
    {
        return array(
            'active_tab' => $this->getActiveTab()
        );
    }

    public function getActiveTab()
    {
        return (isset($this->parameters['tab'])) ? intval($this->parameters['tab']) : 1;
    }
}
