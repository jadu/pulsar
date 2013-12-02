<?php

  $tags = array('if');
  $filters = array('upper');
  $methods = array(
    'Article' => array('getTitle', 'getBody'),
  );
  $properties = array(
    'Article' => array('title', 'body'),
  );
  $functions = array('range');

  $policy = new Twig_Sandbox_SecurityPolicy($tags, $filters, $methods, $properties, $functions);
  $sandbox = new Twig_Extension_Sandbox($policy, true);
