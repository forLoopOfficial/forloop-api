const admin = require('firebase-admin');
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const logger = require('./logger');

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

const registerAdmin = user =>
  admin
    .auth()
    .createUser(user)
    .then(userRecord => {
      logger.debug('Successfully created new admin user:', userRecord.uid);
      return userRecord;
    })
    .catch(error => {
      logger.error('Error creating new admin user:', error.message);
      throw error;
    });

module.exports = {
  issueToken,
  verifyToken,
  registerAdmin
};
