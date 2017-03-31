var fs = require('fs');
var links;

function getLinks() {
// Scrape the links from primary nav of the website
    var links = document.querySelectorAll('.nav-link.t-nav-link');
    return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href')
    });
}

casper.start('http://192.168.13.37/index.php', function() {
    fs.write('tests/validation/html_output/index.html', this.getPageContent(), 'w');
});

casper.then(function () {
    links = this.evaluate(getLinks);
    for(var i in links) {
        console.log(i,' Outer:', links[i]);
        casper.start(links[i], function() {
            console.log(i, ' Inner:', links[i]);
            fs.write('tests/validation/html_output/page-' + i + '.html', this.getPageContent(), 'w');
        });
    }
});

casper.run(function() {
    this.exit();
})
