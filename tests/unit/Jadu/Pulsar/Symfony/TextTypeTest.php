<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\TextType;

include 'Symfony_TestCase.php';

class TextTypeTest extends Symfony_TestCase
{
    public function testTextFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();
            
        $this->compareOutput($form, 'text-label.html.twig');
    }

    public function testTextFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextType::class, array(
                'label' => 'foo'
            ))
            ->getForm();
            
        $this->compareOutput($form, 'text-required.html.twig');
    }

    public function testTextFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'text-help.html.twig');
    }

    public function testTextFieldGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'text-guidance.html.twig');
    }

    public function testTextFieldGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'text-guidance-container.html.twig');
    }

    public function testTextFieldRequiredGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextType::class, array(
                'label' => 'foo',
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'text-required-guidance.html.twig');
    }

    public function testTextFieldPrependText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'text-prepend.html.twig');
    }

    public function testTextFieldAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-append-text' => 'bar'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'text-append.html.twig');
    }

    public function testTextFieldPrependTextAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar',
                    'data-append-text' => 'baz'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'text-prepend-append.html.twig');
    }
}