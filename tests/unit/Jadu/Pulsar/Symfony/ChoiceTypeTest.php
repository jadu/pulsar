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
                'placeholder' => false,
                'choices'  => [
                    'Foo' => null,
                    'Bar' => true,
                    'Baz' => 'false',
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'form/choice.html.twig');
    }

    /**
     * @group choice
     */
    public function testChoiceFieldCheckboxBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', ChoiceType::class, array(
                'label' => 'foo',
                'required' => false,
                'expanded' => true,
                'multiple' => true,
                'placeholder' => false,
                'choices'  => [
                    'Foo' => null,
                    'Bar' => true,
                    'Baz' => 'false',
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'form/choice-checkbox.html.twig');
    }

    /**
     * @group choice
     */
    public function testChoiceFieldSelectBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', ChoiceType::class, array(
                'label' => 'foo',
                'required' => false,
                'expanded' => false,
                'multiple' => false,
                'placeholder' => false,
                'choices'  => [
                    'Foo' => null,
                    'Bar' => true,
                    'Baz' => 'false',
                ],
                'attr' => ['class' => 'js-select2']
            ))
            ->getForm();
            
        $this->compareOutput($form, 'form/choice-select.html.twig');
    }

    /**
     * @group choice
     */
    public function testChoiceFieldRadiosRequired ()
    {
        $this->markTestSkipped('Can’t compare required to v2 helpers due to https://github.com/jadu/pulsar/issues/971');

        $form = $this->formFactory->createBuilder()
            ->add('field', ChoiceType::class, array(
                'label' => 'foo',
                'expanded' => true,
                'multiple' => false,
                'placeholder' => false,
                'choices'  => [
                    'Foo' => null,
                    'Bar' => true,
                    'Baz' => 'false',
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'form/choice-required.html.twig');
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
                'placeholder' => false,
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
            
        $this->compareOutput($form, 'form/choice-help.html.twig');
    }

    /**
     * @group choice
     */
    public function testChoiceFieldCheckboxHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', ChoiceType::class, array(
                'label' => 'foo',
                'required' => false,
                'expanded' => true,
                'multiple' => true,
                'placeholder' => false,
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
            
        $this->compareOutput($form, 'form/choice-checkbox-help.html.twig');
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
                'placeholder' => false,
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
            
        $this->compareOutput($form, 'form/choice-guidance.html.twig');
    }

    /**
     * @group choice
     */
    public function testChoiceFieldCheckboxGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', ChoiceType::class, array(
                'label' => 'foo',
                'required' => false,
                'expanded' => true,
                'multiple' => true,
                'placeholder' => false,
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
            
        $this->compareOutput($form, 'form/choice-checkbox-guidance.html.twig');
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
                'placeholder' => false,
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
            
        $this->compareOutput($form, 'form/choice-guidance-container.html.twig');
    }

    /**
     * @group choice
     */
    public function testChoiceFieldCheckboxGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', ChoiceType::class, array(
                'label' => 'foo',
                'required' => false,
                'expanded' => true,
                'multiple' => true,
                'placeholder' => false,
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
            
        $this->compareOutput($form, 'form/choice-checkbox-guidance-container.html.twig');
    }

    /**
     * @group choice
     */
    public function testChoiceFieldRadiosRequiredGuidance ()
    {
        $this->markTestSkipped('Can’t compare required to v2 helpers due to https://github.com/jadu/pulsar/issues/971');

        $form = $this->formFactory->createBuilder()
            ->add('field', ChoiceType::class, array(
                'label' => 'foo',
                'expanded' => true,
                'multiple' => false,
                'placeholder' => false,
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
            
        $this->compareOutput($form, 'form/choice-required-guidance.html.twig');
    }

}