<?php

$baseDir = '../';
$templateDir = $baseDir . 'views';

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../docs/functions.php';

use dflydev\markdown\MarkdownExtraParser;
use Jadu\Pulsar\Twig\Extension\ConfigExtension;
use Jadu\Pulsar\Twig\Extension\RelativeTimeExtension;
use Jadu\Pulsar\Twig\Extension\UrlParamsExtension;
use Jadu\Pulsar\Twig\Extension\TabsExtension;

$markdownParser = new MarkdownExtraParser();
$loader = new Twig_Loader_Filesystem($templateDir);
$twig = new Twig_Environment($loader, array('debug' => true));

$twig->addExtension(new ConfigExtension($baseDir . 'pulsar.json'));
$twig->addExtension(new RelativeTimeExtension());
$twig->addExtension(new UrlParamsExtension($_GET));
$twig->addExtension(new TabsExtension());
$twig->addExtension(new Twig_Extension_Debug());

$template = $twig->loadTemplate('docs/main.html.twig');

$options = get_options();
$tree = get_tree($options['docs_path'], $base_url);
$homepage_url = homepage_url($tree);
$docs_url = docs_url($tree);
$page = load_page($tree, $markdownParser);

$breadcrumb = array(
    'Pulsar' => '/',
    'Documentation' => null 
);

print $template->render(array(
    'breadcrumb' => $breadcrumb,
    'tabs' => build_nav($tree),
    'content' => $page['html']
    )
);
