<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\UrlType;

include_once 'Symfony_TestCase.php';

class UrlTypeTest extends Symfony_TestCase
{
    /**
     * @group url
     */
    public function testUrlFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', UrlType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();
            
        $this->compareOutput($form, 'url.html.twig');
    }

    /**
     * @group url
     */
    public function testUrlFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', UrlType::class, array(
                'label' => 'foo'
            ))
            ->getForm();
            
        $this->compareOutput($form, 'url-required.html.twig');
    }

    /**
     * @group url
     */
    public function testUrlFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', UrlType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'url-help.html.twig');
    }

    /**
     * @group url
     */
    public function testUrlFieldGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', UrlType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'url-guidance.html.twig');
    }

    /**
     * @group url
     */
    public function testUrlFieldGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', UrlType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'url-guidance-container.html.twig');
    }

    /**
     * @group url
     */
    public function testUrlFieldRequiredGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', UrlType::class, array(
                'label' => 'foo',
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'url-required-guidance.html.twig');
    }

    /**
     * @group url
     */
    public function testUrlFieldPrependText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', UrlType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar'
                ]
            ))
            ->getForm(); 
            
        $this->compareOutput($form, 'url-prepend.html.twig');
    }

    /**
     * @group url
     */
    public function testUrlFieldAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', UrlType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-append-text' => 'bar'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'url-append.html.twig');
    }

    /**
     * @group url
     */
    public function testUrlFieldPrependTextAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', UrlType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar',
                    'data-append-text' => 'baz'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'url-prepend-append.html.twig');
    }
}