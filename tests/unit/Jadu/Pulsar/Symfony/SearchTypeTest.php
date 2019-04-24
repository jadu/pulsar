<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\SearchType;

include_once 'Symfony_TestCase.php';

class SearchTypeTest extends Symfony_TestCase
{
    /**
     * @group search
     */
    public function testSearchFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', SearchType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();
            
        $this->compareOutput($form, 'search.html.twig');
    }

    /**
     * @group search
     */
    public function testSearchFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', SearchType::class, array(
                'label' => 'foo'
            ))
            ->getForm();
            
        $this->compareOutput($form, 'search-required.html.twig');
    }

    /**
     * @group search
     */
    public function testSearchFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', SearchType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'search-help.html.twig');
    }

    /**
     * @group search
     */
    public function testSearchFieldGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', SearchType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'search-guidance.html.twig');
    }

    /**
     * @group search
     */
    public function testSearchFieldGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', SearchType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'search-guidance-container.html.twig');
    }

    /**
     * @group search
     */
    public function testSearchFieldRequiredGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', SearchType::class, array(
                'label' => 'foo',
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'search-required-guidance.html.twig');
    }

    /**
     * @group search
     */
    public function testSearchFieldPrependText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', SearchType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar'
                ]
            ))
            ->getForm(); 
            
        $this->compareOutput($form, 'search-prepend.html.twig');
    }

    /**
     * @group search
     */
    public function testSearchFieldAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', SearchType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-append-text' => 'bar'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'search-append.html.twig');
    }

    /**
     * @group search
     */
    public function testSearchFieldPrependTextAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', SearchType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar',
                    'data-append-text' => 'baz'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'search-prepend-append.html.twig');
    }
}