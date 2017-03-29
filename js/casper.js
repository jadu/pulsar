var fs = require('fs');

casper.start('http://google.com', function() {
    fs.write('dist/htmloutput/page.html', this.getPageContent(), 'w');
});

casper.run(function() {
    this.exit();
})
