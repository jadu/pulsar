Group a series of related buttons together on a single line by passing the `buttonGroup` helper an array of `button` elements.

### Usage

 	{{ html.button({ options }) }}

### Options

Option  | Description
------------- | -------------
buttons | An array of `html.button()` items
class | Classes to be applied to the button group (not the buttons inside it)
id | The `id` attribute to b applied to the button group
data | a hash of data attributes by key/value

    {{
        html.button_group({
        	buttons: [
            	html.button(label = 'Left'),
            	html.button(label = 'Middle'),
            	html.button(label = 'Right')
        	]
        })
    }}

<div class="btn__group"><button class="btn">Left</button><button class="btn">Middle</button><button class="btn">Right</button></div>
