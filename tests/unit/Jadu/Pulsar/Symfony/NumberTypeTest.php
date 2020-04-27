<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\NumberType;

class NumberTypeTest extends Symfony_TestCase
{
    /**
     * @group text
     */
    public function testNumberFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', NumberType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();

        $this->compareOutput($form, 'form/text-label.html.twig');
    }

    /**
     * @group text
     */
    public function testNumberFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', NumberType::class, array(
                'label' => 'foo'
            ))
            ->getForm();

        $this->compareOutput($form, 'form/text-required.html.twig');
    }

    /**
     * @group text
     */
    public function testNumberFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', NumberType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/text-help.html.twig');
    }

    /**
     * @group text
     */
    public function testNumberFieldPrependText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', NumberType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/text-prepend.html.twig');
    }

    /**
     * @group text
     */
    public function testNumberFieldAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', NumberType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-append-text' => 'bar'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/text-append.html.twig');
    }

    /**
     * @group text
     */
    public function testNumberFieldPrependTextAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', NumberType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar',
                    'data-append-text' => 'baz'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/text-prepend-append.html.twig');
    }
}
