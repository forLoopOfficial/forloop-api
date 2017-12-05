const util = require('util');
const _ = require('lodash');

function BaseError(messageOrError, properties = {}) {
  const message =
    messageOrError instanceof Error ? messageOrError.message : messageOrError;
  const error = messageOrError instanceof Error ? messageOrError : null;

  _.defaults(properties, { status: 500 });

  const tmp = properties;
  if (error) {
    tmp.inner = error;
  }

  this.code = properties.status;
  this.status = properties.status;
  this.statusCode = properties.status;
  this.message = message;

  Object.keys(tmp).forEach(key => {
    if (key !== 'code') {
      this[key] = tmp[key];
    }
  });
  Error.captureStackTrace(this, BaseError);
}

util.inherits(BaseError, Error);

module.exports = BaseError;
