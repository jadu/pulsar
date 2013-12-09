<?php

$baseDir = __DIR__ . '/../../';

require_once $baseDir . 'vendor/autoload.php';

use Jadu\Pulsar\Twig\Extension\TabsExtension;


$loader = new Twig_Loader_Filesystem($baseDir);
$loader->addPath($baseDir . '/views/', 'pulsar');

$twig = new Twig_Environment($loader, array('debug' => true));

$twig->addExtension(new TabsExtension());
$twig->addExtension(new Twig_Extension_Debug());

$template = $twig->loadTemplate('views/pulsar/components/flash.html.twig');

$flash_message = array(
    'message' => $_GET['flash_message'],
    'type' => $_GET['flash_type'],
    'autohide' => $_GET['flash_autohide']
    );

print $template->render(array(
	'flash_message' => $flash_message
	));
