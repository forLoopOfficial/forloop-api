const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const jwtSecret = config.get('jwtSecret');
const jwtExpiry = config.get('jwtExpiry');

const issueToken = payload => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiry
  });
  return token;
};

const verifyToken = token => {
  const decoded = jwt.verify(token, jwtSecret);
  return decoded;
};

module.exports = {
  issueToken,
  verifyToken
};
