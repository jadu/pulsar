## Loading

Give feedback to the user that something is happening or that information is being retrieved from the server.

Adding the `hide` class will allow you to place the loading markup in the DOM on pageload, then to toggle it with javascript.

### Example usage

    {{ html.loading() }}

### Options

Option  | Description
------- | ----------------------------------------------------------------------
class   | (string) CSS classes, space separated
data    | (hash) data attributes by key/value
id      | (string) A unique identifier, if required

<div class="loading loading--circle">
    <i></i>
</div>
