var Asserter = function (testInstance) {
	//Store a reference to the test instance so we can access the test name later
	this.testInstance = testInstance;
};

//Provide a generic equality asserter
Asserter.prototype.equal = function (expected, actual) {
	//Convert strange Uniter arrays to Objects
	if (_.isArray(expected)) {
		expected = _.fromPairs(_.toPairs(expected));
	}

	//Unwrap Uniter objects to plain Objects
	if (actual.objectValue) {
		actual = actual.objectValue.value;
	}

	it(this.testInstance.nextTest, function () {
		//If the Objects to compare are like Objects with properties, we need to deeply compare them
		if (_.isObjectLike(expected) && _.isObjectLike(actual)) {
			return assert.deepEqual(actual, expected);
		}

		//For all other objects, the normal equality comparator is fine
		return assert.equal(actual, expected);
	});
};

Asserter.prototype.contains = function (needle, haystack) {
	//Convert strange Uniter arrays to Objects
        if (_.isArray(needle)) {
                needle = _.fromPairs(_.toPairs(needle));
        }

        //Unwrap Uniter objects to plain Objects
        if (haystack.objectValue) {
                haystack = haystack.objectValue.value;
        }

	it(this.testInstance.nextTest, function () {
		return assert.include(haystack, needle);
	});
};

module.exports = Asserter;
