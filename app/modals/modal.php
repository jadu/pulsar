<?php

$baseDir 		= __DIR__ . '/../../';
$modal_path = '/views/modals/';
$modal 			= $_GET['modal'];

require_once $baseDir . 'vendor/autoload.php';

use Jadu\Pulsar\Twig\Extension\TabsExtension;

$loader = new Twig_Loader_Filesystem($baseDir);
$loader->addPath($baseDir . '/views/', 'pulsar');

$twig = new Twig_Environment($loader, array('debug' => true));

$twig->addExtension(new TabsExtension());
$twig->addExtension(new Twig_Extension_Debug());

$template = $twig->loadTemplate($modal_path . $modal);

print $template->render(array());
