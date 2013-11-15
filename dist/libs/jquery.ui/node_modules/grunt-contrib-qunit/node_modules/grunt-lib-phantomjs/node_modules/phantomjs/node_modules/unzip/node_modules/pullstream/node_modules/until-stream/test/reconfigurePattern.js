var test = require('tap').test;
var streamBuffers = require("stream-buffers");
var UntilStream = require('../');

test("set pattern after the fact", function (t) {
  t.plan(4);
  var us = new UntilStream();

  var sourceStream = new streamBuffers.ReadableStreamBuffer();
  sourceStream.put('The quick brown fox jumps over the lazy dog');

  us.on('finish', function () {
    sourceStream.destroy();
    us.reconfigure({ pattern: 'jumps' });
    var writableStream = new streamBuffers.WritableStreamBuffer();
    us.pipe(writableStream);
    writableStream.on('close', function () {
      var str = writableStream.getContentsAsString('utf8');
      t.equal(str, 'The quick brown fox ');
      var data = us.read();
      t.equal(data.toString(), 'jumps');
      data = us.read();
      t.equal(data.toString(), ' over the lazy');
      data = us.read();
      t.equal(data.toString(), ' dog');
      t.end();
    });
  });

  sourceStream.pipe(us);
});

test("remove pattern after the fact", function (t) {
  t.plan(1);
  var us = new UntilStream({ pattern: 'jumps' });

  var sourceStream = new streamBuffers.ReadableStreamBuffer();
  sourceStream.put('The quick brown fox jumps over the lazy dog');

  us.on('finish', function () {
    sourceStream.destroy();
    us.reconfigure();
    var writableStream = new streamBuffers.WritableStreamBuffer();
    us.pipe(writableStream);
    writableStream.on('close', function () {
      var str = writableStream.getContentsAsString('utf8');
      t.equal(str, 'The quick brown fox jumps over the lazy dog');
      t.end();
    });
  });

  sourceStream.pipe(us);
});

test("read from US after removing pattern", function (t) {
  t.plan(3);
  var us = new UntilStream({ pattern: '\n' });
  us.write("Hello\nWorld");

  t.equal(us.read().toString(), 'Hello');
  t.equal(us.read().toString(), '\n');
  us.reconfigure();
  t.equal(us.read().toString(), 'World');
  t.end();
});
