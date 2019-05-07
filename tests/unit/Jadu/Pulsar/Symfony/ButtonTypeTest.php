<?php

namespace Jadu\Pulsar\Symfony;

use Symfony\Component\Form\Extension\Core\Type\ButtonType;

class ButtonTypeTest extends Symfony_TestCase
{
    /**
     * @group button
     */
    public function testButtonFieldBasic ()
    {
        $form = $this->formFactory->createBuilder()
            ->add('field', ButtonType::class, array(
                'label' => 'foo'
            ))
            ->getForm();

        $this->compareOutput($form, 'html/button-symfony.html.twig');
    }

}
