Usage:

    {{ html.label(
        label, class) }}
        
Labels inherit their parent's size:

<h1>Example heading <span class="label">New</span></h1>
<h2>Example heading <span class="label">New</span></h2>
<h3>Example heading <span class="label">New</span></h3>
<h4>Example heading <span class="label">New</span></h4>
<h5>Example heading <span class="label">New</span></h5>
<h6>Example heading <span class="label">New</span></h6>
<br />

Labels can accept any of the usual modifier classes
    
    {{ html.label(label = 'default') }}

    {{ html.label(
        label = 'primary', 
        class = 'label--primary') }}

    {{ html.label(
        label = 'success', 
        class = 'label--success') }}

    {{ html.label(
        label = 'warning', 
        class = 'label--warning') }}

    {{ html.label(
        label = 'danger', 
        class = 'label--danger') }}

    {{ html.label(
        label = 'info', 
        class = 'label--info') }}
        
    {{ html.label(
        label = 'inverse', 
        class = 'label--inverse') }}
    
<span class="label">default</span> <span class="label label--primary">primary</span> <span class="label label--success">success</span> <span class="label label--warning">warning</span> <span class="label label--danger">danger</span> <span class="label label--info">info</span> <span class="label label--inverse">inverse</span>

## Labels with tooltips

Usage:

    {{ html.label(
        label = '3 days ago',
        class = 'label--primary',
        tooltip_title = 'You should always show the actual date in a tooltip when using relative time') }}

Output:
<span class="label label--primary" data-toggle="tooltips" data-placement="top" title="You should always show the actual date in a tooltip when using relative time">3 days ago</span>
