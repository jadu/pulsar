Pulsar uses the font-awesome icon font which contains over 300 icons which scale perfectly to any size. Check the [full icon list](http://fortawesome.github.io/Font-Awesome/icons/) for all available icons.

Simply pass the icon name shown in the [icon list](http://fortawesome.github.io/Font-Awesome/icons/) to the icon helper, __without the__ `icon-` __part of the name__:

### Usage:

    {{ html.icon(icon_name, { options }) }}

### Options

Option | Description
------ | -----------------------------------------------------------------------
class  | CSS classes, space separated

    <!-- To display 'icon-ok' -->
    {{ html.icon('ok') }}

    <!-- To display 'icon-info-sign' -->
    {{
        html.icon('ok-sign', {
            class: 'icon-success'
        })
    }}

<i class="icon-ok"></i> <i class="icon-ok-sign icon--success"></i>

## Standout icons

    <span class="icon-standout">
        <i class="icon-standout__icon icon-info"></i>
    </span>

<span class="icon-standout">
    <i class="icon-standout__icon icon-info"></i>
</span>
<span class="icon-standout icon-standout--success">
    <i class="icon-standout__icon icon-ok"></i>
</span>
<span class="icon-standout icon-standout--danger">
    <i class="icon-standout__icon icon-remove"></i>
</span>
## Icon sizes

Icons inherit their size and colour attributes from their parents and can be nested within other helpers, like buttons, links and tabs.

    <h1>{{ html.icon('info-sign') }} Heading</h1>

    <!-- Icon before the text -->
    {{ html.button(html.icon('plus-sign-alt') ~ 'Button', 'btn--primary') }}

    <!-- Icon after the text -->
    {{ html.link('Link' ~ html.icon('ok'), '#example') }}

<h1><i class="icon-info-sign"></i> Heading</h1><button class="btn btn--primary"><i class="icon-plus-sign-alt"></i> Button</button>
<a href="#example">Link <i class="icon-ok"></i></a>

<br />
