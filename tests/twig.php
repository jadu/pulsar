<?php

	set_include_path('..');
	$templateDir = '../views';
	
	require_once 'vendor/autoload.php';

	$loader = new Twig_Loader_Filesystem($templateDir);
	$twig = new Twig_Environment($loader);

	$template = $twig->loadTemplate('element_test.html.twig');

	echo $template->render(array());

?>