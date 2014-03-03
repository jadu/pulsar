'use strict';

module.exports = PullStream;

require("setimmediate");
var inherits = require("util").inherits;
var UntilStream = require('until-stream');
var over = require('over');
var SliceStream = require('slice-stream');

function PullStream(opts) {
  var self = this;
  this.opts = opts || {};
  UntilStream.call(this, opts);
  this.once('finish', function() {
    self._writesFinished = true;
    if (self._flushed) {
      self._finish();
    }
  });
  this.on('readable', function() {
    self._process();
  });
}
inherits(PullStream, UntilStream);

PullStream.prototype.pull = over([
  [over.numberOptionalWithDefault(null), over.func, function (len, callback) {
    if (len === 0) {
      return callback(null, new Buffer(0));
    }

    var self = this;
    pullServiceRequest();

    function pullServiceRequest() {
      self._serviceRequests = null;
      if (self._flushed) {
        return callback(new Error('End of Stream'));
      }

      var data = self.read(len || undefined);
      if (data) {
        process.nextTick(callback.bind(null, null, data));
      } else {
        self._serviceRequests = pullServiceRequest;
      }
    }
  }]
]);

PullStream.prototype.pullUpTo = over([
  [over.numberOptionalWithDefault(null), function (len) {
    var data = this.read(len);
    if (len && !data) {
      data = this.read();
    }
    return data;
  }]
]);

PullStream.prototype.pipe = over([
  [over.numberOptionalWithDefault(null), over.object, function (len, destStream) {
    if (!len) {
      return UntilStream.prototype.pipe.call(this, destStream);
    }

    if (len === 0) {
      return destStream.end();
    }


    var pullstream = this;
    pullstream
      .pipe(new SliceStream({ length: len }, function (buf, sliceEnd, extra) {
        if (!sliceEnd) {
          return this.push(buf);
        }
        pullstream.unpipe();
        pullstream.unshift(extra);
        this.push(buf);
        return this.push(null);
      }))
      .pipe(destStream);

    return destStream;
  }]
]);

PullStream.prototype._process = function () {
  if (this._serviceRequests) {
    this._serviceRequests();
  }
};

PullStream.prototype._flush = function (callback) {
  var self = this;
  if (this._readableState.length > 0) {
    return setImmediate(self._flush.bind(self, callback));
  }

  this._flushed = true;
  if (self._writesFinished) {
    self._finish(callback);
  } else {
    callback();
  }
};

PullStream.prototype._finish = function (callback) {
  callback = callback || function () {};
  if (this._serviceRequests) {
    this._serviceRequests();
  }
  process.nextTick(callback);
};