<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\IntegerType;

include_once 'Symfony_TestCase.php';

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
            
        $this->compareOutput($form, 'number.html.twig');
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
            
        $this->compareOutput($form, 'number-required.html.twig');
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
            
        $this->compareOutput($form, 'number-help.html.twig');
    }

    /**
     * @group integer
     */
    public function testIntegerFieldGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', IntegerType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'number-guidance.html.twig');
    }

    /**
     * @group integer
     */
    public function testIntegerFieldGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', IntegerType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'number-guidance-container.html.twig');
    }

    /**
     * @group integer
     */
    public function testIntegerFieldRequiredGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', IntegerType::class, array(
                'label' => 'foo',
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'number-required-guidance.html.twig');
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
            
        $this->compareOutput($form, 'number-prepend.html.twig');
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
            
        $this->compareOutput($form, 'number-append.html.twig');
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
            
        $this->compareOutput($form, 'number-prepend-append.html.twig');
    }
}