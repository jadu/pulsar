<?php

use Jadu\Style\Twig\Standard\JaduStandard;
use TwigCsFixer\Config\Config;
use TwigCsFixer\File\Finder;
use TwigCsFixer\Ruleset\Ruleset;

$finder = Finder::create()
    ->in(__DIR__ . '/src')
    ->ignoreVCSIgnored(true);

$config = new Config();
$config->setFinder($finder);

$ruleset = new Ruleset();
$ruleset->addStandard(new JaduStandard());
$config->setRuleset($ruleset);

return $config;
