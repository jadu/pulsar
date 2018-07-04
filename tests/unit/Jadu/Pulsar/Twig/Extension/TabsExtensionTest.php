<?php

namespace Jadu\Pulsar\Twig\Extension;

class TabsExtensionTest extends \PHPUnit\Framework\TestCase
{

  public function setUp()
  {
    $this->ext = new TabsExtension();
    $this->tabs = '
      [{
        "id": "1",
        "label": "one",
        "sub_tabs": [
          {"id": "1_1", "label": "1.1"},
          {"id": "1_2", "label": "1.2"},
          {"id": "1_3", "label": "1.3"},
          {"id": "1_4", "label": "1.4"},
          {"id": "1_5", "label": "1.5"}
        ]
      },
      {
        "id": "2",
        "label": "two",
        "sub_tabs": [
          {"id": "2_1", "label": "2.1"},
          {"id": "2_2", "label": "2.2"},
          {"id": "2_3", "label": "2.3"},
          {"id": "2_4", "label": "2.4"},
          {"id": "2_5", "label": "2.5"}
        ]
      },
      {
        "id": "3",
        "label": "three"
      }]
    ';
  }

  public function testGetName()
  {
    $this->assertEquals('tabs_extension', $this->ext->getName());
  }

  public function testGenerateTabsShouldFailWithInvalidJson()
  {
    $this->assertEquals(false, $this->ext->getActiveParentTabID("json.derulo"));
  }

  public function testActiveParentTabIsCorrectlySet()
  {
    $this->assertEquals('1', $this->ext->getActiveParentTabID($this->tabs, '1_3'));
    $this->assertEquals('2', $this->ext->getActiveParentTabID($this->tabs, '2_3'));
  }

  public function testFirstTabIsReturnedIfNoValueGiven()
  {
    $this->assertEquals('1', $this->ext->getActiveParentTabID($this->tabs));
  }

  public function testFirstTabIsReturnedIfNullValueGiven()
  {
    $this->assertEquals('1', $this->ext->getActiveParentTabID($this->tabs, null));
  }

  public function testReturnsFalseIfTabsIsNull()
  {
    $this->assertEquals(false, $this->ext->getActiveParentTabID());
  }

  public function testTabsAsArrayIsConvertedJson()
  {
    $tabsArray = json_decode($this->tabs, true);
    $this->assertEquals('1', $this->ext->getActiveParentTabID($tabsArray));
  }

}
