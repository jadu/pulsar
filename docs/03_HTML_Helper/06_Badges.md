Use badges to signify quantities or a number of items

Usage:

	{{ html.badge(label, class) }}
	
Badges can accept any of the usual modifier classes
	
	{{ html.badge('1') }}
	{{ html.badge('2', 'badge--primary') }}
	{{ html.badge('3', 'badge--success') }}
	{{ html.badge('5', 'badge--warning') }}
	{{ html.badge('8', 'badge--danger') }}
	{{ html.badge('13', 'badge--info') }}
	{{ html.badge('21', 'badge--inverse') }}
	
<span class="badge">1</span>
<span class="badge badge--primary">2</span>
<span class="badge badge--success">3</span>
<span class="badge badge--warning">5</span>
<span class="badge badge--danger">8</span>
<span class="badge badge--info">13</span>
<span class="badge badge--inverse">21</span>

----

## Badged Buttons

Badges within buttons will inherit the parent's styling, which is nice.

	{{ html.button('Default ' ~ html.badge('1')) }}
    {{ html.button(html.icon('inbox') ~ ' Primary ' ~ html.badge('2'), 'btn--primary') }}
    {{ html.button(html.icon('ok') ~ ' Success ' ~ html.badge('3'), 'btn--success') }}
    {{ html.button(html.icon('warning-sign') ~ ' Warning ' ~ html.badge('5'), 'btn--warning') }}
    {{ html.button(html.icon('trash') ~ ' Danger ' ~ html.badge('8'), 'btn--danger') }}
    {{ html.button(html.icon('info-sign') ~ ' Info ' ~ html.badge('13'), 'btn--info') }}
    {{ html.button(html.icon('lock') ~ ' Inverse ' ~ html.badge('21'), 'btn--inverse') }}

<p>
	<button class="btn">Default <span class="badge">1</span></button>
	<button class="btn btn--primary"><i class="icon-inbox"></i> Primary <span class="badge ">2</span></button>
	<button class="btn btn--success"><i class="icon-ok"></i> Success <span class="badge ">3</span></button>
</p>
<p>
	<button class="btn btn--warning"><i class="icon-warning-sign"></i> Warning <span class="badge ">5</span></button>
	<button class="btn btn--danger"><i class="icon-trash"></i> Danger <span class="badge ">8</span></button>
	<button class="btn btn--info"><i class="icon-info-sign"></i> Info <span class="badge ">13</span></button>
	<button class="btn btn--inverse"><i class="icon-lock"></i> Inverse <span class="badge ">21</span></button>
</p>