<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

include_once 'Symfony_TestCase.php';

class ChoiceTypeTest extends Symfony_TestCase
{
    /**
     * @group choice
     */
    public function testChoiceFieldRadiosBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', ChoiceType::class, array(
                'label' => 'foo',
                'required' => false,
                'expanded' => true,
                'multiple' => false,
                'choices'  => [
                    'Foo' => null,
                    'Bar' => true,
                    'Baz' => 'false',
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'choice.html.twig');
    }

    /**
     * @group choice
     */
    public function testChoiceFieldRadiosRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', ChoiceType::class, array(
                'label' => 'foo',
                'expanded' => true,
                'multiple' => false,
                'choices'  => [
                    'Foo' => null,
                    'Bar' => true,
                    'Baz' => 'false',
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'choice-required.html.twig');
    }

    /**
     * @group choice
     */
    public function testChoiceFieldRadiosHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', ChoiceType::class, array(
                'label' => 'foo',
                'required' => false,
                'expanded' => true,
                'multiple' => false,
                'choices'  => [
                    'Foo' => null,
                    'Bar' => true,
                    'Baz' => 'false',
                ],
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'choice-help.html.twig');
    }
    
    // /**
    //  * @group choice
    //  */
    // public function testChoiceFieldHelp ()
    // {
    //     $form = $this->formFactory->createBuilder()
    //         ->add('field', ChoiceType::class, array(
    //             'label' => 'foo',
    //             'required' => false,
    //             'attr' => [
    //                 'data-help-text' => 'my help text',
    //             ]
    //         ))
    //         ->getForm();
            
    //     $this->compareOutput($form, 'choice-help.html.twig');
    // }

    // /**
    //  * @group choice
    //  */
    // public function testChoiceFieldGuidanceText ()
    // {
    //     $form = $this->formFactory->createBuilder()
    //         ->add('field', ChoiceType::class, array(
    //             'label' => 'foo',
    //             'required' => false,
    //             'attr' => [
    //                 'data-guidance-text' => 'foo <span class="bar">bar</span>'
    //             ]
    //         ))
    //         ->getForm();
            
    //     $this->compareOutput($form, 'choice-guidance.html.twig');
    // }

    // /**
    //  * @group choice
    //  */
    // public function testChoiceFieldGuidanceContainer ()
    // {
    //     $form = $this->formFactory->createBuilder()
    //         ->add('field', ChoiceType::class, array(
    //             'label' => 'foo',
    //             'required' => false,
    //             'attr' => [
    //                 'data-guidance-text' => 'foo <span class="bar">bar</span>',
    //                 'data-guidance-container' => 'baz'
    //             ]
    //         ))
    //         ->getForm();
            
    //     $this->compareOutput($form, 'choice-guidance-container.html.twig');
    // }

    // /**
    //  * @group choice
    //  */
    // public function testChoiceFieldRequiredGuidanceText ()
    // {
    //     $form = $this->formFactory->createBuilder()
    //         ->add('field', ChoiceType::class, array(
    //             'label' => 'foo',
    //             'attr' => [
    //                 'data-guidance-text' => 'foo <span class="bar">bar</span>'
    //             ]
    //         ))
    //         ->getForm();
            
    //     $this->compareOutput($form, 'choice-required-guidance.html.twig');
    // }

    // /**
    //  * @group choice
    //  */
    // public function testChoiceFieldPrependText ()
    // {
    //     $form = $this->formFactory->createBuilder()
    //         ->add('field', ChoiceType::class, array(
    //             'label' => 'foo',
    //             'required' => false,
    //             'attr' => [
    //                 'data-prepend-text' => 'bar'
    //             ]
    //         ))
    //         ->getForm(); 
            
    //     $this->compareOutput($form, 'choice-prepend.html.twig');
    // }

    // /**
    //  * @group choice
    //  */
    // public function testChoiceFieldAppendText ()
    // {
    //     $form = $this->formFactory->createBuilder()
    //         ->add('field', ChoiceType::class, array(
    //             'label' => 'foo',
    //             'required' => false,
    //             'attr' => [
    //                 'data-append-text' => 'bar'
    //             ]
    //         ))
    //         ->getForm();
            
    //     $this->compareOutput($form, 'choice-append.html.twig');
    // }

    // /**
    //  * @group choice
    //  */
    // public function testChoiceFieldPrependTextAppendText ()
    // {
    //     $form = $this->formFactory->createBuilder()
    //         ->add('field', ChoiceType::class, array(
    //             'label' => 'foo',
    //             'required' => false,
    //             'attr' => [
    //                 'data-prepend-text' => 'bar',
    //                 'data-append-text' => 'baz'
    //             ]
    //         ))
    //         ->getForm();
            
    //     $this->compareOutput($form, 'choice-prepend-append.html.twig');
    // }
}