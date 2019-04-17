<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\TextareaType;

include_once 'Symfony_TestCase.php';

class TextareaTypeTest extends Symfony_TestCase
{
    public function testTextareaFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextareaType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();
            
        $this->compareOutput($form, 'textarea.html.twig');
    }

    public function testTextareaFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextareaType::class, array(
                'label' => 'foo'
            ))
            ->getForm();
            
        $this->compareOutput($form, 'textarea-required.html.twig');
    }

    public function testTextareaFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextareaType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'textarea-help.html.twig');
    }

    public function testTextareaFieldGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextareaType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'textarea-guidance.html.twig');
    }

    public function testTextareaFieldGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextareaType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'textarea-guidance-container.html.twig');
    }

    public function testTextareaFieldRequiredGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', TextareaType::class, array(
                'label' => 'foo',
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'textarea-required-guidance.html.twig');
    }

}