<?php

namespace Jadu\Pulsar\Twig\Extension;

use Htmlawed;

class SanitiseExtension extends \Twig_Extension
{

    public function getName()
    {
        return 'sanitise_extension';
    }

    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('sanitise', array($this, 'sanitise'))
        );
    }

    private const FILTER_CONFIG = array(
        'comments' => 0,
        'cdata' => 0,
        'deny_attribute' => 'on*',
        'unique_ids' => 0,
        'elements' => '* -applet -audio -canvas -embed -iframe -object -script -video',
        'schemes' => 'href: aim, feed, file, ftp, gopher, http, https, irc, mailto, news, nntp, sftp, ssh, tel, telnet; style: !; *:file, http, https'
    );

    public function sanitise($data)
    {
        return Htmlawed::filter($data, self::FILTER_CONFIG);
    }

}
