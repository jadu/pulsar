<?php

$baseDir = '../../';
$templateDir = $baseDir . 'views';

require_once __DIR__ . '/' . $baseDir . 'vendor/autoload.php';

use Jadu\Pulsar\Twig\Extension\ArrayExtension;
use Jadu\Pulsar\Twig\Extension\AttributeParserExtension;
use Jadu\Pulsar\Twig\Extension\ConfigExtension;
use Jadu\Pulsar\Twig\Extension\RelativeTimeExtension;
use Jadu\Pulsar\Twig\Extension\UrlParamsExtension;
use Jadu\Pulsar\Twig\Extension\TabsExtension;

$loader = new Twig_Loader_Filesystem($templateDir);
$loader->addPath($templateDir, 'pulsar');

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

if (!isset($_SERVER['PATH_INFO'])) {
    $path = 'main';
} else {
    $path = $_SERVER['PATH_INFO'];
}

$template = $twig->loadTemplate('lexicon/' . $path . '.html.twig');

$flashMessage = array(
    'type' => 'success',
    'message' => 'This is a flash message, it lets users know that something happened. <a href="#tab_4" data-toggle="tab">read more</a>.'
    );

print $template->render(array(
    'active_tab_id' => 'stanton'
    )
);
