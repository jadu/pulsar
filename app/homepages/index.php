<?php

$baseDir = '../../';
$templateDir = $baseDir . 'views';

require_once __DIR__ . '/' . $baseDir . 'vendor/autoload.php';

use Jadu\Pulsar\Twig\Extension\ConfigExtension;
use Jadu\Pulsar\Twig\Extension\RelativeTimeExtension;
use Jadu\Pulsar\Twig\Extension\UrlParamsExtension;
use Jadu\Pulsar\Twig\Extension\TabsExtension;

$loader = new Twig_Loader_Filesystem($templateDir);
$loader->addPath($templateDir, 'pulsar');

$twig = new Twig_Environment($loader, array('debug' => true));

$twig->addExtension(new ConfigExtension($baseDir . 'pulsar.json'));
$twig->addExtension(new RelativeTimeExtension());
$twig->addExtension(new UrlParamsExtension($_GET));
$twig->addExtension(new TabsExtension());
$twig->addExtension(new Twig_Extension_Debug());

$template = $twig->loadTemplate('homepages/main.html.twig');

$breadcrumb = array(
    'Pulsar' => '/',
    'Homepage Designer' => null
    );

$widgets = array(
    array(
        'id' => 'analytics',
        'title' => 'Analytics',
        'widgets' => array(
            array(
                'id' => 'browsers',
                'title' => 'Browser Usage',
                'source' => 'browsers.html.twig',
                'price' => '0',
                'description' => 'Show which browsers your users have used to visit your site.'
            )
        )
    ),
    array(
        'id' => 'search',
        'title' => 'Search',
        'widgets' => array(
            array(
                'id' => 'trending',
                'title' => 'Trending Searches',
                'source' => 'trending.html.twig',
                'price' => '9.99',
                'description' => 'Show which search terms are currently popular on your site(s).'
            )
        )
    ),
    array(
        'id' => 'system',
        'title' => 'System Information',
        'widgets' => array(
            array(
                'id' => 'cpu',
                'title' => 'CPU Load',
                'source' => 'cpu.html.twig',
                'price' => '0',
                'description' => 'Shows how hard your server is working at the moment.'
            ),
            array(
                'id' => 'galaxies_count',
                'title' => 'Galaxies Sites',
                'source' => 'galaxies.html.twig',
                'price' => '0',
                'description' => 'Shows how many Galaxies sites are currently active.'
            )                
        )
    ),
    array(
        'id' => 'users',
        'title' => 'User Information',
        'widgets' => array(
            array(
                'id' => 'admins',
                'title' => 'Admins',
                'source' => 'admins.html.twig',
                'price' => '0',
                'description' => 'Show how many administrators you have.'
            )                
        )
    )
);

print $template->render(array(
    'breadcrumb' => $breadcrumb,
    'widgets' => $widgets
    ));
