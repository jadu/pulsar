Use badges to signify quantities or a number of items

Usage:

    {{ html.badge(label, class) }}
    
Badges can accept any of the usual modifier classes
    
    {{ html.badge(value = '1') }}
    
    {{ html.badge(
        value = '2', 
        class = 'badge--primary') }}

    {{ html.badge(
        value = '3', 
        class = 'badge--success') }}

    {{ html.badge(
        value = '5', 
        class = 'badge--warning') }}

    {{ html.badge(
        value = '8', 
        class = 'badge--danger') }}

    {{ html.badge(
        value = '13', 
        class = 'badge--info') }}

    {{ html.badge(
        value = '21', 
        class = 'badge--inverse') }}
    
<span class="badge">1</span> <span class="badge badge--primary">2</span> <span class="badge badge--success">3</span> <span class="badge badge--warning">5</span> <span class="badge badge--danger">8</span> <span class="badge badge--info">13</span> <span class="badge badge--inverse">21</span> 


## Badged Buttons

Badges within buttons will inherit the parent's styling, which is nice.

    {{ html.button(value = 'Default ' ~ html.badge(value = '1')) }}

    {{ html.button(
        value = html.icon('inbox') ~ ' Primary ' ~ html.badge(value = '2'), 
        class = 'btn--primary') }}

    {{ html.button(
        value = html.icon('ok') ~ ' Success ' ~ html.badge(value = '3'), 
        class = 'btn--success') }}

    {{ html.button(
        value = html.icon('warning-sign') ~ ' Warning ' ~ html.badge(value = '5'), 
        class = 'btn--warning') }}

    {{ html.button(
        value = html.icon('trash') ~ ' Danger ' ~ html.badge(value = '8'), 
        class = 'btn--danger') }}

    {{ html.button(
        value = html.icon('info-sign') ~ ' Info ' ~ html.badge(value = '13'), 
        class = 'btn--info') }}

    {{ html.button(
        value = html.icon('lock') ~ ' Inverse ' ~ html.badge('21'), 
        class = 'btn--inverse') }}

<p>
    <button class="btn">Default <span class="badge">1</span></button>
    <button class="btn btn--primary"><i class="icon-inbox"></i> Primary <span class="badge ">2</span></button>
    <button class="btn btn--success"><i class="icon-ok"></i> Success <span class="badge ">3</span></button>
    <button class="btn btn--warning"><i class="icon-warning-sign"></i> Warning <span class="badge ">5</span></button>
    <button class="btn btn--danger"><i class="icon-trash"></i> Danger <span class="badge ">8</span></button>
    <button class="btn btn--info"><i class="icon-info-sign"></i> Info <span class="badge ">13</span></button>
    <button class="btn btn--inverse"><i class="icon-lock"></i> Inverse <span class="badge ">21</span></button>
</p>