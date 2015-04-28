Show a list of things that have happened since the user last looked.

Notifications are very closely related to dropdown buttons and use the same javascript at this point.

----

Available attributes:

    {{ pulsar.notifications(items, count = null) }}

If you don't specify a count, it will be calculated from the size of `items`.

Usage:

    {{
      pulsar.notifications([
        pulsar.notification(
          icon = html.icon('asterisk'),
          href = '#',
          title = 'Something awesome happened',
          description = 'And we want to show you it',
          time = 'Just now'
        ),
        pulsar.notification(
          icon = html.icon('asterisk'),
          href = '#',
          title = 'Something awesome happened',
          description = 'And we want to show you it',
          time = 'Just now'
        ),
        pulsar.notification(
          icon = html.icon('warning-sign'),
          href = '#',
          title = 'Something bad happened',
          description = 'And we want to show you it',
          time = '10 mins ago',
          class = 'notification--danger'
        )
      ])
    }}

If you're using AJAX to fetch the actual notifications (and you really, really should), then you can simply specify the count, and do your magic when the dropdown is toggled.

    {{ pulsar.notifications(count = 3) }}

Example Output:

<div class="notifications open">
  <button type="button" class="btn dropdown__toggle" data-toggle="dropdown">
      <span class="badge badge--danger">3</span>
  </button>
  <ul class="dropdown__menu">
    <li class="notifications__header">
      <a href="#" class="notifications__dismiss" data-toggle="tooltips" title="" data-placement="left" data-original-title="Mark all as read"><i class="icon-check-sign"></i></a>
      <h1>Notifications</h1>
  </li>
  <li class="notification">
    <a href="#">
      <p class="notification__title"><i class="icon-asterisk"></i> Something awesome happened</p>
      <p class="notification__description">And we want to show you it</p>
      <time class="notification__time">Just now</time>
  </a>
  </li>
  <li class="notification">
    <a href="#">
      <p class="notification__title"><i class="icon-asterisk"></i> Something else happened</p>
      <p class="notification__description">And we want to show you that one too!</p>
      <time class="notification__time">3 minutes ago</time>
  </a>
</li>
<li class="notification notification--danger">
    <a href="#">
      <p class="notification__title"><i class="icon-warning-sign"></i> Something bad happened</p>
      <p class="notification__description">And we want to show you it</p>
      <time class="notification__time">2 days ago</time>
  </a>
</li>
</ul>
</div>

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
