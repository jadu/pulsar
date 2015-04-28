## Badge

Use badges to signify quantities or a number of items

### Usage

    {{ html.badge({ options }) }}

### Options

Option  | Description
------------- | -------------
class | CSS classes, space separated
id | A unique identifier, if required
label | The value to display, usually an integer
data | a hash of data attributes by key/value

### Variations

Badges accept the normal state variations through the `class` option

    {{
        html.badge({
            value = '2',
            class: 'badge--primary'
        })
    }}

<span class="badge">1</span>
<span class="badge badge--primary">2</span>
<span class="badge badge--success">3</span>
<span class="badge badge--warning">5</span>
<span class="badge badge--danger">8</span>
<span class="badge badge--info">13</span>
<span class="badge badge--inverse">21</span>


### Badged buttons

Badges within buttons will inherit the parent's styling, which is nice.

    {{
        html.button({
            value: html.icon('inbox') ~ ' Primary ' ~ html.badge(value = '2'),
            class: 'btn--primary'
        })
    }}

<p>
    <button class="btn">Default <span class="badge">1</span></button>
    <button class="btn btn--primary"><i class="icon-inbox"></i> Primary <span class="badge ">2</span></button>
    <button class="btn btn--success"><i class="icon-ok"></i> Success <span class="badge ">3</span></button>
    <button class="btn btn--warning"><i class="icon-warning-sign"></i> Warning <span class="badge ">5</span></button>
    <button class="btn btn--danger"><i class="icon-trash"></i> Danger <span class="badge ">8</span></button>
    <button class="btn btn--info"><i class="icon-info-sign"></i> Info <span class="badge ">13</span></button>
    <button class="btn btn--inverse"><i class="icon-lock"></i> Inverse <span class="badge ">21</span></button>
</p>
