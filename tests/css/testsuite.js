
/*
	Initialise CasperJs
*/

var libraryRoot = './libs/phantomcss/';

phantom.casperPath = libraryRoot + 'CasperJs';
phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');
phantom.injectJs('jquery.js');

var casper = require('casper').create({
	viewportSize: {
		width: 800,
		height: 800
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
		phantomcss.screenshot('#tab_1', 'typography');
	}).
	then(function() {
		casper.click('a[href="#tab_2"]');

		casper.waitForSelector('#tab_2.is-active',
			function success(){
				phantomcss.screenshot('#tab_2', 'buttons');
			},
			function timeout(){
				casper.test.fail('Should see buttons tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#tab_3"]');

		casper.waitForSelector('#tab_3.is-active',
			function success(){
				phantomcss.screenshot('#tab_3', 'forms');
			},
			function timeout(){
				casper.test.fail('Should see forms tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#tab_4"]');

		casper.waitForSelector('#tab_4.is-active',
			function success(){
				phantomcss.screenshot('#tab_4', 'flash messages');
			},
			function timeout(){
				casper.test.fail('Should see flash messages tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#tab_5"]');

		casper.waitForSelector('#tab_5.is-active',
			function success(){
				phantomcss.screenshot('#tab_5', 'modals');
			},
			function timeout(){
				casper.test.fail('Should see modals tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#tab_6"]');

		casper.waitForSelector('#tab_6.is-active',
			function success(){
				phantomcss.screenshot('#tab_6', 'tooltips');
			},
			function timeout(){
				casper.test.fail('Should see tooltips tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#tab_7"]');

		casper.waitForSelector('#tab_7.is-active',
			function success(){
				phantomcss.screenshot('#tab_7', 'popovers');
			},
			function timeout(){
				casper.test.fail('Should see popovers tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#tab_8"]');

		casper.waitForSelector('#tab_8.is-active',
			function success(){
				phantomcss.screenshot('#tab_8', 'tables');
			},
			function timeout(){
				casper.test.fail('Should see tables tab');
			}
		);
	}).
	then(function() {
		casper.click('a[href="#tab_9"]');

		casper.waitForSelector('#tab_9.is-active',
			function success(){
				phantomcss.screenshot('#tab_9', 'progress bars');
			},
			function timeout(){
				casper.test.fail('Should see progress bars tab');
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
