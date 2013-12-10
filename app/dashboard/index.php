<?php

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

$template = $twig->loadTemplate('dashboard/main.html.twig');

$breadcrumb = array(
    'Pulsar' => '/',
    'Documentation' => '/docs',
    'Dashboard' => null
    );

$widgets = array(
    array(
        'id' => 'analytics',
        'title' => 'Analytics',
        'widgets' => array(
            array(
                'guid' => 'browsers',
                'version' => '0.0.1',
                'title' => 'Browser Usage',
                'price' => '0',
                'description' => 'Show which browsers your users have used to visit your site.'
            ),
            array(
                'guid' => 'fillmurray',
                'version' => '0.0.1',
                'title' => 'Fill Murray',
                'price' => '0',
                'description' => 'Some Bill Murray Placeholder'
            )
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

$initial_state = '{"title":"My Dashboard","widgets":[{"guid":"widget_guid","id":"ui-id-1","settings":{}},{"guid":"widget_guid","id":"ui-id-2","settings":{}}]}';

print $template->render(array(
    'breadcrumb' => $breadcrumb,
    'widgets' => $widgets,
    'initial_state' => $initial_state
    ));
