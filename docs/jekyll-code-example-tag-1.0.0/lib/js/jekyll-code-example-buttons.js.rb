def code_example_buttons_js(site) 
  buttons_class = site.config['code_example_buttons_class'] ? site.config['code_example_buttons_class'] : 'buttons' 
  button_class = site.config['code_example_button_class'] ? site.config['code_example_button_class'] : 'button' 

  <<EOF
"use strict";

jQuery(function(){
  jQuery('.#{buttons_class}.examples .#{button_class}').click(function(e){
        e.preventDefault();
        var parent = jQuery(this).closest('.code-examples');
        var target = jQuery(this).attr('target');

        parent.find('.example').hide();
        parent.find('.example.'+target).show();
        parent.find('.#{buttons_class}.examples .#{button_class}.active').removeClass('active');
        parent.find('.#{buttons_class}.examples .#{button_class}[target="'+target+'"]').addClass('active');
  });

  jQuery('.#{buttons_class}.examples li:first-child .#{button_class}').click();
});
EOF
end
