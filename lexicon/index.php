<?php

$templateDir = '../views';

require_once __DIR__ . '/../vendor/autoload.php';

use Jadu\Pulsar\Twig\Extension\RelativeTimeExtension;
use Jadu\Pulsar\Twig\Extension\UrlParamsExtension;

$loader = new Twig_Loader_Filesystem($templateDir);
$twig = new Twig_Environment($loader, array('debug' => true));

$twig->addExtension(new RelativeTimeExtension());
$twig->addExtension(new UrlParamsExtension());

$template = $twig->loadTemplate('lexicon/main.html.twig');

print $template->render(array());
