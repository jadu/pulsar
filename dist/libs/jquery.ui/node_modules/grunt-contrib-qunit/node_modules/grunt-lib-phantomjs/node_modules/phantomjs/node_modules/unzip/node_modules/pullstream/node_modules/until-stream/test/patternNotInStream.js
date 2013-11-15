var test = require('tap').test;
var streamBuffers = require("stream-buffers");
var UntilStream = require('../');

test("if pattern not found, behave as a PassThrough stream", function(t) {
  t.plan(1);
  var us = new UntilStream({ pattern: 'jumps'});
  us.on('finish', function () {
    sourceStream.destroy();
  });

  var sourceStream = new streamBuffers.ReadableStreamBuffer();
  sourceStream.put("Hello World!");

  var writableStream = new streamBuffers.WritableStreamBuffer();

  writableStream.on('close', function () {
    var str = writableStream.getContentsAsString('utf8');
    t.equal(str, 'Hello World!');
    t.end();
  });

  sourceStream.pipe(us).pipe(writableStream);
});
