$(document).ready(function() {

	// Stick the Jadu toolbar to the top of the window
	$('.toolbar').sticky({topSpacing: 0});

	// Show summary panels based on their data-tab value
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		e.target // activated tab
		e.relatedTarget // previous tab
		$('.summary.open').removeClass('open').hide();          
		$('.summary[data-tab=' + $(e.target).attr('href') + ']').show().addClass('open');
	});

});