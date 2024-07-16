<?php

namespace Jadu\Pulsar\Twig\Extension;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class TabsExtension extends AbstractExtension
{
    public function getName()
    {
        return 'tabs_extension';
    }

    public function getFunctions()
    {
        return array(
            new TwigFunction('get_active_tab', array($this, 'getActiveParentTabID'))
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

        // If no active parent ID has been set, return the first tab ID
        if ($active_parent_tab_id === null) {
            return $ob[0]->id;
        }

        $active_id = 1;

        // Loop through the tab items
        foreach ($ob as $item) {

            // If we have subnavigation
            if (isset($item->sub_tabs) && $item->sub_tabs != null) {

                // Loop through its sub tabs
                foreach($item->sub_tabs as $sub_tab) {
                    if ($sub_tab->id === $active_parent_tab_id) {
                        $active_id = $item->id;
                        break;
                    }
                }

            }
        }

        return $active_id;

    }

}
