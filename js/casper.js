var fs = require('fs');
var links;

function getLinks() {
    var links = document.querySelectorAll('.nav-link.t-nav-link');
    return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href')
    });
}

casper.start('http://192.168.13.37/index.php', function() {
    fs.write('tests/validation/html_output/homepage.html', this.getPageContent(), 'w');
});

casper.then(function () {
    var links = this.evaluate(getLinks);
    var current = 1;
    var end = links.length;

    for (;current < end;) {
        //console.log(current,' Outer:', current);
      (function(cntr) {
        casper.thenOpen(links[cntr], function() {
            console.log(cntr, ' Inner:', links[cntr]);
            fs.write('tests/validation/html_output/_' + cntr + '.html', this.getPageContent(), 'w');
        });
      })(current);

      current++;
    }
});

casper.run(function() {
    this.exit();
})
