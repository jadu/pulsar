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

    // Subnavigation collapse (copied from daux.io, should be made nicerer)
    $('.aj-nav').click(function(e) {
        e.preventDefault();
        $(this).parent().siblings().find('ul').slideUp().parent().removeClass('is-active');
        $(this).parent().addClass('is-active');
        $(this).next().slideToggle('fast');
    });

    // Trigger syntax highlighting
    window.onload = function() {
        var aCodes = document.getElementsByTagName('pre');
        for (var i=0; i < aCodes.length; i++) {
            hljs.highlightBlock(aCodes[i]);
        }
    };

});