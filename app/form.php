<?php

use Jadu\Pulsar\Form\Type\ToggleSwitchType;
use Symfony\Component\Form\Extension\Core\Type\BirthdayType;
use Symfony\Component\Form\Extension\Core\Type\ButtonType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\ColorType;
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Form\Extension\Core\Type\CurrencyType;
use Symfony\Component\Form\Extension\Core\Type\DateIntervalType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\LanguageType;
use Symfony\Component\Form\Extension\Core\Type\LocaleType;
use Symfony\Component\Form\Extension\Core\Type\MoneyType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\PercentType;
use Symfony\Component\Form\Extension\Core\Type\RadioType;
use Symfony\Component\Form\Extension\Core\Type\RangeType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\ResetType;
use Symfony\Component\Form\Extension\Core\Type\SearchType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Form\Extension\Core\Type\TimezoneType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\FormError;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/forms.php';

$form = $formFactory->createBuilder()
    ->add('Text', TextType::class, array(
        'label' => 'Text'
    ))
    ->add('Password', PasswordType::class, array(
        'label' => 'Password'
    ))
    ->add('Textarea', TextareaType::class, array(
        'label' => 'Textarea'
    ))
    ->add('Email', EmailType::class, array(
        'label' => 'Email'
    ))
    ->add('Tel', TelType::class, array(
        'label' => 'Tel'
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
    ->add('DateChoice', DateType::class, array(
        'label' => 'Date (choice)',
        'widget' => 'choice',
    ))
    ->add('DateText', DateType::class, array(
        'label' => 'Date (text)',
        'widget' => 'text',
    ))
    ->add('DateSingleText', DateType::class, array(
        'label' => 'Date (single text)',
        'widget' => 'single_text',
    ))
    ->add('DateTimeChoice', DateTimeType::class, array(
        'label' => 'Date Time (choice)',
        'widget' => 'choice',
    ))
    ->add('DateTimeText', DateTimeType::class, array(
        'label' => 'Date Time (text)',
        'widget' => 'text',
    ))
    ->add('DateTimeSingleText', DateTimeType::class, array(
        'label' => 'Date Time (single text)',
        'widget' => 'single_text',
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
    ->add('BirthdayChoice', BirthdayType::class, array(
        'label' => 'Birthday (choice)',
        'widget' => 'choice',
    ))
    ->add('BirthdayText', BirthdayType::class, array(
        'label' => 'Birthday (text)',
        'widget' => 'text',
    ))
    ->add('BirthdaySingleText', BirthdayType::class, array(
        'label' => 'Birthday (single text)',
        'widget' => 'single_text',
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
        'label' => 'Button',
        'attr' => ['class' => 'btn--primary']
    ))
    ->add('Reset', ResetType::class, array(
        'label' => 'Reset'
    ))
    ->add('Submit', SubmitType::class, array(
        'label' => 'Submit'
    ))
    ->add('ToggleSwitch', ToggleSwitchType::class, array(
        'label' => 'Toggle Switch',
    ))
    ->getForm();

$textForm = $formFactory->createBuilder()
    ->add('basic', TextType::class, array(
        'label' => 'Text field',
        'required' => false
    ))
    ->add('withValue', TextType::class, array(
        'label' => 'Text field with value',
        'required' => false,
        'data' => 'My value'
    ))
    ->add('withErrors', TextType::class, array(
        'label' => 'Text field with errors'
    ))
    ->add('required', TextType::class, array(
        'label' => 'Required'
    ))
    ->add('placeholder', TextType::class, array(
        'label' => 'Placeholder',
        'required' => false,
        'attr' => array(
            'placeholder' => 'Oh, hello',
       ),
    ))
    ->add('helpText', TextType::class, array(
        'label' => 'Text field with help (text)',
        'required' => false,
        'attr' => [
            'data-help-text' => 'Help text to give <u>more information</u> about expected input',
        ]
    ))
    ->add('helpHtml', TextType::class, array(
        'label' => 'Text field with help (html)',
        'required' => false,
        'attr' => [
            'data-help-html' => 'Help text to give <u>more information</u> about expected input',
        ]
    ))
    ->add('guidanceText', TextType::class, array(
        'label' => 'Text field with guidance',
        'required' => false,
        'attr' => [
            'data-guidance-text' => 'Help text to give more information about expected input',
        ]
    ))
    ->add('guidanceTextRequired', TextType::class, array(
        'label' => 'Required with guidance',
        'attr' => [
            'data-guidance-text' => 'Help text to give more information about expected input',
        ]
    ))
    ->add('prependAppendText', TextType::class, array(
        'label' => 'Text field with prepended / appended text',
        'required' => false,
        'attr' => [
            'data-prepend-text' => 'Before',
            'data-append-text' => 'After',
        ]
    ))
    ->add('prependAppendIcon', TextType::class, array(
        'label' => 'Text field with prepended / appended icon',
        'required' => false,
        'attr' => [
            'data-prepend-icon' => 'icon-calendar',
            'data-append-icon' => 'icon-phone',
        ]
    ))
    ->add('noLabel', TextType::class, array(
        'label' => false,
        'required' => false,
        'attr' => [
            'data-help-text' => 'This example omits the label option entirely   '
        ]
    ))
    ->add('showLabelFalse', TextType::class, array(
        'label' => 'No label',
        'required' => false,
        'attr' => [
            'data-help-text' => 'This example hides the label with the show-label option',
            'data-show-label' => false
        ]
    ))
    ->add('longLabel', TextType::class, array(
        'label' => 'Text input with a longer than expected label which will probably wrap multple lines and push the following input onto the next baseline',
        'required' => false,
        'attr' => [
            'data-guidance-text' => 'Help text to give more information about expected input',
            'placeholder' => 'Placeholder',
            'data-help-text' => 'Example block-level help text here',
        ]
    ))
    ->add('formGroupTop', TextType::class, array(
        'label' => 'Text input with a longer than expected label but this time we use the form__group--top class to keep the label on a single line ',
        'required' => false,
        'attr' => [
            'class' => 'form__group--top',
            'data-guidance-text' => 'Help text to give more information about expected input',
            'placeholder' => 'Placeholder',
            'data-help-text' => 'Example block-level help text here',
        ]
    ))
    ->add('formGroupFlush', TextType::class, array(
        'label' => 'The same as above, but this time we also add the .form__group--flush class to keep everything on the left edge             ',
        'required' => false,
        'attr' => [
            'class' => 'form__group--top form__group--flush',
            'data-guidance-text' => 'Help text to give more information about expected input',
            'placeholder' => 'Placeholder',
            'data-help-text' => 'Example block-level help text here',
        ]
    ))
    ->add('legacyMini', TextType::class, array(
        'label' => 'form__group--top form__group--flush and form__group--mini',
        'required' => false,
        'attr' => [
            'class' => 'form__group--top form__group--flush form__group--mini',
            'data-guidance-text' => 'Help text to give more information about expected input',
            'placeholder' => 'Placeholder',
            'data-help-text' => 'Example block-level help text here',
        ]
    ))
    ->add('legacyMini', TextType::class, array(
        'label' => 'form__group--top form__group--flush and form__group--mini',
        'required' => false,
        'attr' => [
            'class' => 'form__group--top form__group--flush form__group--mini',
            'data-guidance-text' => 'Help text to give more information about expected input',
            'placeholder' => 'Placeholder',
            'data-help-text' => 'Example block-level help text here',
        ]
    ))
    ->add('legacySmall', TextType::class, array(
        'label' => 'form__group--top form__group--flush and form__group-small',
        'required' => false,
        'attr' => [
            'class' => 'form__group--top form__group--flush form__group--small',
            'data-guidance-text' => 'Help text to give more information about expected input',
            'placeholder' => 'Placeholder',
            'data-help-text' => 'Example block-level help text here',
        ]
    ))
    ->add('legacyMedium', TextType::class, array(
        'label' => 'form__group--top form__group--flush and form__group--medium',
        'required' => false,
        'attr' => [
            'class' => 'form__group--top form__group--flush form__group--medium',
            'data-guidance-text' => 'Help text to give more information about expected input',
            'placeholder' => 'Placeholder',
            'data-help-text' => 'Example block-level help text here',
        ]
    ))
    ->add('legacyDefault', TextType::class, array(
        'label' => 'form__group--top form__group--flush',
        'required' => false,
        'attr' => [
            'class' => 'form__group--top form__group--flush',
            'data-guidance-text' => 'Help text to give more information about expected input',
            'placeholder' => 'Placeholder',
            'data-help-text' => 'Example block-level help text here',
        ]
    ))
    ->add('legacyLarge', TextType::class, array(
        'label' => 'form__group--top form__group--flush and form__group--large',
        'required' => false,
        'attr' => [
            'class' => 'form__group--top form__group--flush form__group--large',
            'data-guidance-text' => 'Help text to give more information about expected input',
            'placeholder' => 'Placeholder',
            'data-help-text' => 'Example block-level help text here',
        ]
    ))
    ->add('legacyXLarge', TextType::class, array(
        'label' => 'form__group--top form__group--flush and form__group--xlarge',
        'required' => false,
        'attr' => [
            'class' => 'form__group--top form__group--flush form__group--xlarge',
            'data-guidance-text' => 'Help text to give more information about expected input',
            'placeholder' => 'Placeholder',
            'data-help-text' => 'Example block-level help text here',
        ]
    ))
    ->add('legacyFull', TextType::class, array(
        'label' => 'form__group--top form__group--flush and form__group--full',
        'required' => false,
        'attr' => [
            'class' => 'form__group--top form__group--flush form__group--full',
            'data-guidance-text' => 'Help text to give more information about expected input',
            'placeholder' => 'Placeholder',
            'data-help-text' => 'Example block-level help text here',
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

$textForm->get('withErrors')->addError(new FormError('This is not valid.'));
$textForm->get('withErrors')->addError(new FormError('This must be greater than 0.'));

$template = $twig->loadTemplate('symfony/index.html.twig');

print $template->render(array(
    'symfonyForm' => $form->createView(),
    'textForm' => $textForm->createView(),
));
