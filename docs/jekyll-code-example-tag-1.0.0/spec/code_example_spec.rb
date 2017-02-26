require_relative './spec_helper.rb'

def check_code_example_conditions(o_obj, buttons_class: 'buttons', button_class: 'button')
  expect(o_obj.xpath('/div[@class="code-examples"]/div[@class="'+buttons_class+' examples"]/ul/li/a[@class="'+button_class+'"][@target="ruby"][.="Ruby"]')).not_to be_empty
  expect(o_obj.xpath('/div[@class="code-examples"]/div[@class="'+buttons_class+' examples"]/ul/li/a[@class="'+button_class+'"][@target="python"][.="Python"]')).not_to be_empty
  ruby_example = o_obj.xpath('/div[@class="code-examples"]/div[@class="highlight example ruby"]/pre/code[@class="language ruby"][@data-lang="ruby"]')
  expect(ruby_example).not_to be_empty
  expect(ruby_example.first.content).to eq 'puts "Hello World"'
  python_example = o_obj.xpath('/div[@class="code-examples"]/div[@class="highlight example python"]/pre/code[@class="language python"][@data-lang="python"]')
  expect(python_example).not_to be_empty
  expect(python_example.first.content).to eq 'print "Hello World"'
end

describe 'code_example', fakefs: true do

  let(:page) { "{% code_example hello_world %}" }

  before(:all) do
    FakeFS.activate!
  end

  after(:all) do
    FakeFS.deactivate!
  end

  it 'can be used' do
    FileUtils.mkdir_p('code_examples/ruby')
    FileUtils.mkdir_p('code_examples/python')
    File.open('code_examples/ruby/hello_world', 'w') { |f| f << 'puts "Hello World"'}
    File.open('code_examples/python/hello_world', 'w') { |f| f << 'print "Hello World"'}  

    t = Liquid::Template.parse(page)
    o = t.render!({'site' => {}})
    o_obj = Nokogiri::XML.parse(o)
    check_code_example_conditions(o_obj)
  end

  it 'can be configured via "code_example_dir"' do
    FileUtils.mkdir_p('examples/ruby')
    FileUtils.mkdir_p('examples/python')
    File.open('examples/ruby/hello_world', 'w') { |f| f << 'puts "Hello World"'}
    File.open('examples/python/hello_world', 'w') { |f| f << 'print "Hello World"'}  

    t = Liquid::Template.parse(page)
    o = t.render!({'site' => {'code_example_dir' => 'examples'}})
    o_obj = Nokogiri::XML.parse(o)
    check_code_example_conditions(o_obj)
  end

  it 'can be configured via "code_example_button_class"' do
    FileUtils.mkdir_p('code_examples/ruby')
    FileUtils.mkdir_p('code_examples/python')
    File.open('code_examples/ruby/hello_world', 'w') { |f| f << 'puts "Hello World"'}
    File.open('code_examples/python/hello_world', 'w') { |f| f << 'print "Hello World"'}  

    t = Liquid::Template.parse(page)
    o = t.render!({'site' => {'code_example_button_class' => 'button'}})
    o_obj = Nokogiri::XML.parse(o)
    check_code_example_conditions(o_obj, button_class: 'button')
  end

  it 'can be configured via "code_example_buttons_class"' do
    FileUtils.mkdir_p('code_examples/ruby')
    FileUtils.mkdir_p('code_examples/python')
    File.open('code_examples/ruby/hello_world', 'w') { |f| f << 'puts "Hello World"'}
    File.open('code_examples/python/hello_world', 'w') { |f| f << 'print "Hello World"'}  

    t = Liquid::Template.parse(page)
    o = t.render!({'site' => {'code_example_buttons_class' => 'button-group'}})
    o_obj = Nokogiri::XML.parse(o)
    check_code_example_conditions(o_obj, buttons_class: 'button-group')
  end


  it 'allows for dividing examples via context' do
    FileUtils.mkdir_p('code_examples/v1/ruby')
    FileUtils.mkdir_p('code_examples/v1/python')
    File.open('code_examples/v1/ruby/hello_world', 'w') { |f| f << 'puts "Hello World"'}
    File.open('code_examples/v1/python/hello_world', 'w') { |f| f << 'print "Hello World"'}  

    page = "{% code_example v1/hello_world %}"

    t = Liquid::Template.parse(page)
    o = t.render!({'site' => {}})
    o_obj = Nokogiri::XML.parse(o)
    check_code_example_conditions(o_obj)
  end
end
