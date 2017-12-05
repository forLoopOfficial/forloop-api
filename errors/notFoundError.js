const BaseError = require('./baseError');
const util = require('util');
const _ = require('lodash');

/**
 * Constructor.
 *
 * "The resource was not found"
 *
 * @see https://tools.ietf.org/html/rfc2616#section-10.4.5
 */

function NotFoundError(message, properties) {
  const tmp = _.assign(
    {
      status: 404,
      name: 'resource_not_found'
    },
    properties
  );

  BaseError.call(this, message, tmp);
}

util.inherits(NotFoundError, BaseError);

module.exports = NotFoundError;
