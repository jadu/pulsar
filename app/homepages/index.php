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
        'id' => 'murray',
        'title' => 'Bill Murray',
        'widgets' => array(
            array(
                'guid' => 'fillmurray',
                'version' => '0.0.1',
                'title' => 'Fill Murray',
                'price' => '0',
                'description' => 'Some Bill Murray Placeholder',
                'gridspan' => 6
            ),
            array(
                'guid' => 'image',
                'version' => '0.0.1',
                'title' => 'Image',
                'price' => '0',
                'description' => 'A lovely portrait of Bill.'
            ),
        )
    ),
    array(
        'id' => 'search',
        'title' => 'Search',
        'widgets' => array(
            array(
                'guid' => 'trending',
                'version' => '0.0.1',
                'title' => 'Trending Searches',
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
                'guid' => 'cpu',
                'version' => '0.0.1',
                'title' => 'CPU Load',
                'price' => '0',
                'description' => 'Shows how hard your server is working at the moment.'
            ),
            array(
                'guid' => 'galaxies_count',
                'version' => '0.0.1',
                'title' => 'Galaxies Sites',
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
                'guid' => 'admins',
                'version' => '0.0.1',
                'title' => 'Admins',
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
