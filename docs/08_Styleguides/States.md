Actions which **modify** a state should (principally) be verbs:

<button class="btn">Lock</button>
<button class="btn">Unlock</button>

<button class="btn">Show</button>
<button class="btn">Hide</button>

<button class="btn">Publish</button>
<button class="btn">Unpublish</button>

Labels which **indicate** the state should be past-participles or adjectives:

<span class="label">Locked</span>
<span class="label">Unlocked</span>

<span class="label">Visible</span>
<span class="label">Hidden</span>

<span class="label">Published</span>
<span class="label">Offline</span>

## Icons

When using iconography there may be the opportunity to use different icons to reflect the state and action; They may often appear together in the same interface.

Action: <button class="btn"><i class="icon-unlock"></i> Unlock</button> 

State: <span class="label label--inverse"><i class="icon-lock"></i> Locked</span> 

## Communicating State Changes

As an interface may consist of multiple tabs, deck slides and modals it's important to communicate changes as the user transitions in and out of these different interfaces. Light blue is used instead of green to highlight that while something has changed, those changes haven't been saved yet. These highlights will fade away after a few seconds.

In this example, the user has clicked the 'Add Item' and been presented with a dialog where they have picked an item, they have just been returned to this view where the originating form element has been highlighted to show which element they have just updated. The colour is matched in the information alert message at the top.

**TODO: Add example here**