/**
 * Pulsar
 *
 * Core UI components that should always be present.
 *
 * Jadu Ltd.
 */

// Fixes issue with dependencies that expect both $ and jQuery to be set
window.jQuery = require('jquery');

// Global UI components
var $          = require('jquery'),
	deck       = require('./deck'),
	dropdown   = require('./dropdown'),
	flash      = require('./flash'),
	modal      = require('./modal'),
	tab        = require('./tab'),
	popover    = require('./popover'),
	tooltip    = require('./tooltip');
