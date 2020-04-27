<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\IntegerType;

class IntegerTypeTest extends Symfony_TestCase
{
    /**
     * @group integer
     */
    public function testIntegerFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', IntegerType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();

        $this->compareOutput($form, 'form/number.html.twig');
    }

    /**
     * @group integer
     */
    public function testIntegerFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', IntegerType::class, array(
                'label' => 'foo'
            ))
            ->getForm();

        $this->compareOutput($form, 'form/number-required.html.twig');
    }

    /**
     * @group integer
     */
    public function testIntegerFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', IntegerType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/number-help.html.twig');
    }

    /**
     * @group integer
     */
    public function testIntegerFieldPrependText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', IntegerType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/number-prepend.html.twig');
    }

    /**
     * @group integer
     */
    public function testIntegerFieldAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', IntegerType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-append-text' => 'bar'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/number-append.html.twig');
    }

    /**
     * @group integer
     */
    public function testIntegerFieldPrependTextAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', IntegerType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar',
                    'data-append-text' => 'baz'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/number-prepend-append.html.twig');
    }
}
