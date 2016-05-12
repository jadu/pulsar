var _ = require('lodash'),
    chai = require('chai'),
    expect = require('chai').expect,
    fs = require('fs'),
    path = require('path'),
    Twig = require('twig'), // Twig module
    twig = Twig.twig,       // Compile function
    Pulsar = require('../../../../')(Twig);

chai.use(require('chai-hiff'));

var fixturesPath = path.resolve(__dirname, '../../../unit/Jadu/Pulsar/Twig/Macro/Fixtures');
Pulsar.installExtensions();

function normalizeOutput(output) {
    output = output.split(/\s+/g);
    output = output.join(' ');
    output = output.replace(/>\s+/g, '>');
    output = output.replace(/\s+</g, '<');

    return output;
}

describe('Macros', function () {
    var fixtureTypes = fs.readdirSync(fixturesPath);

    _.each(fixtureTypes, function (fixtureType) {
        var fixturePath = path.resolve(fixturesPath, fixtureType);
        describe(fixtureType, function () {
            var fixtures = fs.readdirSync(fixturePath);
            _.each(fixtures, function (fixture) {
                if (fixture.indexOf('twig') >= 0) {
                    var base = path.basename(fixture, '.html.twig'),
                        htmlBase = path.basename(fixture, '.twig'),
                        htmlFixturePath = path.resolve(fixturePath, htmlBase),
                        twigFixturePath = path.resolve(fixturePath, fixture);

                    if (fs.existsSync(htmlFixturePath) && fs.existsSync(twigFixturePath)) {
                        it('should correctly render ' + base + ' template', function () {
                            var htmlFixture = fs.readFileSync(htmlFixturePath).toString();
                            var twigFixture = fs.readFileSync(twigFixturePath).toString();

                            var template = twig({
                                async: false,
                                data: twigFixture,
                                namespaces: {
                                    'pulsar': './views/',
                                    'tests': './tests/unit/Jadu/Pulsar/Twig/Macro/Fixtures/'
                                }
                            });

                            var renderedTemplate = normalizeOutput(template.render() || "");
                            var expectedValue = normalizeOutput(htmlFixture);

                            expect(renderedTemplate).to.hiffEqual(expectedValue);
                        });
                    }
                }
            });
        });
    });
});
