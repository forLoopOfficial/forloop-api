const BaseError = require('./baseError');
const util = require('util');
const _ = require('lodash');

/**
 * Constructor.
 *
 * "If the request lacks any authentication information (e.g., the client
 * was unaware that authentication is necessary or attempted using an
 * unsupported authentication method), the resource server SHOULD NOT
 * include an error code or other error information."
 *
 * @see https://tools.ietf.org/html/rfc6750#section-3.1
 */

function UnauthorizedRequestError(message, properties) {
  const tmp = _.assign(
    {
      status: 401,
      name: 'unauthorized_request'
    },
    properties
  );

  BaseError.call(this, message, tmp);
}

util.inherits(UnauthorizedRequestError, BaseError);

module.exports = UnauthorizedRequestError;
