# highlight-redux

Like highlight.js, but not including every single syntax highlighting grammar. Saving bytes for the browser!

# Install

```shell
npm install highlight-redux
```

# Usage

On the server-side you'll probably always use `highlight.js`. On the client-side, you can choose to use `highlight-redux` which doesn't auto-include every single language.

If you're using Browserify, you can use a `package.json` like the one below, using the leaner implementation on the client-side, saving bytes.

```json
{
  "dependencies": {
    "highlight-redux": "*",
    "highlight.js": "*"
  },
  "browser": {
    "highlight.js": "highlight-redux"
  }
}
```

Without Browserify, simply use `highlight-redux` instead of `highlight.js` on the client-side.

# License

MIT
