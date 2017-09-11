<?php

namespace Jadu\Pulsar\Twig\Extension;

/**
 * Url Parameters
 *
 * Currently retrieves the active tab index from the URL string but will be
 * extended over time to grab any url params
 *
 * Unit tests: tests/unit/UrlParamsExtensionTest.php
 */
class UrlParamsExtension extends \Twig_Extension implements \Twig_Extension_GlobalsInterface
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
            'active_tab' => $this->getActiveTab(),
            'view' => $this->getView()
        );
    }

    public function getActiveTab()
    {
        return (isset($this->parameters['tab'])) ? $this->parameters['tab'] : null;
    }

    public function getView()
    {
        return (isset($this->parameters['view'])) ? $this->parameters['view'] : null;
    }
}
