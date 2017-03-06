Gem::Specification.new do |s|
  s.name        = 'jekyll-code-example-tag'
  s.version     = '1.0.0'
  s.date        = '2015-02-03'
  s.authors     = ['GovDelivery']
  s.email       = 'support@govdelivery.com'
  s.homepage    = 'https://github.com/govdelivery/jekyll-code-example-tag'
  s.license     = 'BSD-3-Clause'
  s.summary     = 'Tags for including code examples in posts and pages.'
  s.description = %q{Provides a tag that allows you to include in your posts 
                     and pages code examples for multiple langagues that are 
                     kept in seperate files. Another tag allows you to combine
                     all code examples that are on a page.}

  s.add_runtime_dependency 'jekyll'
  s.add_runtime_dependency 'htmlentities'

  s.files        = `git ls-files`.split($\)
  s.require_paths = ['lib']
end
