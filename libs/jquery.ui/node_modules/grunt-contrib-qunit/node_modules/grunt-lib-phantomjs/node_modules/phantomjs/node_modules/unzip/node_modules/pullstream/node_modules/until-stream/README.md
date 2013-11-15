until-stream [![Build Status](https://travis-ci.org/EvanOxfeld/until-stream.png)](https://travis-ci.org/EvanOxfeld/until-stream)
============

Ever wanted to pause a stream when a certain String or
a binary signature is reached? UntilStream is the
answer. Pipe UntilStream and automatically stop when
your pattern is reached or call read() until the returned
data matches your pattern, without excessively buffering
your stream's content in memory.

<pre>
--------------------------------------
|Stability - API is somewhat unstable|
--------------------------------------
</pre>
read() and pipe() are implemented with some limitations.
For example, UntilStream supports piping to only a
single destination stream.

## Installation

```bash
$ npm install until-stream
```

## Quick Examples

### Pipe

```javascript
var UntilStream = require('until-stream');
var streamBuffers = require("stream-buffers");

var us = new UntilStream({ pattern: 'World'});

var sourceStream = new streamBuffers.ReadableStreamBuffer();
sourceStream.put("Hello World");
var writableStream = new streamBuffers.WritableStreamBuffer();

sourceStream.pipe(us).pipe(writableStream);

writableStream.once('close', function () {
  //writeableStream contains all data before the pattern occurs
  var str = writableStream.getContentsAsString('utf8'); // 'Hello '
  //Now the next call to read() returns the pattern
  var data = us.read(); // 'World'
});
```
### Read

```javascript
var UntilStream = require('until-stream');
var streamBuffers = require("stream-buffers");

var us = new UntilStream({ pattern: 'jumps'});

var sourceStream = new streamBuffers.ReadableStreamBuffer({ chunkSize: 8 });
sourceStream.put("The quick brown fox jumps over the lazy dog");

sourceStream.pipe(us);

us.on('readable', function() {
  if (us.read() === 'jumps') {
    console.log('Pattern reached!');
  }
});
```

# API Index

## UntilStream
 * [new UntilStream([options])](#untilStreamConstructor)
 * [read([size])](#untilStreamRead)
 * [pipe(destination, [options])](#untilStreamPipe)
 * [reconfigure([options])](#untilStreamReconfigure)

UntilStream also includes stream.Readable and
stream.Writable methods. See the node v0.9 [Stream documentation]
(http://nodejs.org/docs/v0.9.10/api/stream.html) for more.

# API Documentation

<a name="untilStream"/>
## UntilStream

<a name="untilStreamConstructor" />
### new UntilStream([options])

__Arguments__

* options (optional)
    * pattern - String or Buffer If provided, UntilStream will
                stop reads or pipes when reached

<a name="untilStreamRead" />
### us.read([size])

Synchronously consume data from UntilStream's internal
buffer. If the specified pattern is detected within the
current chunk, slice off the portion prior to the pattern.
The next call to read() will return exactly the pattern.
Otherwise return the current chunk.

__Arguments__

* size (optional) - Mininum number of bytes to read. If not
                    specified return the entire content of
                    the internal buffer or up to the pattern

__Return__

Buffer | null

__Example__

```javascript
var us = new UntilStream({ pattern: '\n' });

us.write("Hello\nWorld");
var hello = us.read();
console.log(hello.toString('utf8'));
us.read(); //matches '\n' pattern!
var world = us.read();
console.log(world.toString('utf8'));
```

<a name="untilStreamPipe" />
### us.pipe(destination, [options])

Pipe incoming data from UntilStream to the destination
WriteStream. If the pattern is reached, leave the pattern
on the internal buffer, disconnect the pipe, and call end()
on the destination. Back-pressure is properly managed.

__Arguments__

* destination - The Stream to pipe data to
* options (optional)
    * end Boolean Default=false

__Return__

Stream - the destination stream

__Example__

```javascript
var us = new UntilStream({ pattern: '\n' });
var loremIpsumStream = fs.createReadStream('loremIpsum.txt');
var outputStream = fs.createWriteStream(path.join(__dirname, 'loremIpsum.out'));

loremIpsumStream.pipe(us).pipe(outputStream).on('close', function() {
  console.log('single line of Lorem Ipsum written to disk');
});
```

<a name="untilStreamReconfigure" />
### us.reconfigure([options])

Reconfigure the pattern option. It's unwise to call this method
while piping to a destination stream.

__Arguments__

* options (optional)
    * pattern - String or Buffer If provided, UntilStream will
                stop reads or pipes when reached

__Example__

```javascript
var us = new UntilStream();

us.write("Hello\nWorld");
us.reconfigure({ pattern: '\n' });
var hello = us.read();
console.log(hello.toString('utf8'));
us.read(); //matches '\n' pattern!
var world = us.read();
console.log(world.toString('utf8'));
```

## License

MIT
