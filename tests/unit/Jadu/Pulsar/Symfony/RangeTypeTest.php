<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\RangeType;

include_once 'Symfony_TestCase.php';

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
            
        $this->compareOutput($form, 'range.html.twig');
    }

    /**
     * @group range
     */
    public function testRangeFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RangeType::class, array(
                'label' => 'foo'
            ))
            ->getForm();
            
        $this->compareOutput($form, 'range-required.html.twig');
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
            
        $this->compareOutput($form, 'range-help.html.twig');
    }

    /**
     * @group range
     */
    public function testRangeFieldGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RangeType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'range-guidance.html.twig');
    }

    /**
     * @group range
     */
    public function testRangeFieldGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RangeType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'range-guidance-container.html.twig');
    }

    /**
     * @group range
     */
    public function testRangeFieldRequiredGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', RangeType::class, array(
                'label' => 'foo',
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'range-required-guidance.html.twig');
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
            
        $this->compareOutput($form, 'range-prepend.html.twig');
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
            
        $this->compareOutput($form, 'range-append.html.twig');
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
            
        $this->compareOutput($form, 'range-prepend-append.html.twig');
    }
}