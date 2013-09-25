<?php

	set_include_path('..');
	$templateDir = '../views';
	
	require_once 'vendor/autoload.php';

	$loader = new Twig_Loader_Filesystem($templateDir);
	$twig = new Twig_Environment($loader, array('debug' => true));

	require_once 'extensions/UrlParams.php';
	$twig->addExtension(new Url_Params_Extension());
	
	require_once 'extensions/RelativeTime.php';
	$twig->addExtension(new Relative_Time_Extension());	

	$template = $twig->loadTemplate('lexicon/main.html.twig');

	print $template->render(array());

?>