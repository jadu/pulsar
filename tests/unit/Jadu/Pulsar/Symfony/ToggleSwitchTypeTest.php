<?php

namespace Jadu\Pulsar\Symfony;

use Jadu\Pulsar\Form\Type\ToggleSwitchType;

class ToggleSwitchTypeTest extends Symfony_TestCase
{
    /**
     * @group toggle_switch
     */
    public function testToggleFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', ToggleSwitchType::class, array(
                'label' => 'Toggle',
                'required' => false,
            ))
            ->getForm();

        $this->compareOutput($form, 'form/toggle_switch.html.twig');
    }

    public function testCheckboxFieldHelp ()
    {
        $this->markTestSkipped('Bug with expected result not setting up correct aria-describedby');

        $form = $this->formFactory->createBuilder()
            ->add('field', ToggleSwitchType::class, array(
                'label' => 'Toggle',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/toggle_switch-help.html.twig');
    }

    public function testCheckboxFieldGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', ToggleSwitchType::class, array(
                'label' => 'Toggle',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/toggle_switch-guidance.html.twig');
    }

    public function testToggleFieldGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', ToggleSwitchType::class, array(
                'label' => 'Toggle',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/toggle_switch-guidance-container.html.twig');
    }

}
