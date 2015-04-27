# Button Group

Group a series of related buttons together on a single line by passing the `buttonGroup` helper an array of `button` elements. Great for creating toolbars.

## Example usage

```twig
{{
	html.button_group({
		'buttons': [
			html.button({ label: 'foo' }),
			html.button({ label: 'bar' }),
			html.button({ label: 'baz' })
		]
	})
}}
```

<div class="btn__group">
    <button class="btn">Foo</button><button class="btn">Bar</button><button class="btn">Baz</button>
</div>

## Options

Option  | Type   | Description
------- | ------ | -------------------------------------------------------------
buttons | array  | An array of `html.button()` elements
class   | string | Classes to be applied to the button group (not the buttons inside it)
id      | string | A unique identifier, if required
data-*  | string | Data attributes, eg: `'data-foo': 'bar'`

