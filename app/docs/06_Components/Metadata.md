### html.metadata

Provides a simple way to mark up key/value information provided by a JSON object.

    {%
    	set json = {
            "File" : "true_lies.avi",
            "Size" : "1.2 Gb",
            "Type" : "Video"
        }
    %}
    {{ html.metadata(items = json) }}


<dl class="metadata">
    <dt class="metadata__key">File</dt><!--
 --><dd class="metadata__value">true_lies.avi</dd>
    <dt class="metadata__key">Size</dt><!--
 --><dd class="metadata__value">1.2 Gb</dd>
    <dt class="metadata__key">Type</dt><!--
 --><dd class="metadata__value">Video</dd>
</dl>

----

### Bordered

	{{
		html.metadata(
			items = json,
			class = 'metadata--bordered'
		)
	}}

<dl class="metadata metadata--bordered">
    <dt class="metadata__key">File</dt><!--
 --><dd class="metadata__value">true_lies.avi</dd>
    <dt class="metadata__key">Size</dt><!--
 --><dd class="metadata__value">1.2 Gb</dd>
    <dt class="metadata__key">Type</dt><!--
 --><dd class="metadata__value">Video</dd>
</dl>
