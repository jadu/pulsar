<?php

namespace Jadu\Pulsar\Twig\Extension;

class RelativeTimeExtensionTest extends \PHPUnit\Framework\TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->ext = new RelativeTimeExtension();
    }

    public function testGetName()
    {
        $this->assertEquals('relative_time_extension', $this->ext->getName());
    }

    public function testNullReturnsFalse()
    {
        $this->assertEquals(false, $this->ext->timeAgo());
    }

    public function testJustNow()
    {
        $this->assertEquals('just now', $this->ext->timeAgo(time()));
    }

    public function testSecondAgo()
    {
        $this->assertEquals('1 second ago', $this->ext->timeAgo(time() - 1));
    }

    public function testSecondsAgo()
    {
        $this->assertEquals('5 seconds ago', $this->ext->timeAgo(time() - 5));
    }

    public function testMinuteAgo()
    {
        $this->assertEquals('1 minute ago', $this->ext->timeAgo(time() - 60));
    }

    public function testMinutesAgo()
    {
        $this->assertEquals('2 minutes ago', $this->ext->timeAgo(time() - 120));
    }

    public function testHourAgo()
    {
        $this->assertEquals('1 hour ago', $this->ext->timeAgo(time() - 3600));
    }

    public function testHoursAgo()
    {
        $this->assertEquals('2 hours ago', $this->ext->timeAgo(time() - 7200));
    }

    public function testDayAgo()
    {
        $this->assertEquals('1 day ago', $this->ext->timeAgo(time() - 86400));
    }

    public function testDaysAgo()
    {
        $this->assertEquals('2 days ago', $this->ext->timeAgo(time() - 172800));
    }

    public function testMonthAgo()
    {
        $this->assertEquals('1 month ago', $this->ext->timeAgo(time() - 2592000));
    }

    public function testMonthsAgo()
    {
        $this->assertEquals('2 months ago', $this->ext->timeAgo(time() - 5184000));
    }

    public function testYearAgo()
    {
        $this->assertEquals('1 year ago', $this->ext->timeAgo(time() - 31104000));
    }

    public function testYearsAgo()
    {
        $this->assertEquals('2 years ago', $this->ext->timeAgo(time() - 62208000));
    }

    public function testDateTimeString()
    {
        date_default_timezone_set('UTC');
        $date = new \DateTime('now');
        $date->setTimezone(new \DateTimeZone('UTC'));
        $this->assertEquals('just now', $this->ext->timeAgo($date));
    }
}
