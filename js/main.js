/**
 * Pulsar
 *
 * Core UI components that should always be present.
 *
 * Jadu Ltd.
 */

// Fixes issue with dependencies that expect both $ and jQuery to be set
window.jQuery = window.$ = require('jquery');

// Global UI components
var $               = require('jquery'),
	deck            = require('./deck'),
	dropdown        = require('./dropdown'),
	flash           = require('./flash'),
	modal           = require('./modal'),
	tab             = require('./tab'),
	popover         = require('./popover'),
	tooltip         = require('./tooltip'),

	clickover       = require('../libs/bootstrapx-clickover/js/bootstrapx-clickover'),
	svgeezy         = require('../libs/svgeezy/svgeezy.min'),
	toggles         = require('../libs/jquery-toggles/toggles.min'),

	ButtonComponent = require('./ButtonComponent'),
	MasterSwitchComponent = require('./masterSwitchComponent'),
	SignInComponent = require('./area/signin/signin');

$(function () {

	var $html = $('html');

	buttonComponent = new ButtonComponent($html);
    buttonComponent.init();

    signIn = new SignInComponent($html);
    signIn.initialize();

    masterSwitch = new MasterSwitchComponent($html);
    masterSwitch.init();

    // Switch out .svg for .png for <img> elements in older browsers
    svgeezy.init('nocheck', 'png');

    // Use clickover enhancements for popovers
    $('[rel="clickover"]').clickover({ 'global_close': true });

});

