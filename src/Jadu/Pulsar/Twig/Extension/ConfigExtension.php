<?php

namespace Jadu\Pulsar\Twig\Extension;
use Twig\Extension\AbstractExtension;
use Twig\Extension\GlobalsInterface;

/**
 * Config
 *
 * Process Pulsar's config file (pulsar.json) and set
 * it's contents as globals
 *
 * Unit tests: tests/unit/ConfigExtensionTest.php
 */
class ConfigExtension extends AbstractExtension implements GlobalsInterface
{

    protected $configFile;

    public function __construct($configFile)
    {
        $this->configFile = $configFile;
    }

    public function getName() 
    {
        return 'config_extension';
    }

    public function getGlobals(): array
    {
        return $this->getConfigVars();
    }

    public function getConfigVars()
    {
        if (file_exists($this->configFile)) {
            $file = file_get_contents($this->configFile);
        } else {
            $file = file_get_contents(__DIR__ . '/../../../../../pulsar.json');
        }

        $json = json_decode($file);
        $config = array();

        foreach ($json as $key => $val) {
            $config[$key] = $val;
        }

        return $config;
    }

}
