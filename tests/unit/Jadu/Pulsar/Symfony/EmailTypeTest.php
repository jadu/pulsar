<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\EmailType;

class EmailTypeTest extends Symfony_TestCase
{
    /**
     * @group email
     */
    public function testEmailFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', EmailType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();

        $this->compareOutput($form, 'form/email.html.twig');
    }

    /**
     * @group email
     */
    public function testEmailFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', EmailType::class, array(
                'label' => 'foo'
            ))
            ->getForm();

        $this->compareOutput($form, 'form/email-required.html.twig');
    }

    /**
     * @group email
     */
    public function testEmailFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', EmailType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/email-help.html.twig');
    }

    /**
     * @group email
     */
    public function testEmailFieldPrependText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', EmailType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/email-prepend.html.twig');
    }

    /**
     * @group email
     */
    public function testEmailFieldAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', EmailType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-append-text' => 'bar'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/email-append.html.twig');
    }

    /**
     * @group email
     */
    public function testEmailFieldPrependTextAppendText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', EmailType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar',
                    'data-append-text' => 'baz'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/email-prepend-append.html.twig');
    }
}
