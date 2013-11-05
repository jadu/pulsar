All Pulsar UI interfaces should use clear English with correct grammar and punctuaton.

### Title Case

Some interface elements should use title case which capitalises the major words (conjunctions, articles and prepositions are considered minor words).

_**T**his is an **E**xample of **T**itle **C**ase._

The following interface elements should use title case:

* Buttons
* Page, Deck, Modal, Popover titles
* Table headers

### Sentence Case

Use sentence case for everything else, including:

_**T**his is an example of sentence case._

* Breadcrumb items
* Action menu items
* Tab labels
* Form labels and help text
* Navigation links

### Actions

Your actions should be illustrative but concise, it's almost never enough for an action to simply say ‘OK’ or ‘Save’ it should attempt to provide more information about what action(s) will be performed once the user presses the button. The variation of the button you choose should help to highlight any dangerous or destructive actions and icons should be used to further illustrate the action.

<button class="btn"><i class="icon-ok"></i> Save Code Changes</button> 
<button class="btn btn--danger"><i class="icon-trash"></i> Delete Everything</button>
<button class="btn btn--primary"><i class="icon-refresh"></i> Rescan Assets</button>

If an action affects more than one item, you should badge your action button.

<button class="btn btn--danger"><i class="icon-trash"></i> Delete <span class="badge">3</span> Items</button>
<button class="btn btn--primary"><i class="icon-upload"></i> Export <span class="badge">20</span> Users</button>

If a button triggers more than one action, we should communicate this to the user where possible.

<button class="btn">Save Changes and Publish Now</button>
<button class="btn">Save Changes and Submit for Proofing</button>
<button class="btn">Change Password and Email User</button>

If an action is related to creating new items of content, use ‘create’.
If the action involves adding to a parent item or to a context that already exists (such as adding a keyword to a content item) use ‘add’.

* **Create** News Article
* **Add** Keyword

### States

Actions which modify a state should (principally) be verbs:

* Lock / Unlock
* Show / Hide
* Make Live | Take Offline

Labels which indicate the state should be past-participles or adjectives:

* Locked / Unlocked
* Visible / Hidden
* Live / Offline

When using iconography there may be the opportunity to use different icons to reflect the state and action; They may often appear together in the same interface.

Action: <button class="btn"><i class="icon-unlock"></i> Unlock</button> 

State: <span class="label label--inverse"><i class="icon-lock"></i> Locked</span> 

### Communicating State Changes

As an interface may consist of multiple tabs, deck slides and modals it's important to communicate changes as the user transitions in and out of these different interfaces. Light blue is used instead of green to highlight that while something has changed, those changes haven't been saved yet. These highlights will fade away after a few seconds.

In this example, the user has clicked the 'Add Item' and been presented with a dialog where they have picked an item, they have just been returned to this view where the originating form element has been highlighted to show which element they have just updated. The colour is matched in the information alert message at the top.

**TODO: Add example here**

### Flash Messages

Alerts are vitally important for our user interface, we reassure our users that they've saved their content or bring problems to their attention that need to be addressed while simultaneously reassuring them that all is not lost.

#### Success

* Don't rely on the colour of the message to communicate the success alone.
* Reconfirm the action that just happened; Don't just say ‘Saved’, say ‘News article saved successfully.’

<p>
<div class="flash flash--success">
    <i class="icon-ok"></i> This document has been published to your live site. <button class="btn btn__mini btn--success">View</button>
</div>
</p>

#### Failure

Be aware that a failure message will often be displayed to a confused, stressed and frustrated user who probably doesn't immediately know what has caused the message.

* Be straightforward. Explain what's going on right away.
* Be calm, don't use exclamation marks or alarming words like ‘alert’ or ‘immediately’.
* Where possible, accept blame on behalf of the user (use ‘we’ instead of ‘you’).
* If possible, offer a solution or next step.

<p>
<div class="flash flash--error">
    <i class="icon-warning-sign"></i> There was a problem uploading your file. <button class="btn btn__mini btn--danger">Retry Upload</button>
</div>
</p>

<p>
<div class="flash flash--error">
    <i class="icon-warning-sign"></i> We were unable to save your changes because of the following reasons, check them and try saving again.
    <ol>
      <li>‘<a href="#">Your postcode</a>’ didn't match a valid UK postcode.</li>
      <li>‘<a href="#">Your email</a>’ was left empty.</li>
    </ol>
</div>
</p>

#### Warning

There will be times when we need to inform the user of a pre-existing situation which may prevent them from completing their action, such as the content item they're viewing has been locked, or that there's a technical issue (file permissions, for example) which may prevent them from uploading their files.

<p>
<div class="flash flash--warning">
    <i class="icon-warning-sign"></i> This document is being reviewed by <a href="#">Paul Stanton</a> and has been locked from further edits. 
</div>
</p>

#### Information

Information messages are used when we need to tell the user something that doesn't relate to their direct actions and won't result in an error if they ignore it. These are visually styled to be the least intrusive of all flash messages.

<p>
<div class="flash flash--info">
    <i class="icon-info-sign"></i> This document was automatically saved 3 minutes ago.
</div>
</p>

### Tooltips

Use tooltips to provide useful information about elements when they are hovered over by the user, especially when the information may not need to be completely exposed in the interface every time the user encounters it.

* Never assume a user knows what an icon alone is supposed to depict. eg: <i class="icon-flag-alt" data-toggle="tooltip" title="Add this item to your ‘flagged’ list"></i> <i class="icon-flag" data-toggle="tooltip" title="Remove this item from your ‘flagged’ list"></i>
* Tooltips should maintain correct grammar and sentence case, they're there to reduce ambiguity, not add to it.

<button data-toggle="tooltip" title="Locked by Paul Stanton until Monday 4th July, 12:00pm." class="btn btn--inverse"><i class="icon-lock"></i> Locked</button>
<i class="icon-key" data-toggle="tooltip" title="This file is password protected"></i>
<span class="label label--primary" data-toggle="tooltip" title="minimum &ndash; maximum">1 &ndash; 10</span>
