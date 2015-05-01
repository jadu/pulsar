# List

Pass an array of items and have them rendered as a simple unordered or ordered list, this is
particularly useful when chained with other helpers.

## Example usage

```twig
{{
	html.list({
		'items': [
			'foo',
			'bar'
		]
	})
}}
```

<ul>
    <li>foo</li>
    <li>bar</li>
</ul>

## Options

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
active_item | int    | The index of the active item, will have the `.is-active` class applied
class       | string | CSS classes, space separated
id          | string | A unique identifier, if required
items       | array  | An array of items to be rendered as a list
type        | string | `ul` (default), `ol`
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`
