var $ = require('jquery'),
	hljs = require('../libs/highlightjs/lib/index');

$(function () {

	if (!$('html.ie7').size()) { // IE8 and up only
		$('pre code').each(function(i, block) {
			hljs.highlightBlock(block);
		});
	};

});
