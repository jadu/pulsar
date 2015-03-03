'use strict';

var $ = require('jquery'),
	vide = require('../../../libs/vide/dist/jquery.vide.min');

$(function() {

	$('.signin-backdrop').vide('../../../images/video/galaxy.mp4');

	$('[href=#forgot]').on('click', function(e) {
		$('.signin__inner').addClass('active-reset')
		e.preventDefault();
	});

	$('[href=#signin]').on('click', function(e) {
		$('.signin__inner').removeClass('active-reset')
		e.preventDefault();
	});
});
