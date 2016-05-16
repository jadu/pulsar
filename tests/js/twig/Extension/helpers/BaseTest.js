global._ = require('lodash');
global.fs = require('fs');
global.util = require('util');
global.path = require('path');
global.assert = require('chai').assert;
global.expect = require('chai').expect;
global.sinon = require('sinon');
global.moment = require('moment');
var Asserter = require('./Asserter');

var phpParser = require('phptoast').create(),
    phpToJS = require('phptojs'),
    phpRuntime = require('phpruntime/sync'); // Require the sync entrypoint so you can actually read the stack trace

var timeNow = new Date('2016-01-01 12:00').getTime();
var testInstance;

phpRuntime.install({
    functionGroups: [
        function (internals) {
            return {
                'time': function () {
                    return internals.valueFactory.createInteger(timeNow/1000);
                },
                'date_default_timezone_set': function () {
                    return null;
                },
                'json_decode': function (json, assoc) {
                    var parsed = JSON.parse(json.getValue().getNative());

                    if (assoc) {
                        return internals.valueFactory.createFromNative(parsed);
                    }

                    return internals.valueFactory.createObject(parsed, internals.globalNamespace.getClass('JSObject'));
                }
            };
        }
    ],
    classes: {
        'DateTime': function (internals) {
            function DateTime(time) {
                switch (time) {
                    case 'now':
                    default:
                        this.time = moment();
                }
            }

            DateTime.prototype.setTimezone = function () {};

            internals.defineUnwrapper(function () {
                return this.time.toDate();
            });

            return DateTime;
        },
        'DateTimeZone': function () {
            function DateTimeZone() {}

            return DateTimeZone;
        },
        'Twig_Environment': function () {
            function Twig_Environment() {}

            return Twig_Environment;
        },
        'PHPUnit_Framework_TestCase': function (internals) {
            function PHPUnit_Framework_TestCase() {}

            PHPUnit_Framework_TestCase.prototype.run = function (tests) {
                var self = this.value,
                    native = this.getNative();

                tests = tests.getValue().getNative();
                _.each(tests, function (test) {
                    testInstance.setTestName(self[test].funcName);
                    native.callMethod(self[test].funcName);
                });
            };

            PHPUnit_Framework_TestCase.prototype.assertEquals = function (a, b) {
                return testInstance.asserter.equal(a.getNative(), b.getNative());
            };

            PHPUnit_Framework_TestCase.prototype.assertContains = function (a, b) {
                return testInstance.asserter.contains(a.getNative(), b.getNative());
            };

            PHPUnit_Framework_TestCase.prototype.assertArrayHasKey = function (key, array) {
                return testInstance.asserter.contains(key.getNative(), array.getNative());
            };

            internals.disableAutoCoercion();

            return PHPUnit_Framework_TestCase;
        }
    }

});

function BaseTest() {
    this.testsPath = path.resolve(__dirname + '/../../../../unit/Jadu/Pulsar/Twig/Extension/');
    this.asserter = new Asserter(this);
}

BaseTest.prototype.rewriteTest = function (test) {
    //Remove namespaces
    test = test.replace('namespace Jadu\\Pulsar\\Twig\\Extension;\n', '');

    //Test runner
    test = test + '$test = new $testName(); $test->setUp(); $test->run($tests);';

    return test;
};

BaseTest.prototype.calculateTestsToRun = function (test) {
    //Find tests to run by parsing the PHP file.
    //Uniter does not yet support class reflection.
    var testsToRun = [];
    var testNameRegex = /public function test([\S]*)\(\)/g;
    var testNames;
    while ((testNames = testNameRegex.exec(test)) !== null) {
        var testName = testNames[1];
        testsToRun.push('test' + testName);
    }

    this.testsToRun = testsToRun;
};

BaseTest.prototype.setTestName = function (testName) {
    this.nextTest = testName;
};

BaseTest.prototype.injectClass = function (name, jsClass) {
    var classes = {};
    classes[name] = function () {
        return jsClass;
    };

    phpRuntime.install({
        classes: classes
    });
};

BaseTest.prototype.run = function () {
    this.test = this.testName + '.php';

    testInstance = this;

    var testPath = path.resolve(this.testsPath + '/' + this.test);
    var test = fs.readFileSync(testPath).toString();

    this.calculateTestsToRun(test);
    test = this.rewriteTest(test);

    var wrapper = new Function('return ' + phpToJS.transpile(phpParser.parse(test), {bare: true}) + ';')(),
        module = phpRuntime.compile(wrapper),
        engine = module();

    engine.getStdout().on('data', function (text) { console.log(text); });
    engine.getStderr().on('data', function (text) {
        console.error('Bang:');
        console.error(text);
    });

    engine.expose(this.testName, 'testName');
    engine.expose(this.testsToRun, 'tests');

    sinon.useFakeTimers(timeNow);

    describe(this.testName, function () {
        engine.execute();
    });
};

module.exports = BaseTest;
