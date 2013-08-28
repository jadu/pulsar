<?php

	set_include_path('..');
	$templateDir = '../views';
	
	require_once 'vendor/autoload.php';

	$loader = new Twig_Loader_Filesystem($templateDir);
	$twig = new Twig_Environment($loader, array('debug' => true));

	$template = $twig->loadTemplate('lexicon/main.html.twig');

	echo $template->render(array());

?>