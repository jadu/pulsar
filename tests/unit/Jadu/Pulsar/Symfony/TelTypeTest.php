<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\TelType;

class TelTypeTest extends Symfony_TestCase
{
    /**
     * @group tel
     */
    public function testTelFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TelType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();

        $this->compareOutput($form, 'form/tel.html.twig');
    }

    /**
     * @group tel
     */
    public function testTelFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TelType::class, array(
                'label' => 'foo'
            ))
            ->getForm();

        $this->compareOutput($form, 'form/tel-required.html.twig');
    }

    /**
     * @group tel
     */
    public function testTelFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TelType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/tel-help.html.twig');
    }

    /**
     * @group tel
     */
    public function testTelFieldPrependText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TelType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/tel-prepend.html.twig');
    }

    /**
     * @group tel
     */
    public function testTelFieldAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TelType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-append-text' => 'bar'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/tel-append.html.twig');
    }

    /**
     * @group tel
     */
    public function testTelFieldPrependTextAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TelType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar',
                    'data-append-text' => 'baz'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/tel-prepend-append.html.twig');
    }
}
