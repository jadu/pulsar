# grunt-git-authors

A [grunt](https://github.com/gruntjs/grunt) plugin for generating a list of
authors from the git history.

## Grunt compatibility

v1.1.0+ is compatible with Grunt 0.4. If you're using Grunt 0.3, use v1.0.0.

## API

### Tasks

#### authors

Generates a list of authors in the form `Name <email>` in order of first
contribution.

This task writes its output to the console, not to a file.

You can optionally run this task against a subdirectory:

```sh
grunt authors:path/to/directory
```

## Mailmap

This task respects mailmap, so if you have messy author info in your commits,
you can correct the data in your mailmap and this task with output the cleaned
up information. For more information, about using a mailmap, see the docs for
`git-shortlog` or read Shane da Silva's blog post about
[Git Shortlog and Mailmap](http://shane.io/2011/10/07/git-shortlog-and-mailmap.html).

## License

Copyright 2013 Scott González. Released under the terms of the MIT license.
