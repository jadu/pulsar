Group a series of related buttons together on a single line by passing the `buttonGroup` helper an array of `button` elements.
    
    {{ 
        html.button_group([ 
            html.button(label = 'Left'), 
            html.button(label = 'Middle'),
            html.button(label = 'Right') 
        ])
    }}
    
<div class="btn__group"><button class="btn">Left</button><button class="btn">Middle</button><button class="btn">Right</button></div>