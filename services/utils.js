const _ = require('lodash');
const crypto = require('crypto');
const randomBytes = require('bluebird').promisify(
  require('crypto').randomBytes
);

const logger = require('./logger');

exports.generateRandomToken = () =>
  randomBytes(256).then(buffer =>
    crypto.createHash('sha1').update(buffer).digest('hex')
  );
