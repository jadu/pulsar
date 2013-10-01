<?php

namespace Jadu\Pulsar\Twig\Extension;

/**
 * Config
 *
 * Process Pulsar's config file (pulsar.json) and set
 * it's contents as globals
 *
 */
class ConfigExtension extends \Twig_Extension
{

    public function getName() 
    {
        return 'config_extension';
    }

    public function getGlobals()
    {
        return $this->getConfigVars();
    }

    public function getConfigVars()
    {
        $file = file_get_contents('../pulsar.json');
        $json = json_decode($file);
        $config = array();

        foreach ($json as $key => $val) {
            $config[$key] = $val;
        }

        return $config;
    }

}
