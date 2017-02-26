require 'fakefs/spec_helpers'
require 'jekyll'
require 'liquid'
require 'nokogiri'
require 'pry'
require 'rspec'
require_relative '../lib/jekyll-code-example-tag.rb'

RSpec.configure do |config|
  config.include FakeFS::SpecHelpers, fakefs: true
end

Pry.config.history.should_save = false;
Pry.config.history.should_load = false;
