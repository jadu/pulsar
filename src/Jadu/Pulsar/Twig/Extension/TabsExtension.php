<?php

namespace Jadu\Pulsar\Twig\Extension;

class TabsExtension extends \Twig_Extension
{
  public function getName()
  {
    return 'tabs_extension';
  }

  public function getFunctions()
  {
    return array(
      new \Twig_SimpleFunction('get_active_tab', array($this, 'getActiveParentTabID'))
    );
  }

  public function getActiveParentTabID($tabs = null, $active_parent_tab_id = null)
  {
    if ($tabs === null) {
      return false;
    }

    // $tabs passed through Twig is an array rather than a json string
    if (is_array($tabs)) {
      $tabs = json_encode($tabs);
    }

    $ob = json_decode($tabs);

    // If we don't have valid json, abandon ship
    if ($ob === null) {
      return false;
    }

    // Loop through the tab items
    foreach ($ob as $item) {

      // If we have subnavigation
      if ($item->sub_tabs != null) {

        // Loop through its sub tabs
        foreach($item->sub_tabs as $sub_tab) {
          if ($sub_tab->id === $active_parent_tab_id) {
            return $item->id;
          }
        }
      }
    }

    return false;
  }
}