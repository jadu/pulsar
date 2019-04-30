<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\PercentType;

class PercentTypeTest extends Symfony_TestCase
{
    /**
     * @group percent
     */
    public function testPercentFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PercentType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();

        $this->compareOutput($form, 'percent.html.twig');
    }

    /**
     * @group percent
     */
    public function testPercentFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PercentType::class, array(
                'label' => 'foo'
            ))
            ->getForm();

        $this->compareOutput($form, 'percent-required.html.twig');
    }

    /**
     * @group percent
     */
    public function testPercentFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PercentType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'percent-help.html.twig');
    }

    /**
     * @group percent
     */
    public function testPercentFieldGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PercentType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'percent-guidance.html.twig');
    }

    /**
     * @group percent
     */
    public function testPercentFieldGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PercentType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'percent-guidance-container.html.twig');
    }

    /**
     * @group percent
     */
    public function testPercentFieldRequiredGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PercentType::class, array(
                'label' => 'foo',
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'percent-required-guidance.html.twig');
    }

    /**
     * @group percent
     */
    public function testPercentFieldPrependText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PercentType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'percent-prepend.html.twig');
    }

}
