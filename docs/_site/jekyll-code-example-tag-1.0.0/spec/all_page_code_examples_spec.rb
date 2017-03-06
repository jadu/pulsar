require_relative './spec_helper.rb'
require 'pry'

describe 'all_page_code_examples', fakefs: true do

  let(:page) do
    page = <<EOF
{% code_example hello_world %}
{% code_example goodbye_world %}
{% all_page_code_examples %}
EOF
  end

  before(:all) do
    FakeFS.activate!
    FileUtils.mkdir_p('code_examples/python')
    File.open('code_examples/python/hello_world', 'w') { |f| f << 'print "Hello World"'}  
    File.open('code_examples/python/goodbye_world', 'w') { |f| f << 'print "Goodbye World"'}
  end

  after(:all) do
    FakeFS.deactivate!
  end

  it 'can be used' do
    t = Liquid::Template.parse(page)
    o = t.render!({'site' => {}, 'page' => {'content' => page}})
    o_html = Nokogiri::HTML.parse(o)
    expect(o_html.search("[text()*='print \"Hello World\"print \"Goodbye World\"']")).not_to be_empty
  end
end
