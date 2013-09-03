<a href="/lexicon" class="btn btn--primary pull-right"><i class="icon-desktop"></i> View Lexicon Example</a>

Decks allow an interface to overlay forms on top of the current view so the user doesn't keep bouncing from page to page and losing their context. The underlying interface is faded out slightly to keep focus on the deck.

Decks should be used in preference to modals/lightboxes with the exception of completely blocking/destructive actions where we absolutely need to stop the user from doing anything else.

![deck slide 1 example](http://localhost:8000/docs/images/modules_deck-slide_1.png)![deck slide 2 example](http://localhost:8000/docs/images/modules_deck-slide_2.png)

The main Pulsar layout has a `{% block decks %}` block, where all your decks should be defined.

----

Decks consist of one or more 'slides' which are offset from each other to give the user a sense of how deep within a deck they have gotten. While it's not a good idea to design a deck that goes more than a couple of levels deep, the styling supports a maximum of 10 levels before successive slides are overlaid without an offset.

	{% block decks %}
		<div class="deck" id="example-deck">
			<div class="slide" id="slide-one">
				<div class="slide-inner">
					<button class="close" data-dismiss="deck">&times;</button>
						<!-- slide one content -->
				</div>
			</div>

			<div class="slide" id="slide-two">
				<div class="slide-inner">
					<button class="close" data-dismiss="slide">&times;</button>
						<!-- slide two content -->
				</div>
			</div>
		</div>
	{% endblock %}

## Opening a deck

Use the `data-toggle="deck"` attribute to make a link (or a [button with the link type](../HTML_helper/Buttons)) open a deck with the given ID and show it's first slide.

	{{ html.link('Example deck link, '#example-deck', null, null, 'data-toggle="deck"' ) }}
	
	{{ html.button('Example Deck', null, 'link', null, '#example-deck', 'data-toggle="deck"') }}


## Opening a slide

You can open other slides while a deck is open using the `data-toggle="slide"` attribute.

	{{ html.button('Example Deck', null, 'link', null, '#slide-two', 'data-toggle="deck"') }}

## Closing a slide

Use the `data-dismiss="slide"` attribute to close the given slide.

	{{ html.link('Cancel', '#slide-two', null, null, 'data-dismiss="slide"') }}

All slides have dismiss buttons in their top right hand corner, the first slide's dismiss button will also close the entire deck.

	<button class="close" data-dismiss="slide">&times;</button>

## Closing an entire deck

Use the `data-dismiss="deck"` attribute to close the currently open deck (only one deck should be active at any one time).

	{{ html.link('Cancel', '#example-deck', null, null, 'data-dismiss="deck"') }}

## Populating a deck with AJAX

A deck's slides can either be marked up on page-load (like the simple example at the top of the page), or pulled in as an AJAX request when the deck is opened. This is useful when more than one UI may need to use the same deck but we don't want to duplicate the code.

Use the `data-deck-source` attribute to define the path to request.

Example:

	<div class="deck" id="example-deck" data-deck-source="slides.php">
		<!-- populated by ajax -->
	</div>

slides.php would contain:

	<div class="slide" id="slide-one">
		<div class="slide-inner">
			<button class="close" data-dismiss="deck">&times;</button>
				<!-- slide one content -->
		</div>
	</div>

	<div class="slide" id="slide-two">
		<div class="slide-inner">
			<button class="close" data-dismiss="slide">&times;</button>
				<!-- slide two content -->
		</div>
	</div>

