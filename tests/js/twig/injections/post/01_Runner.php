//Construct a test instance
$test = new $testName();
//Run the PHPUnit setUp function
$test->setUp();
//Inject our JavaScript Extension
$test->setJavaScriptExtension($javascriptExtension);
//Inject our JavaScript test asserter
$test->setAsserter($asserter);
//Inject our JavaScript test name setter
$test->setNameSetter($nameSetter);

//Run the tests
$test->run($tests, $testsCount);
