Group a series of related buttons together on a single line by passing the `buttonGroup` helper an array of `button` elements.
	
	{{ 
		html.buttonGroup([ 
			html.button('Left'), 
			html.button('Middle'),
			html.button('Right') 
		])
	}}
	
<div class="btn__group"><button class="btn">Left</button><button class="btn">Middle</button><button class="btn">Right</button></div>