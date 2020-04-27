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

        $this->compareOutput($form, 'form/checkbox-label.html.twig');
    }

    public function testCheckboxFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', CheckboxType::class, array(
                'label' => 'foo'
            ))
            ->getForm();

        $this->compareOutput($form, 'form/checkbox-required.html.twig');
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

        $this->compareOutput($form, 'form/checkbox-help.html.twig');
    }
}
