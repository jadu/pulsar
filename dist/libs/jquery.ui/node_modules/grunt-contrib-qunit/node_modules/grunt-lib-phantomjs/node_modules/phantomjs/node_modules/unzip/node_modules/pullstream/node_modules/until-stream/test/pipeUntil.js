var test = require('tap').test;
var streamBuffers = require("stream-buffers");
var UntilStream = require('../');

test("pipe until pattern", function (t) {
  t.plan(3);
  var us = new UntilStream({ pattern: 'jumps'});
  us.on('finish', function () {
    sourceStream.destroy();
  });

  var sourceStream = new streamBuffers.ReadableStreamBuffer();
  sourceStream.put("The quick brown fox jumps over the lazy dog");

  var writableStream = new streamBuffers.WritableStreamBuffer();

  writableStream.on('close', function () {
    var str = writableStream.getContentsAsString('utf8');
    t.equal(str, 'The quick brown fox ');
    var data = us.read();
    t.equal(data.toString(), 'jumps');
    writableStream = new streamBuffers.WritableStreamBuffer();
    us.pipe(writableStream);
    writableStream.on('close', function () {
      var str = writableStream.getContentsAsString('utf8');
      t.equal(str, ' over the lazy dog');
      t.end();
    });
  });

  sourceStream.pipe(us).pipe(writableStream);
});

test("first chunk ends with potential pattern", function (t) {
  t.plan(2);
  var us = new UntilStream({ pattern: 'World'});
  us.on('finish', function () {
    sourceStream.destroy();
  });

  var sourceStream = new streamBuffers.ReadableStreamBuffer();
  sourceStream.put("Hello Wordy World");

  var writableStream = new streamBuffers.WritableStreamBuffer();

  writableStream.on('close', function () {
    var str = writableStream.getContentsAsString('utf8');
    t.equal(str, 'Hello Wordy ');
    var data = us.read();
    t.equal(data.toString(), 'World');
    t.end();
  });

  sourceStream.pipe(us).pipe(writableStream, { chunkSize: 9 });
});
