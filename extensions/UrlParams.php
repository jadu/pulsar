<?php

class Url_Params_Extension extends Twig_Extension 
{

	public function getName() 
	{
		return 'url_params_extension';
	}

	public function getGlobals()
	{
		return array(
			'active_tab' => self::getActiveTab()
		);
	}

	public function getActiveTab() 
	{
		$active_tab = (isset($_GET['tab'])) ? intval($_GET['tab']) : 1;
		return $active_tab;
	}

}

?>