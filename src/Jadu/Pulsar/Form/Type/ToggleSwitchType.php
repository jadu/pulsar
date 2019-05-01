<?php

namespace Jadu\Pulsar\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class ToggleSwitchType extends AbstractType
{
    /**
     * @return string|null
     */
    public function getParent()
    {
        return CheckboxType::class;
    }

    /**
     * @return string
     */
    public function getBlockPrefix()
    {
        return 'toggleswitch';
    }
}
