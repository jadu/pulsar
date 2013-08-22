Usage:

	{{ html.label(label, class) }}
	
Labels inherit their parent's size:

<h1>Example heading <span class="label">New</span></h1>
<h2>Example heading <span class="label">New</span></h2>
<h3>Example heading <span class="label">New</span></h3>
<h4>Example heading <span class="label">New</span></h4>
<h5>Example heading <span class="label">New</span></h5>
<h6>Example heading <span class="label">New</span></h6>
	
Labels can accept any of the usual modifier classes
	
	{{ html.label('default') }}
	{{ html.label('primary', 'label--primary') }}
	{{ html.label('success', 'label--success') }}
	{{ html.label('warning', 'label--warning') }}
	{{ html.label('danger', 'label--danger') }}
	{{ html.label('info', 'label--info') }}
	{{ html.label('inverse', 'label--inverse') }}
	
<span class="label">default</span>
<span class="label label--primary">primary</span>
<span class="label label--success">success</span>
<span class="label label--warning">warning</span>
<span class="label label--danger">danger</span>
<span class="label label--info">info</span>
<span class="label label--inverse">inverse</span>