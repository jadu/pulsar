Use tooltips to provide useful information about elements when they are hovered over by the user, especially when the information may not need to be completely exposed in the interface every time the user encounters it.

* Never assume a user knows what an icon alone is supposed to depict. eg: <i class="icon-flag-alt" data-toggle="tooltips" title="Add this item to your ‘flagged’ list"></i> <i class="icon-flag" data-toggle="tooltips" title="Remove this item from your ‘flagged’ list"></i>
* Tooltips should maintain correct grammar and sentence case, they're there to reduce ambiguity, not add to it.

<button data-toggle="tooltips" title="Locked by Paul Stanton until Monday 4th July, 12:00pm." class="btn btn--inverse"><i class="icon-lock"></i> Locked</button>
<i class="icon-key" data-toggle="tooltips" title="This file is password protected"></i>
<span class="label label--primary" data-toggle="tooltips" title="Minimum &ndash; Maximum">1 &ndash; 10</span>
