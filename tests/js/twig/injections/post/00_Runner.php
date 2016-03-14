//Construct a test instance
$test = new $testName();
//Run the PHPUnit setUp function
$test->setUp();

//Run the tests
$test->run($tests);
