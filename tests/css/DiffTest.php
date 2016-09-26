<?php

$baseDir = '/var/www/html';
$templateDir = $baseDir . '/tests/unit/Jadu/Pulsar/Twig/Macro/Fixtures';

require_once $baseDir . '/vendor/autoload.php';

use Jadu\Pulsar\Twig\Extension\ArrayExtension;
use Jadu\Pulsar\Twig\Extension\AttributeParserExtension;
use Jadu\Pulsar\Twig\Extension\ConfigExtension;
use Jadu\Pulsar\Twig\Extension\RelativeTimeExtension;
use Jadu\Pulsar\Twig\Extension\UrlParamsExtension;
use Jadu\Pulsar\Twig\Extension\TabsExtension;

$loader = new Twig_Loader_Filesystem($templateDir);
$loader->addPath($baseDir . '/views', 'pulsar');
$loader->addPath($baseDir . '/tests/css', 'cssTests');
$loader->addPath($baseDir . '/tests/unit/Jadu/Pulsar/Twig/Macro/Fixtures', 'tests');

$twig = new Twig_Environment($loader,
    array(
        'debug' => true,
        'strict_variables' => true
    )
);

$twig->addExtension(new ArrayExtension());
$twig->addExtension(new AttributeParserExtension());
$twig->addExtension(new ConfigExtension($baseDir . 'pulsar.json'));
$twig->addExtension(new RelativeTimeExtension());
$twig->addExtension(new UrlParamsExtension($_GET));
$twig->addExtension(new TabsExtension());
$twig->addExtension(new Twig_Extension_Debug());

$template = $twig->loadTemplate($_SERVER['PATH_INFO']);

print $template->render(array());
