<?php

$baseDir = __DIR__ . '/../../../../';

require_once $baseDir . 'vendor/autoload.php';



$loader = new Twig_Loader_Filesystem($baseDir);
$loader->addPath($baseDir . '/views/', 'pulsar');

$twig = new Twig_Environment($loader, array('debug' => true));
$twig->addExtension(new Twig_Extension_Debug());

$template = $twig->loadTemplate('var/widgets/image/0.0.1/main.html.twig');

print $template->render(array());