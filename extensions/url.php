<?php

class Pulsar_Twig_Extension_Url extends Twig_Extension 
{

	public function getName() 
	{
		return 'Pulsar';
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