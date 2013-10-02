The time ago filter converts a timestamp to a human readable 'relative time'

----

Example:

	<!-- Where news.published is a timestamp from around two days ago -->
	{{ news.published|time_ago }}

	<!-- Output -->
	2 days ago

The filter will automatically pluralise the output and will cater for

* just now
* x second/seconds ago
* x minute/minutes ago
* x hour/hours ago
* x day/days ago
* x month/months ago
* x year/years ago