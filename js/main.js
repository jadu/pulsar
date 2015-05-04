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
	toggles         = require('../libs/jquery-toggles/toggles.min'),
	tooltip         = require('./tooltip'),
	MasterSwitchComponent = require('./masterSwitchComponent'),
	SignInComponent = require('./area/signin/signin');

$(function () {

	var $html = $('html');

    signIn = new SignInComponent($html);
    signIn.initialize();

    masterSwitch = new MasterSwitchComponent($html);
    masterSwitch.init();


});

