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
     * 
     * Can't compare required to v2 helpers due to https://github.com/jadu/pulsar/issues/971
     */
    // public function testChoiceFieldRadiosRequired ()
    // {
    //     $form = $this->formFactory->createBuilder()
    //         ->add('field', ChoiceType::class, array(
    //             'label' => 'foo',
    //             'expanded' => true,
    //             'multiple' => false,
    //             'choices'  => [
    //                 'Foo' => null,
    //                 'Bar' => true,
    //                 'Baz' => 'false',
    //             ]
    //         ))
    //         ->getForm();
            
    //     $this->compareOutput($form, 'choice-required.html.twig');
    // }

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

    /**
     * @group choice
     */
    public function testChoiceFieldRadiosGuidanceText ()
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
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'choice-guidance.html.twig');
    }

    /**
     * @group choice
     */
    public function testChoiceFieldRadiosGuidanceContainer ()
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
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'choice-guidance-container.html.twig');
    }

    /**
     * @group choice
     * 
     * * Can't compare required to v2 helpers due to https://github.com/jadu/pulsar/issues/971
     */
    // public function testChoiceFieldRadiosRequiredGuidance ()
    // {
    //     $form = $this->formFactory->createBuilder()
    //         ->add('field', ChoiceType::class, array(
    //             'label' => 'foo',
    //             'expanded' => true,
    //             'multiple' => false,
    //             'choices'  => [
    //                 'Foo' => null,
    //                 'Bar' => true,
    //                 'Baz' => 'false',
    //             ],
    //             'attr' => [
    //                 'data-guidance-text' => 'foo <span class="bar">bar</span>'
    //             ]
    //         ))
    //         ->getForm();
            
    //     $this->compareOutput($form, 'choice-required-guidance.html.twig');
    // }
}