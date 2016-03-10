//Re-implement PHPUnit's TestCase
class PHPUnit_Framework_TestCase
{
	//Setup a static constructor so that our Test Cases can inherit
	static function __construct() {
	}

	//Override the PHP Twig Extension with the JavaScript implementation
	public function setJavaScriptExtension($ext) {
		$this->ext = $ext;
	}

	//Set the JavaScript assertion implementation
	public function setAsserter($asserter) {
		$this->asserter = $asserter;
	}

	//Set the Javascript test name setter
	public function setNameSetter($nameSetter) {
		$this->nameSetter = $nameSetter;
	}

	//Run the tests
	public function run($tests) {
		//$tests is an array of strings; the names of the test functions
		for($i = 0; $i < count($tests); $i++) {
			$testToRun = $tests[$i];

			//Set the test name (calls it() in JavaScript)
			$this->nameSetter->setTestName($testToRun);

			//Run the test
			$this->$testToRun();
		}
	}

	//Actual assertions happen in JavaScript
	private function assertEquals($a, $b) {
		return $this->asserter->equal($a, $b);
	}

	private function assertContains($a, $b) {
		return $this->asserter->contains($a, $b);
	}

	private function assertArrayHasKey($key, $array) {
	    return $this->asserter->contains($key, $array);
	}
}
