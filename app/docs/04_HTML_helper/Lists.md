## List

Pass an array of items and have them rendered as a simple list, this is
particularly useful when chained with other helpers.

### Example usage:

	{{
		html.list({
			items: [
				'foo',
				'bar'
			]
		})
	}}

### Options

Option  | Description
------- | ----------------------------------------------------------------------
active_item | (int) The index of the active item, will have .is-active applied
class 		| (string) CSS classes, space separated
data 		| (hash) data attributes by key/value
id 			| (string) A unique identifier, if required
items		| (array) An array of items to be rendered as a list
type 		| (string) ul (default) | ol
