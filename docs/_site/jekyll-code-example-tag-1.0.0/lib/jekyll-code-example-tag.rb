require_relative 'js/jekyll-code-example-buttons.js.rb'
require 'htmlentities'

module Jekyll
  module CodeExampleTags

    def self.code_example_dir(site) 
      site.fetch('code_example_dir', 'code_examples')
    end

    # Returns a hash of available code examples (per language) for the provided example name
    def self.code_examples(context_path, example_name, site)
      # Collect all relevant files
      examples_root = File.join(code_example_dir(site), context_path)

      code_folders = Dir.entries(examples_root).select do |entry|
        File.directory? File.join(examples_root, entry) and !(entry =='.' || entry == '..')
      end

      examples = {}
      code_folders.each do |lang|
        code_folder = File.join(examples_root, lang)
        example_file = Dir.entries(code_folder).find do |entry|
          File.file? File.join(code_folder, entry) and entry == example_name
        end
        if example_file
          examples[lang] = File.join(code_folder, example_file)
        end
      end

      examples
    end

    def self.buttons_markup(examples, context)
      site = context['site']
      buttons_class = site['code_example_buttons_class'] ? site['code_example_buttons_class'] : 'buttons'
      button_class = site['code_example_button_class'] ? site['code_example_button_class'] : 'button'
      list_class = site['code_example_list_class'] ? site['code_example_list_class'] : 'code-tab'
      menu_items = ""

      examples_reverse = Hash[examples.to_a.reverse]

      examples_reverse.each_key do |lang|

	    menu_items << "<li class='#{list_class}'><a href='#' class='#{button_class}' target='#{lang}'>#{lang.capitalize}</a></li>"
      end
      <<EOF
            <div class="#{buttons_class} examples">
              <ul class="#{list_class}">
                #{menu_items}
              </ul>
            </div>
EOF
    end

    def self.example_markup(language, content)
      he = HTMLEntities.new
      <<EOF
          <div class="example language-#{language} #{language}">
            <pre class="prettyprint lang-#{language}"><code data-lang="#{language}">#{he.encode(content)}</code></pre>
          </div>
EOF

    end

    def self.wrap_examples_div(content)
      "<div class='code-examples'>#{content}</div>"
    end

    def self.get_example_name_and_context(example_string)
      example_string.strip! 
      if example_string.include?('/')
        example_arr = example_string.split('/')
        example_name = example_arr.delete_at(-1)
        context_path = example_arr.join(File::SEPARATOR) + File::SEPARATOR 
      else
        context_path = ''
        example_name = example_string
      end

      return context_path, example_name
    end

    class CodeExampleTag < Liquid::Tag
      def initialize(tag_name, example_string, tokens)
        @context_path, @example_name = Jekyll::CodeExampleTags::get_example_name_and_context(example_string) 
        super
      end

      def render(context)

        examples = Jekyll::CodeExampleTags::code_examples(@context_path, @example_name, context['site'])

        # Build the code example elements
        output = Jekyll::CodeExampleTags::buttons_markup(examples, context)
        examples.each do |lang, path|
          example_content = File.read(path)
          output << Jekyll::CodeExampleTags::example_markup(lang, example_content)
        end

        output = Jekyll::CodeExampleTags::wrap_examples_div(output)
      end
    end

    class AllPageCodeExamplesTag < Liquid::Tag
      def render(context)
        examples = {}
        context['page']['content'].scan(/\{%\s*code_example (\S+)\s*%\}/) do |name|
          context_path, example_name = Jekyll::CodeExampleTags::get_example_name_and_context(name[0])
          more_examples = Jekyll::CodeExampleTags::code_examples(context_path, example_name, context['site'])
          examples.merge!(more_examples){|key, pre_example, new_example| "#{pre_example}\n#{new_example}"}
        end

        # Build the code example elements
        output = Jekyll::CodeExampleTags::buttons_markup(examples, context)
        examples.each do |lang, paths|
          example_content = ""
          for path in paths.split("\n")
            example_content << File.read(path)
          end
          output << Jekyll::CodeExampleTags::example_markup(lang, example_content)
        end

        output = Jekyll::CodeExampleTags::wrap_examples_div(output)
      end
    end

    class CodeExamplesJsFile < Jekyll::StaticFile
      def write(dest)

        dest_path = File.join(dest, @dir, @name)

        FileUtils.mkdir_p(File.dirname(dest_path))
        content = code_example_buttons_js(@site)
        File.open(dest_path, 'w') do |f|
          f.write(content)
        end
      end
    end

    class CodeExamplesJsGenerator < Jekyll::Generator
      safe true
    
      def generate(site)
        name = 'jekyll-code-example-buttons.js'
        destination = '/js/'
        site.static_files << CodeExamplesJsFile.new(site, site.source, destination, name)
      end
    end
  end
end

Liquid::Template.register_tag('code_example', Jekyll::CodeExampleTags::CodeExampleTag)
Liquid::Template.register_tag('all_page_code_examples', Jekyll::CodeExampleTags::AllPageCodeExamplesTag)
