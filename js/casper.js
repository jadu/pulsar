var fs = require('fs');
var links;

function getLinks() {
    var links = document.querySelectorAll('.nav-link.t-nav-link');
    return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href');
    });
}

casper.start('http://192.168.13.37/index.php', function() {
    fs.write('tests/validation/html_output/index.html', this.getPageContent(), 'w');
});

casper.then(function () {
    var links = this.evaluate(getLinks);
    var current = 0;
    var end = links.length;
    // Get the word before .html.twig, the word before the last '/' and the word in urls like '/lexicon'
    var regex = /((\w*)(\/|.html.twig)$)|(\/\w*$)/gm;
    var match = [];

    // Get Page Name from URL
    for (var i = 0; i < links.length; i++) {
        if (links[i].match(regex) != null ) { // Remove null items that didn't pass the regex
            var link = links[i].match(regex);
            var filtered = link[0]; // Get just the name from the results array
            var splited = filtered.split('.'); // Split dots to remove .html.twig part
            var replaced = splited[0].replace('/', ''); // Remove '/'
            match.push(replaced); // Keep just the names in a separata array
        };
    };

    for (;current < end;) {
        (function(cntr) {
            casper.thenOpen('http://192.168.13.37/' + links[cntr] + '', function() {
                    fs.write('tests/validation/html_output/_' + match[cntr] + '.html', this.getPageContent(), 'w');
            });
        })(current);
        current++;
    }
});

casper.run(function() {
    this.exit();
})
