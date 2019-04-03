<?php

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
    ->add('Date', DateType::class, array(
        'label' => 'Date'
    ))
    ->add('DateInterval', DateIntervalType::class, array(
        'label' => 'Date Interval'
    ))
    ->add('DateTime', DateTimeType::class, array(
        'label' => 'Date Time'
    ))
    ->add('Time', TimeType::class, array(
        'label' => 'Time'
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