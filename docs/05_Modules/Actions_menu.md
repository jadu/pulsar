The actions menu is a persistent element that provides a useful place to gather together the main actions that can be performed within a given UI, even if they occur elsewhere as well as a back-button to return the user to their previous page.

Think of this as similar to the 'File' menu that appears in most desktop software.

<div class="btn__toolbar">
    <div class="btn__group">
        <a class="btn" href="#back" onclick="history.back(); return false;"><i class="icon-arrow-left"></i></a>
        <div class="btn__group">
			<button type="button" class="btn dropdown__toggle" id="tour-actions" data-toggle="dropdown"> Actions <span class="caret"></span></button>
	    	<ul class="dropdown__menu">
				<li><a href="#"><i class="icon-save "></i> Save</a></li>
				<li><a href="#"><i class="icon-print "></i> Print</a></li>
				<li><a href="#"><i class="icon-lock "></i> Lock</a></li>
				<li><a href="#"><i class="icon-group "></i> Collaborators <span class="badge ">3</span></a></li>
				<li></li><li class="divider"></li>
				<li><a href="#" class="link--danger"><i class="icon-trash "></i> Delete</a></li>
			</ul>
		</div>
    </div>
</div>

----

Set the links to display in the actions menu by populating the `actions_menu` variable from within your view. Use [icons](HTML_helper/icons) as much as possible to further illustrate the action performed by each option.

	{% 
	    set actions_menu = [
	        html.link(html.icon('save') ~ ' Save'),
	        html.link(html.icon('print') ~ ' Print'),
	        html.link(html.icon('lock') ~ ' Lock'),
	        html.link(html.icon('group') ~ ' Collaborators ' ~ html.badge(3)),
	        html.divider(),
	        html.link(html.icon('trash') ~ ' Delete', '#', 'link--danger')
	    ]
	%}