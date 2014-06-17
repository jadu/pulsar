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
            html.link(label = html.icon('save') ~ ' Save'),
            html.link(label = html.icon('print') ~ ' Print'),
            html.link(label = html.icon('lock') ~ ' Lock'),
            html.link(label = html.icon('group') ~ ' Collaborators ' ~ html.badge(3)),
            html.divider(),
            html.link(
                label = html.icon('trash') ~ ' Delete', 
                href = '#', 
                class = 'link--danger')
        ]
    %}

----

Actions may need to indicate a progress if they're not immediately available. The use cases around this isn‘t entirely clear at the moment, but Quantum uses it to explain that the file which can be downloaded hasn't yet finished archiving, but we can offer them the option to receive an email when it‘s finished. These progress bars should update their progress live with JS.

    {% 
        set actions_menu = [
            html.link(
                label = html.icon('download-alt') ~ ' Download file bundle (.zip)',
                progress = 25
            )
        ]
    %}

<div class="btn__group open">
    <button type="button" class="btn dropdown__toggle" data-toggle="dropdown">
        Actions <span class="caret"></span>
    </button>
    <ul class="dropdown__menu">
        <li>
            <a href="#" class="js-evidence-download has-popover" data-original-title="" title="">
                <i class="icon-download-alt"></i> Download file bundle (.zip)
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;">
                        <span class="sr-only">25%</span>
                    </div>
                </div>
            </a>
        </li>
    </ul>
</div>

<br /><br /><br /><br /><br />