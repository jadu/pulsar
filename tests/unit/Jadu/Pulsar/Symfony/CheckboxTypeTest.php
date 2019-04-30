<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class CheckboxTypeTest extends Symfony_TestCase
{
    /**
     * @group checkbox
     */
    public function testCheckboxFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', CheckboxType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();

        $this->compareOutput($form, 'checkbox-label.html.twig');
    }

    public function testCheckboxFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', CheckboxType::class, array(
                'label' => 'foo'
            ))
            ->getForm();

        $this->compareOutput($form, 'checkbox-required.html.twig');
    }

    public function testCheckboxFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', CheckboxType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'checkbox-help.html.twig');
    }

    public function testCheckboxFieldGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', CheckboxType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'checkbox-guidance.html.twig');
    }

    public function testCheckboxFieldGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', CheckboxType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'checkbox-guidance-container.html.twig');
    }

    public function testCheckboxFieldRequiredGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', CheckboxType::class, array(
                'label' => 'foo',
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'checkbox-required-guidance.html.twig');
    }

}
