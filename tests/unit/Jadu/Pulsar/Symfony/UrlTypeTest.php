<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\UrlType;

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

        $this->compareOutput($form, 'form/url.html.twig');
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

        $this->compareOutput($form, 'form/url-required.html.twig');
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

        $this->compareOutput($form, 'form/url-help.html.twig');
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

        $this->compareOutput($form, 'form/url-prepend.html.twig');
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

        $this->compareOutput($form, 'form/url-append.html.twig');
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

        $this->compareOutput($form, 'form/url-prepend-append.html.twig');
    }
}
