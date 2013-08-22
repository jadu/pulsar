**Normal save**

* Button disabled while save action in progress
* Changes in width and colour should be quickly animated

<button class="btn btn--primary">Save</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--primary is-disabled" disabled="disabled"><i class="icon-spinner icon-spin"></i> Saving</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--success is-disabled""><i class="icon-ok"></i> Saved</button>
<i class="icon-time"></i> 3s
<button class="btn btn--primary">Save</button>

**Longer-than-expected save**

<button class="btn btn--primary">Save</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--primary is-disabled" disabled="disabled"><i class="icon-spinner icon-spin"></i> Saving</button>
<i class="icon-time"></i> 5s
<button class="btn btn--warning is-disabled" disabled="disabled"><i class="icon-spinner icon-spin"></i> Still Saving</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--success is-disabled""><i class="icon-ok"></i> Saved</button>

**Failed save**

* Should be accompanied by an alert, or blocking modal confirming the error

<button class="btn btn--primary">Save</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--primary is-disabled" disabled="disabled"><i class="icon-spinner icon-spin"></i> Saving</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--danger is-disabled""><i class="icon-warning-sign"></i> Save Failed</button>

**Auto save**

* Button should not change size to minimize distraction while the user is working
* Button should fade between all states

<button class="btn btn--primary">Save</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--primary">&nbsp;&nbsp;<i class="icon-spinner icon-spin"></i>&nbsp;&nbsp;</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--primary">&nbsp;&nbsp;<i class="icon-ok"></i>&nbsp;&nbsp;</button>
<i class="icon-long-arrow-right"></i>
<button class="btn btn--primary">Save</button>

### Selecting multiple items to perform an action on

<button class="btn">Actions <i class="icon-caret-down"></i></button>
<i class="icon-long-arrow-right"></i>
<button class="btn">Actions <span class="badge badge--primary">3</span> <i class="icon-caret-down"></i></button>