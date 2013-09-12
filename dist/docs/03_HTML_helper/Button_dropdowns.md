Show a dropdown/dropup menu when the button is clicked

Usage:
	
	{{ html.button-dropdown(label, class, id, menu_items) }}
	{{ html.button-dropup(label, class, id, menu_items) }}
	
Pass a list of links to the `menu_items` parameter to be used as the dropdown/up menu, remember you can chain together icons, labels and badges too.
	
	{{ 
	   html.button_dropdown(
	   	label = 'Drop Down',
		[	
			html.link(label = html.icon('save') ~ ' Save'),
			html.link(label = html.icon('print') ~ ' Print'),
			html.link(label = html.icon('star') ~ ' Favourite ' ~ html.badge(3)),
			html.divider(),
			html.link(label = html.icon('trash') ~ ' Delete')
		]	
       ) 	
	}}
	
<div class="btn__group">
<button type="button" class="btn dropdown__toggle" data-toggle="dropdown">Drop Down <span class="caret"></span></button>
<ul class="dropdown__menu">
<li><a href="#">Action</a></li>
<li><a href="#">Another action</a></li>
<li><a href="#">Something else here</a></li>
<li class="divider"></li>
<li><a href="#">Separated link</a></li>
</ul>
</div>

<div class="btn__group dropup">
<button type="button" class="btn dropdown__toggle" data-toggle="dropdown">Drop Up <span class="caret"></span></button>
<ul class="dropdown__menu">
<li><a href="#">Action</a></li>
<li><a href="#">Another action</a></li>
<li><a href="#">Something else here</a></li>
<li class="divider"></li>
<li><a href="#">Separated link</a></li>
</ul>
</div>