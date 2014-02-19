Save buttons are one of the most used UI elements within our software but historically they're unintelligent and inconsistent, especially when the system attempts to communicate success/failure back to the user.

A Pulsar save button should communicate the system's current saving state to the user in-situ without relying on methods like flash messages, which typically only appear at the top of the page, to communicate whether or not something actually happened.

## Modes & loops

### Normal save

<button class="btn btn--primary">Save</button> <i class="icon-long-arrow-right"></i> <button class="btn btn--primary is-disabled" disabled="disabled"><i class="icon-spinner icon-spin"></i> Saving</button> <i class="icon-long-arrow-right"></i> <button class="btn btn--success is-disabled"><i class="icon-ok"></i> Saved</button> <i class="icon-time"></i> 3s <button class="btn btn--primary">Save</button>

* Button disabled while save action in progress
* Changes in width and colour should be quickly animated

### Longer-than-expected save

If we encounter a slower than usual response, we can take the opportunity to reassure the user that we're aware of it, and that we're still working.

<button class="btn btn--primary">Save</button> <i class="icon-long-arrow-right"></i> <button class="btn btn--primary is-disabled" disabled="disabled"><i class="icon-spinner icon-spin"></i> Saving</button> <i class="icon-time"></i> 5s <button class="btn btn--warning is-disabled" disabled="disabled"><i class="icon-spinner icon-spin"></i> Still Saving</button> <i class="icon-long-arrow-right"></i> <button class="btn btn--success is-disabled"><i class="icon-ok"></i> Saved</button>

### Failed save

<button class="btn btn--primary">Save</button> <i class="icon-long-arrow-right"></i> <button class="btn btn--primary is-disabled" disabled="disabled"><i class="icon-spinner icon-spin"></i> Saving</button> <i class="icon-long-arrow-right"></i> <button class="btn btn--danger is-disabled"><i class="icon-warning-sign"></i> Save Failed</button>

* Should be accompanied by an alert, or blocking modal confirming the error

### Auto save

<button class="btn btn--primary">Save</button> <i class="icon-long-arrow-right"></i> <button class="btn btn--primary">&nbsp;&nbsp;<i class="icon-spinner icon-spin"></i>&nbsp;&nbsp;</button> <i class="icon-long-arrow-right"></i> <button class="btn btn--primary">&nbsp;&nbsp;<i class="icon-ok"></i>&nbsp;&nbsp;</button> <i class="icon-long-arrow-right"></i> <button class="btn btn--primary">Save</button>

* Button should not change size to minimize distraction while the user is working
* Button should fade between all states