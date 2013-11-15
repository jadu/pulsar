'use strict';

module.exports = Until;

require("setimmediate");
var PassThrough = require('stream').PassThrough;
var inherits = require("util").inherits;
var Buffers = require('buffers');

if (!PassThrough) {
  PassThrough = require('readable-stream/passthrough');
}

inherits(Until, PassThrough);


function Until(opts) {
  this.reconfigure(opts);
  this._buf = Buffers();
  this._flushing = false;
  this.unpiping = false;

  //todo allow and handle normal PassThrough opts
  PassThrough.call(this);
}

Until.prototype.read = function (size) {
  var rs = this._readableState;
  var pattern = this._opts.pattern;
  if (!pattern) {
    if (this._buf.length) {
      if (this._buf.length >= size) {
        var output = this._buf.slice(0, size);
        this._buf = Buffers([this._buf.slice(size)]);
        return output;
      } else {
        var data = PassThrough.prototype.read.call(this, size ?
                                                   size - this._buf.length : size);
        if (data) this._buf.push(data);
        var output = this._buf.toBuffer();
        this._buf = Buffers();
        return output;
      }
    }
    return PassThrough.prototype.read.call(this, size);
  }

  if (this.unpiping) {
    //either return null from read() until everything is unpiped
    //    or change flow() within readable-stream.pipe()
    return null;
  }

  var data;
  if (this._buf.indexOf(pattern) === 0  ||
      (data = PassThrough.prototype.read.call(this, size)) && this._buf.push(data)
        && this._buf.indexOf(pattern) === 0) {
    if (rs.pipesCount) {
      this.unpiping = true;
      endPipes.call(this);
      return null;
    }
    var output = this._buf.slice(0, pattern.length);
    this._buf = Buffers([this._buf.slice(pattern.length)]);
    return output;
  }

  var index = this._buf.indexOf(pattern);
  if (index > 0) {
    //lop off everything starting with pattern & put it in buffer for next read()
    var output = this._buf.slice(0, index);
    this._buf = Buffers([this._buf.slice(index)]);
    if (rs.pipesCount) {
      this.unpiping = true;
      process.nextTick(endPipes.bind(this));
    }
    return output;
  }

  if (pattern.length > this._buf.length) {
    if (this._flushing) {
      var output = this._buf.toBuffer();
      this._buf = Buffers();
      return output;
    }
    return null;
  }

  //slice off pattern.length - 1 from the end in case the pattern straddles chunks
  var offset = this._buf.length - (pattern.length - 1);
  var output = this._buf.slice(0, offset);
  output = output.length ? output : null;
  this._buf = offset > 0 ? Buffers([this._buf.slice(offset)]) : this._buf;
  return output;
};

Until.prototype.pipe = function(dest, pipeOpts) {
  if (this._opts.pattern) {
    pipeOpts = pipeOpts || {};
    pipeOpts.end = pipeOpts.end || false;
  }
  return PassThrough.prototype.pipe.call(this, dest, pipeOpts);
};

Until.prototype._flush = function(cb) {
  this._flushing = true;
  var rs = this._readableState;
  if (rs.length || this._buf.length) {
    if (rs.pipesCount > 0) {
      writePipes.call(this, this.read());
    }
    //allow for I/O
    return setImmediate(this._flush.bind(this, cb));
  }
  endPipes.call(this);
  process.nextTick(cb);
}

Until.prototype.reconfigure = function (opts) {
  opts = opts || {};
  var pattern = opts && opts.pattern ? opts.pattern : null;
  if (pattern) {
    if (typeof pattern === "string") {
      pattern = new Buffer(pattern);
    } else if (!pattern instanceof Buffer) {
      throw new Error('Invalid pattern type')
    }
  }
  this._opts = this._opts || opts;
  this._opts.pattern = pattern;
};

function writePipes(data) {
  var rs = this._readableState;
  switch (rs.pipesCount) {
  case 0:
    break;
  case 1:
    rs.pipes.write(data);
    break;
  default:
    //todo
    break;
  }
}

function endPipes() {
  var rs = this._readableState;
  var pipes = rs.pipes;
  var pipesCount = rs.pipesCount;
  this.unpipe();
  this.unpiping = false;

  switch (pipesCount) {
  case 0:
    break;
  case 1:
    pipes.end();
    break;
  default:
    //todo
    break;
  }
}
