<?php

	set_include_path('..');
	$templateDir = '../views';
	
	require_once 'vendor/autoload.php';
	require_once 'extensions/url.php';

	$loader = new Twig_Loader_Filesystem($templateDir);
	$twig = new Twig_Environment($loader, array('debug' => true));

	$twig->addExtension(new Pulsar_Twig_Extension_Url());

	$template = $twig->loadTemplate('lexicon/main.html.twig');

	print $template->render(array());

?>