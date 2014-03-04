Your button labels should be illustrative but concise, it's almost never enough for an button to simply say ‘OK’ or ‘Save’ it should attempt to provide more information about what action(s) will be performed once the user presses the button. The variation of the button you choose should help to highlight any dangerous or destructive actions and icons should be used to further illustrate the action.

## General guidance

* Use title case
* If an action is related to creating new items of content, use ‘create’
* If the action involves adding to a parent item or to a context that already exists (such as adding a keyword to a content item) use ‘add’

----

Examples:

<button class="btn btn--primary"><i class="icon-ok"></i> Create News Article</button> 
<button class="btn btn--primary"><i class="icon-plus"></i> Add Keyword</button> 
<button class="btn btn--danger"><i class="icon-trash"></i> Delete Everything</button>
<button class="btn"><i class="icon-refresh"></i> Rescan Assets</button>

If an action affects more than one item, you should badge your button.

<button class="btn btn--danger"><i class="icon-trash"></i> Delete <span class="badge">3</span> Items</button>
<button class="btn btn--primary"><i class="icon-upload"></i> Export <span class="badge">20</span> Users</button>

If a button triggers more than one action, we should communicate this to the user where possible.

<button class="btn">Save Changes and Publish Now</button>
<button class="btn">Save Changes and Submit for Proofing</button>
<button class="btn">Change Password and Email User</button>
