var test = require('tap').test;
var streamBuffers = require("stream-buffers");
var UntilStream = require('../');

test("read until pattern", function (t) {
  t.plan(2);

  var us = new UntilStream({ pattern: 'World'});
  us.once('readable', function() {
    var data = us.read();
    t.equal(data.toString(), 'Hello ');
    data = us.read();
    t.equal(data.toString(), 'World');
    t.end();
  });
  us.write("Hello World");
});

test("multiple reads from after source stream has ended", function(t) {
  var arr = [], times = 25;
  t.plan(times * 2);
  for (var i = 0; i < times; i++) {
    arr.push("Hello World");
  }

  var sourceStream = new streamBuffers.ReadableStreamBuffer();
  sourceStream.put(arr.join(''));

  var us = new UntilStream({ pattern: 'World'});
  us.on('finish', function () {
    sourceStream.destroy();
  });

  sourceStream.pipe(us);

  var intervalId;
  sourceStream.once('close', function() {
    intervalId = setInterval(function() {
      var data = us.read();
      t.equal(data.toString(), 'Hello ');
      data = us.read();
      t.equal(data.toString(), 'World');
    }, 10);
  });

  us.on('end', function() {
    clearInterval(intervalId);
    t.end();
  });
});
