<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\MoneyType;

include_once 'Symfony_TestCase.php';

class MoneyTypeTest extends Symfony_TestCase
{
    /**
     * @group money
     */
    public function testMoneyFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', MoneyType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();
            
        $this->compareOutput($form, 'money.html.twig');
    }

    /**
     * @group money
     */
    public function testMoneyFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', MoneyType::class, array(
                'label' => 'foo'
            ))
            ->getForm();
            
        $this->compareOutput($form, 'money-required.html.twig');
    }

    /**
     * @group money
     */
    public function testMoneyFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', MoneyType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'money-help.html.twig');
    }

    /**
     * @group money
     */
    public function testMoneyFieldGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', MoneyType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'money-guidance.html.twig');
    }

    /**
     * @group money
     */
    public function testMoneyFieldGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', MoneyType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'money-guidance-container.html.twig');
    }

    /**
     * @group money
     */
    public function testMoneyFieldRequiredGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', MoneyType::class, array(
                'label' => 'foo',
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'money-required-guidance.html.twig');
    }

    /**
     * @group money
     */
    public function testMoneyFieldPrependText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', MoneyType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar'
                ]
            ))
            ->getForm(); 
            
        $this->compareOutput($form, 'money-prepend.html.twig');
    }

    /**
     * @group money
     */
    public function testMoneyFieldAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', MoneyType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-append-text' => 'bar'
                ]
            ))
            ->getForm();
            
        $this->compareOutput($form, 'money-append.html.twig');
    }

}