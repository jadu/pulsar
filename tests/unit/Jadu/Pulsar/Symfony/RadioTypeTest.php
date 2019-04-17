<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\RadioType;

include_once 'Symfony_TestCase.php';

class RadioTypeTest extends Symfony_TestCase
{
    /**
     * @group radio
     */
    public function testRadioFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RadioType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();
            
        $this->compareOutput($form, 'radio-label.html.twig');
    }

    public function testRadioFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RadioType::class, array(
                'label' => 'foo'
            ))
            ->getForm();
            
        $this->compareOutput($form, 'radio-required.html.twig');
    }

    public function testRadioFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RadioType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'radio-help.html.twig');
    }

    public function testRadioFieldGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RadioType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'radio-guidance.html.twig');
    }

    public function testRadioFieldGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RadioType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'radio-guidance-container.html.twig');
    }

    public function testRadioFieldRequiredGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RadioType::class, array(
                'label' => 'foo',
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'radio-required-guidance.html.twig');
    }

}