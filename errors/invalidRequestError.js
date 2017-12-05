const BaseError = require('./baseError');
const util = require('util');
const _ = require('lodash');

/**
 * Constructor.
 *
 * "The request is missing a required parameter, includes an invalid parameter value,
 * includes a parameter more than once, or is otherwise malformed."
 *
 * @see https://tools.ietf.org/html/rfc2616#section-10.4.5
 */

function InvalidRequestError(message, properties) {
  const tmp = _.assign(
    {
      status: 400,
      name: 'invalid_request'
    },
    properties
  );

  BaseError.call(this, message, tmp);
}

util.inherits(InvalidRequestError, BaseError);

module.exports = InvalidRequestError;
