<?php

class RelativeTimeTest extends PHPUnit_Framework_TestCase
{
	public function setUp()
	{
		require_once 'extensions/RelativeTime.php';
		$this->rtime = new Relative_Time_Extension();
	}

	public function testJustNow() {
		$this->assertEquals('just now', $this->rtime->timeAgo(time()));
	}

	public function testSecondAgo() {
		$this->assertEquals('1 second ago', $this->rtime->timeAgo(time() - 1));
	}

	public function testSecondsAgo() {
		$this->assertEquals('5 seconds ago', $this->rtime->timeAgo(time() - 5));
	}

	public function testMinuteAgo() {
		$this->assertEquals('1 minute ago', $this->rtime->timeAgo(time() - 60));
	}

	public function testMinutesAgo() {
		$this->assertEquals('2 minutes ago', $this->rtime->timeAgo(time() - 120));
	}

	public function testHourAgo() {
		$this->assertEquals('1 hour ago', $this->rtime->timeAgo(time() - 3600));
	}

	public function testHoursAgo() {
		$this->assertEquals('2 hours ago', $this->rtime->timeAgo(time() - 7200));
	}

	public function testDayAgo() {
		$this->assertEquals('1 day ago', $this->rtime->timeAgo(time() - 86400));
	}

	public function testDaysAgo() {
		$this->assertEquals('2 days ago', $this->rtime->timeAgo(time() - 172800));
	}

	public function testMonthAgo() {
		$this->assertEquals('1 month ago', $this->rtime->timeAgo(time() - 2592000));
	}

	public function testMonthsAgo() {
		$this->assertEquals('2 months ago', $this->rtime->timeAgo(time() - 5184000));
	}

	public function testYearAgo() {
		$this->assertEquals('1 year ago', $this->rtime->timeAgo(time() - 31104000));
	}

	public function testYearsAgo() {
		$this->assertEquals('2 years ago', $this->rtime->timeAgo(time() - 62208000));
	}
}
