"use strict";

jQuery(function(){
  jQuery('.code-examples__buttons.examples .code-examples__button').click(function(e){
        e.preventDefault();
        var parent = jQuery(this).closest('.code-examples');
        var target = jQuery(this).attr('target');

        parent.find('.example').hide();
        parent.find('.example.'+target).show();
        parent.find('.code-examples__buttons.examples .code-examples__button.active').removeClass('active');
        parent.find('.code-examples__buttons.examples .code-examples__button[target="'+target+'"]').addClass('active');
  });

  jQuery('.code-examples__buttons.examples li:first-child .code-examples__button').click();
});
