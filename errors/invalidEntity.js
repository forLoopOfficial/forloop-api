const BaseError = require('./baseError');
const util = require('util');
const _ = require('lodash');

/**
 * Constructor.
 *
 *
 * @see https://tools.ietf.org/html/rfc2616#section-10.4.5
 */

function InvalidEntityError(message, properties) {
  const tmp = _.assign(
    {
      status: 400,
      name: 'invalid_entity'
    },
    properties
  );

  BaseError.call(this, message, tmp);
}

util.inherits(InvalidEntityError, BaseError);

module.exports = InvalidEntityError;
