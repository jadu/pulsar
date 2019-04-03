<?php

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

use Symfony\Component\Form\Extension\Core\Type\BirthdayType;
use Symfony\Component\Form\Extension\Core\Type\ButtonType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\ColorType;
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Form\Extension\Core\Type\CurrencyType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\DateIntervalType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\LanguageType;
use Symfony\Component\Form\Extension\Core\Type\LocaleType;
use Symfony\Component\Form\Extension\Core\Type\MoneyType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\PercentType;
use Symfony\Component\Form\Extension\Core\Type\RadioType;
use Symfony\Component\Form\Extension\Core\Type\RangeType;
use Symfony\Component\Form\Extension\Core\Type\ResetType;
use Symfony\Component\Form\Extension\Core\Type\SearchType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Form\Extension\Core\Type\TimezoneType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/forms.php';

$form = $formFactory->createBuilder()
    ->add('Textfield', TextType::class, array(
        'label' => 'Text field'
    ))
    ->add('Textarea', TextareaType::class, array(
        'label' => 'Textarea'
    ))
    ->add('Email', EmailType::class, array(
        'label' => 'Email'
    ))
    ->add('Integer', IntegerType::class, array(
        'label' => 'Integer'
    ))
    ->add('Money', MoneyType::class, array(
        'label' => 'Money'
    ))
    ->add('Number', NumberType::class, array(
        'label' => 'Number'
    ))
    ->add('Percent', PercentType::class, array(
        'label' => 'Percent'
    ))
    ->add('Search', SearchType::class, array(
        'label' => 'Search'
    ))
    ->add('Url', UrlType::class, array(
        'label' => 'Url'
    ))
    ->add('Range', RangeType::class, array(
        'label' => 'Range'
    ))
    ->add('Tel', TelType::class, array(
        'label' => 'Tel'
    ))
    ->add('Color', ColorType::class, array(
        'label' => 'Color'
    ))
    ->add('ChoiceDefault', ChoiceType::class, array(
        'label' => 'Choice (default)',
        'choices'  => [
            'Maybe' => null,
            'Yes' => true,
            'No' => false,
        ]
    ))
    ->add('ChoiceExpanded', ChoiceType::class, array(
        'label' => 'Choice (expanded)',
        'expanded' => true,
        'choices'  => [
            'Maybe' => null,
            'Yes' => true,
            'No' => false,
        ]
    ))
    ->add('ChoiceMultiple', ChoiceType::class, array(
        'label' => 'Choice (multiple)',
        'multiple' => true,
        'choices'  => [
            'Maybe' => null,
            'Yes' => true,
            'No' => false,
        ]
    ))
    ->add('ChoiceExpandedMultiple', ChoiceType::class, array(
        'label' => 'Choice (expanded multiple)',
        'expanded' => true,
        'multiple' => true,
        'choices'  => [
            'Maybe' => null,
            'Yes' => true,
            'No' => false,
        ]
    ))
    ->add('Country', CountryType::class, array(
        'label' => 'Country'
    ))
    ->add('Language', LanguageType::class, array(
        'label' => 'Language'
    ))
    ->add('Locale', LocaleType::class, array(
        'label' => 'Locale'
    ))
    ->add('Timezone', TimezoneType::class, array(
        'label' => 'Timezone'
    ))
    ->add('Currency', CurrencyType::class, array(
        'label' => 'Currency'
    ))
    ->add('Date', DateType::class, array(
        'label' => 'Date'
    ))
    ->add('DateInterval', DateIntervalType::class, array(
        'label' => 'Date Interval'
    ))
    ->add('DateTime', DateTimeType::class, array(
        'label' => 'Date Time'
    ))
    ->add('TimeChoice', TimeType::class, array(
        'label' => 'Time (choice)',
        'widget' => 'choice',
    ))
    ->add('TimeText', TimeType::class, array(
        'label' => 'Time (text)',
        'widget' => 'text',
    ))
    ->add('TimeSingleText', TimeType::class, array(
        'label' => 'Time (single text)',
        'widget' => 'single_text',
    ))
    ->add('Birthday', BirthdayType::class, array(
        'label' => 'Birthday'
    ))
    ->add('Checkbox', CheckboxType::class, array(
        'label' => 'Checkbox'
    ))
    ->add('File', FileType::class, array(
        'label' => 'File'
    ))
    ->add('Radio', RadioType::class, array(
        'label' => 'Radio'
    ))
    ->add('Button', ButtonType::class, array(
        'label' => 'Button'
    ))
    ->add('Reset', ResetType::class, array(
        'label' => 'Reset'
    ))
    ->add('Submit', SubmitType::class, array(
        'label' => 'Submit'
    ))
    ->add('TextfieldHelpText', TextType::class, array(
        'label' => 'Text field (with help text)',
        'attr' => [
            'data-help-text' => 'Some useful <u>information</u>',
        ]
    ))
    ->add('TextfieldHelpHTML', TextType::class, array(
        'label' => 'Text field (with help HTML)',
        'attr' => [
            'data-help-html' => 'Some useful <u>information</u>',
        ]
    ))
    ->add('TextfieldPrependAppend', TextType::class, array(
        'label' => 'Text field (with prepended / appended text)',
        'attr' => [
            'data-prepend' => 'Before',
            'data-append' => 'After',
        ]
    ))
    ->add('TextfieldPrependAppendIcon', TextType::class, array(
        'label' => 'Text field (with prepended / appended icon)',
        'attr' => [
            'data-prepend-icon' => 'icon-calendar',
            'data-append-icon' => 'icon-phone',
        ]
    ))
    ->add('ToggleSwitch', CheckboxType::class, array(
        'label' => 'Toggle Switch',
        'attr' => [
            'data-toggle-switch' => 'true', // This should probably be a custom Pulsar ToggleSwitchType ideally.
        ]
    ))



    ->getForm();

if (isset($_POST[$form->getName()])) {
    $form->submit($_POST[$form->getName()]);

    if ($form->isValid()) {
        var_dump('VALID', $form->getData());
        die;
    }
}

$template = $twig->loadTemplate('symfony/index.html.twig');

print $template->render(array(
    'symfonyForm' => $form->createView(),
));
