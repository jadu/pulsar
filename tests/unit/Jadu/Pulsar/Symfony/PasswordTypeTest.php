<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class PasswordTypeTest extends Symfony_TestCase
{
    /**
     * @group password
     */
    public function testPasswordFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PasswordType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();

        $this->compareOutput($form, 'password.html.twig');
    }

    /**
     * @group password
     */
    public function testPasswordFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PasswordType::class, array(
                'label' => 'foo'
            ))
            ->getForm();

        $this->compareOutput($form, 'password-required.html.twig');
    }

    /**
     * @group password
     */
    public function testPasswordFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PasswordType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'password-help.html.twig');
    }

    /**
     * @group password
     */
    public function testPasswordFieldGuidancepassword ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PasswordType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'password-guidance.html.twig');
    }

    /**
     * @group password
     */
    public function testPasswordFieldGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PasswordType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'password-guidance-container.html.twig');
    }

    /**
     * @group password
     */
    public function testPasswordFieldRequiredGuidancepassword ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PasswordType::class, array(
                'label' => 'foo',
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'password-required-guidance.html.twig');
    }

    /**
     * @group password
     */
    public function testPasswordFieldPrependpassword ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PasswordType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'password-prepend.html.twig');
    }

    /**
     * @group password
     */
    public function testPasswordFieldAppendpassword ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PasswordType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-append-text' => 'bar'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'password-append.html.twig');
    }

    /**
     * @group password
     */
    public function testPasswordFieldPrependpasswordAppendpassword ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', PasswordType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-prepend-text' => 'bar',
                    'data-append-text' => 'baz'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'password-prepend-append.html.twig');
    }
}