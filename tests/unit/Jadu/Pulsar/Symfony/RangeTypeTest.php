<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\RangeType;

class RangeTypeTest extends Symfony_TestCase
{
    /**
     * @group range
     */
    public function testRangeFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RangeType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();

        $this->compareOutput($form, 'form/range.html.twig');
    }

    /**
     * @group range1
     */
    public function testRangeFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RangeType::class, array(
                'label' => 'foo'
            ))
            ->getForm();

        $this->compareOutput($form, 'form/range-required.html.twig');
    }

    /**
     * @group range
     */
    public function testRangeFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RangeType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/range-help.html.twig');
    }

    /**
     * @group range
     */
    public function testRangeFieldPrependText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RangeType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/range-prepend.html.twig');
    }

    /**
     * @group range
     */
    public function testRangeFieldAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RangeType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-append-text' => 'bar'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/range-append.html.twig');
    }

    /**
     * @group range
     */
    public function testRangeFieldPrependTextAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RangeType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar',
                    'data-append-text' => 'baz'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/range-prepend-append.html.twig');
    }
}
