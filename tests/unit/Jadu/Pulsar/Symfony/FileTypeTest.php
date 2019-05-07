<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\FileType;

class FileTypeTest extends Symfony_TestCase
{
    /**
     * @group file
     * 
     */
    public function testFileFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', FileType::class, array(
                'label' => 'foo',
                'required' => false,
            ))
            ->getForm();

        $this->compareOutput($form, 'form/file.html.twig');
    }

    /**
     * @group file
     * 
     */
    public function testFileFieldRequired ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', FileType::class, array(
                'label' => 'foo'
            ))
            ->getForm();

        $this->compareOutput($form, 'form/file-required.html.twig');
    }

    /**
     * @group file
     * 
     */
    public function testFileFieldHelp ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', FileType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-help-text' => 'my help text',
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/file-help.html.twig');
    }

    /**
     * @group file
     * 
     */
    public function testFileFieldGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', FileType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/file-guidance.html.twig');
    }

    /**
     * @group file
     * 
     */
    public function testFileFieldGuidanceContainer ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', FileType::class, array(
                'label' => 'foo',
                'required' => false,
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>',
                    'data-guidance-container' => 'baz'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/file-guidance-container.html.twig');
    }

    /**
     * @group file
     * 
     */
    public function testFileFieldRequiredGuidanceText ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', FileType::class, array(
                'label' => 'foo',
                'attr' => [
                    'data-guidance-text' => 'foo <span class="bar">bar</span>'
                ]
            ))
            ->getForm();

        $this->compareOutput($form, 'form/file-required-guidance.html.twig');
    }
}
