<?php

ini_set("display_errors", true); 
error_reporting(E_ALL);

$base_dir = '../../';
$template_dir = $base_dir . 'views';

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../src/Jadu/Pulsar/Twig/Sandbox/SecurityPolicy.php';

use Jadu\Pulsar\Twig\Extension\ConfigExtension;
use Jadu\Pulsar\Twig\Extension\RelativeTimeExtension;
use Jadu\Pulsar\Twig\Extension\UrlParamsExtension;
use Jadu\Pulsar\Twig\Extension\TabsExtension;

$loader = new Twig_Loader_Filesystem($template_dir);
$loader->addPath($template_dir, 'pulsar');

$twig = new Twig_Environment($loader, array('debug' => true));

$policy = new Twig_Sandbox_SecurityPolicy($tags, $filters, $methods, $properties, $functions);
$sandbox = new Twig_Extension_Sandbox($policy);

$twig->addExtension(new ConfigExtension($base_dir . 'pulsar.json'));
$twig->addExtension(new RelativeTimeExtension());
$twig->addExtension(new UrlParamsExtension($_GET));
$twig->addExtension(new TabsExtension());
$twig->addExtension(new Twig_Extension_Debug());
$twig->addExtension($sandbox);

$template = $twig->loadTemplate('dashboard/list.html.twig');

$breadcrumb = array(
    'Jadu' => '/',
    'Dashboards' => '/dashboards'
    );

print $template->render(array(
    'breadcrumb' => $breadcrumb
    ));