[![Build Status](https://travis-ci.org/govdelivery/jekyll-code-example-tag.svg?branch=master)](https://travis-ci.org/govdelivery/jekyll-code-example-tag)
[![Gem Version](https://badge.fury.io/rb/jekyll-code-example-tag.svg)](http://badge.fury.io/rb/jekyll-code-example-tag)

jekyll-code-example-tag
=======================

Provides a tag that allows you to include in your posts and pages code examples
for multiple languages that are kept in separate files. Another tag allows you
to combine all code examples that are on a page.

## Installation

Add the following to your application's Gemfile:

    gem 'jekyll-code-example-tag'

and then execute:

    bundle install

Or install it manually:

    gem install jekyll-code-example-tag

Then, include a script tag in your page or layout to fetch the required
javascript:

    <script type="text/javascript" src="/js/jekyll-code-example-buttons.js"></script>

You may also overwrite the provided javascript by writing a `jekyll-code-example-buttons.js`
file in the `/js/` directory of your Jekyll project.

## Usage

### Configure CSS Classes

Via your site's _config.yml, you can define what CSS class or classes the 
example buttons and button containers will have. For example:

    code_example_buttons_class: 'the_buttons'
    code_example_button_class: 'a_button'

will cause each button to have the class `a_button`, and buttons will be inside
a div with the class `the_buttons`. 

`code_example_buttons_class` defaults to 'buttons', and 
`code_example_button_class` defaults to 'button'.

Same is true for ```code_example_list_class``` which controls the class used for the ```<li>``` and ```<ul>``` tags.
The default class is 'code-tab' which can be changed by setting:
```
code_example_list_class: my-list-class
```
in _config.yml.

### code_example

First, select a folder to place your code examples in. By default, the top
level folder `code_examples` will be used. If you would like to store your
examples in a different folder, than create and set a `code_example_dir`
setting in your _config.yaml:

    code_example_dir: assets/code/examples

Now, add some code examples. Create folders for each language you would like to
provide a code example for. Then, add files to each language folder that 
contain language appropriate code examples.

For example, say we would like to include some Hello World examples in Ruby and
Python. First, assuming we are using the default code examples directory, we
would add the following to your project:

    .
    |-code_examples
      |-ruby
        |-hello_world
      |-python
        |-hello_world

`ruby/hello_world` could contain

    puts "Hello World"

while `python/hello_world` could contain

    print "Hello World"

Now, create a post that includes these code examples. Include a code example in
a page or posting with the *code_example* tag:

    ---
    title: Starting to Program
    ---

    Here is everybody's favorite first program, in Ruby and Python.

    {% code_example hello_world %}

Build your site, and you will find a page that contains the following markup:

    <p>Here is everybody's favorite first program, in Ruby and Python.</p>

    <div class="code-examples">            
      <div class="buttons examples">
        <ul>
          <li><a href="#" class="button active" target="Python">Python</a></li>
          <li><a href="#" class="button" target="ruby">Ruby</a></li>
        </ul>
      </div>
      <div class="highlight example python" style="display: block;">
        <pre><code class="language-python" data-lang="python">print "Hello World"</code></pre>
      </div>
      <div class="highlight example ruby" style="display: none;">
            <pre><code class="language-ruby" data-lang="ruby">puts "Hello World"</code></pre>
      </div>
    </div>

The *code_example* tag will search the folders in your code examples directory
for files that match whatever string is given to it, and will include only
languages/files that match it. Thus, if you add a `goodbye_world` example in
just Ruby:

    .
    |-code_examples
      |-ruby
        |-goodbye_world
        |-hello_world
      |-python
        |-hello_world

and include it in a post:

    {% code_example goodbye_world %}

the resulting markup will include just the Ruby example:

    <div class="code-examples">            
      <div class="buttons examples">
        <ul>
          <li><a href="#" class="button" target="ruby">Ruby</a></li>
        </ul>
      </div>
      <div class="highlight example ruby" style="display: none;">
            <pre><code class="language-ruby" data-lang="ruby">puts "Goodbye World"</code></pre>
      </div>
    </div>

The *code_example* tag can also support examples organized in sub directories.
For example, say you would like to organize some of your code examples by
product and API version:

    .
    |-code_examples
      |-productA
        |-api_v1
          |-ruby
            |-widget_maker
          |-python
            |-widget_maker
        |-api_v2
          |-ruby
            |-widget_maker
          |-python
            |-widget_maker
      |-productB
        |-api_v1
          |-ruby
            |-authenticating
          |-python
            |-authenticating
      |-ruby
        |-hello_world
      |-python
        |-hello_world

With the above directory structure, including any of the following calls to
code_example will result in including only the relevant code examples from
the referred to directory:

    {% code_example productA/api_v1/widget_maker %}
    {% code_example productA/api_v2/widget_maker %}
    {% code_example productB/api_v1/authenticating %}
    {% code_example hello_world %}

### all_page_code_examples

If you have included a few code examples on a page via the *code_example* tag,
you can provide your readers with an easy to copy version of all of your
examples by using the *all_page_code_examples* tag:

    {% all_page_code_examples %}
