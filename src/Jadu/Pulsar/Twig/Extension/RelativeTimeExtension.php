<?php

namespace Jadu\Pulsar\Twig\Extension;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Relative Time
 *
 * A filter which converts a unix timestamp into a relative string like
 * 2 hours ago, 5 days ago, 1 month ago
 *
 * Usage: "1380093916"|time_ago
 *
 * Unit tests: tests/unit/RelativeTimeExtensionTest.php
 */
class RelativeTimeExtension extends AbstractExtension
{

    public function getName()
    {
        return 'relative_time_extension';
    }

    public function getFilters()
    {
        return array(
            new TwigFilter('time_ago', array($this, 'timeAgo'))
        );
    }

    public function timeAgo($time_from = null)
    {
        if ($time_from === null) {
            return false;
        }

        if ($time_from instanceof \DateTime) {
            $time_from = $time_from->getTimestamp();
        }

        $etime = time() - $time_from;

        if ($etime < 1)
        {
            return 'just now';
        }

        $a = array( 12 * 30 * 24 * 60 * 60  =>  'year',
                    30 * 24 * 60 * 60       =>  'month',
                    24 * 60 * 60            =>  'day',
                    60 * 60                 =>  'hour',
                    60                      =>  'minute',
                    1                       =>  'second'
                    );

        foreach ($a as $secs => $str)
        {
            $d = $etime / $secs;
            if ($d >= 1)
            {
                $r = round($d);
                break;
            }
        }

        return $r . ' ' . $str . ($r > 1 ? 's' : '') . ' ago';

    }

}
