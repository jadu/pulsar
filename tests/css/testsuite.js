
/*
	Initialise CasperJs
*/

var libraryRoot = './libs/phantomcss/';

phantom.casperPath = libraryRoot + 'CasperJs';
phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');
phantom.injectJs('jquery.js');

var casper = require('casper').create({
	viewportSize: {
		width: 1024,
		height: 1024
	}
});

/*
	Require and initialise PhantomCSS module
*/

var phantomcss = require(libraryRoot + 'phantomcss.js');
var url = 'http://localhost:8000/lexicon';

phantomcss.init({
	screenshotRoot: './tmp/screenshots',
	failedComparisonsRoot: './tmp/failures',
	libraryRoot: libraryRoot
});

/*
	The test scenario
*/

casper.
	start( url ).
	then(function() {
		phantomcss.screenshot('#buttons', 'buttons');
	}).
	then(function() {
		casper.click('a[href="#buttons"]');

		casper.waitForSelector('#buttons.is-active',
			function success(){
				phantomcss.screenshot('#buttons', 'buttons');
			},
			function timeout(){
				casper.test.fail('Should see buttons tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#decks"]');

		casper.waitForSelector('#decks.is-active',
			function success(){
				phantomcss.screenshot('#decks', 'decks');
			},
			function timeout(){
				casper.test.fail('Should see decks tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#flash"]');

		casper.waitForSelector('#flash.is-active',
			function success(){
				phantomcss.screenshot('#flash', 'flash messages');
			},
			function timeout(){
				casper.test.fail('Should see flash messages tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#forms"]');

		casper.waitForSelector('#forms.is-active',
			function success(){
				phantomcss.screenshot('#forms', 'forms');
			},
			function timeout(){
				casper.test.fail('Should see forms tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#modals"]');

		casper.waitForSelector('#modals.is-active',
			function success(){
				phantomcss.screenshot('#modals', 'modals');
			},
			function timeout(){
				casper.test.fail('Should see modals tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#progress"]');

		casper.waitForSelector('#progress.is-active',
			function success(){
				phantomcss.screenshot('#progress', 'progress');
			},
			function timeout(){
				casper.test.fail('Should see progress tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#table"]');

		casper.waitForSelector('#table.is-active',
			function success(){
				phantomcss.screenshot('#table', 'table');
			},
			function timeout(){
				casper.test.fail('Should see table tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#type"]');

		casper.waitForSelector('#type.is-active',
			function success(){
				phantomcss.screenshot('#type', 'typography');
			},
			function timeout(){
				casper.test.fail('Should see typography tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#summary"]');

		casper.waitForSelector('#summary.is-active',
			function success(){
				phantomcss.screenshot('#summary', 'table_with_summary');
			},
			function timeout(){
				casper.test.fail('Should see table with summary tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#filters"]');

		casper.waitForSelector('#filters.is-active',
			function success(){
				phantomcss.screenshot('#filters', 'table_with_filters');
			},
			function timeout(){
				casper.test.fail('Should see table with filters tab');
			}
		);
	}).
	then( function now_check_the_screenshots(){
		phantomcss.compareAll();
	}).
	run( function end_it(){
		console.log('\nTHE END.');
		phantom.exit(phantomcss.getExitStatus());
	});
