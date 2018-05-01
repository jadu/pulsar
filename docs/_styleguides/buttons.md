---
layout: page
title: Button Styleguide
---

Your button labels should be illustrative but concise, it's almost never enough for an button to simply say ‘OK’, it should attempt to provide more information about what action(s) will be performed once the user presses the button. The variation of the button you choose should help to highlight any dangerous or destructive actions.

## General guidance

Use title case.

<div class="pulsar-example">
    <button class="btn">This Is an Example of Title Case</button>
</div>

If the button relates to an action, the label should be (principally) a verb, use the state classes to reinforce dangerous or destructive actions.

<div class="pulsar-example">
    <button class="btn btn--primary">New</button>&nbsp;
    <button class="btn btn--primary">Save</button>&nbsp;
    <button class="btn">Edit</button>&nbsp;
    <button class="btn btn--danger">Delete</button>&nbsp;
    <button class="btn">Copy</button>&nbsp;
    <button class="btn">Show</button>&nbsp;
    <button class="btn">Hide</button>
</div>

If an action is related to creating new items of content, use ‘New’.

<div class="pulsar-example">
    <button class="btn btn--primary">New News Article</button>
</div>

If the action involves adding to a parent item or to a context that already exists (such as adding a keyword to a content item) use ‘Add’.

<div class="pulsar-example">
    <button class="btn btn--primary">Add Keyword</button>
</div>

If an action affects more than one item, you should badge your button.

<div class="pulsar-example">
    <button class="btn btn--primary"><i class="icon-upload"></i> Export <span class="badge">20</span> Users</button>&nbsp;
    <button class="btn btn--danger"><i class="icon-times"></i> Delete <span class="badge">3</span> Items</button>
</div>

If a button triggers more than one action, we should communicate this to the user where possible.

<div class="pulsar-example">
    <button class="btn">Save Changes and Publish Now</button><br /><br />
    <button class="btn">Save Changes and Submit for Proofing</button><br /><br />
    <button class="btn">Save Changes and Email User</button>
</div>

## Using icons

Icons should sparingly to further illustrate the action where necessary. To avoid unnecessary visual noise, action bar buttons should avoid the use of icons.

Icons should be used in:

* All actions menu items
* Inline delete (times, not trash)
* Blocking actions/states (locked)
* Microinteractions (saving)

<div class="pulsar-example">
    <div class="btn__group dropdown">
        <button class="btn dropdown__toggle" data-toggle="dropdown">Actions&nbsp;<span class="caret"></span></button>
        <ul class="dropdown__menu pull-left">
            <li><a href="/save"><i class="icon-save"></i>&nbsp;Save</a></li>
            <li><a href="/edit"><i class="icon-pencil"></i>&nbsp;Edit</a></li>
            <li><span class="divider"></span></li>
            <li><a href="/publish"><i class="icon-cloud-upload"></i>&nbsp;Publish</a></li>
            <li><a href="/translate"><i class="icon-globe"></i>&nbsp;Translate</a></li>
            <li><a href="/locl"><i class="icon-lock"></i>&nbsp;Lock</a></li>
            <li><span class="divider"></span></li>
            <li><a href="/delete"><i class="icon-remove"></i>&nbsp;Delete</a></li>
        </ul>
    </div>&nbsp;

    <button class="btn btn--warning"><i class="icon-refresh"></i> Rescan Assets</button>&nbsp;
    <button class="btn"><i class="icon-unlock"></i> Unlock</button>&nbsp;
    <button class="btn btn--inverse"><i class="icon-lock"></i> Locked</button>&nbsp;
    <button class="btn btn--primary is-disabled" disabled="disabled"><i class="icon-spinner icon-spin"></i> Saving</button>&nbsp;
    <button class="btn btn--success is-disabled"><i class="icon-ok"></i> Saved</button>
</div>

## Actions menu

* Use dividers to group related actions
* Use icons related to the action
* Primary actions should be grouped at the top of the list
* Disabled items should use a tooltip explaining why they are disabled

<div class="pulsar-example">
    <div class="btn__group dropdown">
        <button class="btn dropdown__toggle" data-toggle="dropdown">Actions&nbsp;<span class="caret"></span></button>
        <ul class="dropdown__menu pull-left">
            <li><a href="/save"><i class="icon-save"></i>&nbsp;Save</a></li>
            <li><a href="/edit"><i class="icon-pencil"></i>&nbsp;Edit</a></li>
            <li><span class="divider"></span></li>
            <li><a href="/publish"><i class="icon-cloud-upload"></i>&nbsp;Publish</a></li>
            <li><a href="/translate"><i class="icon-globe"></i>&nbsp;Translate</a></li>
            <li><a href="/locl"><i class="icon-lock"></i>&nbsp;Lock</a></li>
            <li><span class="divider"></span></li>
            <li><a href="/delete"><i class="icon-remove"></i>&nbsp;Delete</a></li>
        </ul>
    </div>
</div>

## Form actions

Buttons required to submit/cancel a form should be left aligned. Any destructive action, such as delete, should be right aligned to avoid accidental use.

<div class="pulsar-example">
    <div class="form__actions">
        <button class="btn btn--primary">Save</button>
        <a href="#" class="btn btn--naked">Cancel</a>
        <a href="#" data-toggle="modal" class="btn btn--danger pull-right">Delete</a>
    </div>
</div>
