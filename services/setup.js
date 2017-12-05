const config = require('config');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Raven = require('raven');
const admin = require('firebase-admin');

const logger = require('./logger');

Promise.promisifyAll(jwt);
Promise.promisifyAll(bcrypt);

Raven.config(config.get('RAVEN_URL'), {
  autoBreadcrumbs: true,
  captureUnhandledRejections: true,
  sendTimeout: 5
}).install();

// try connecting to mongo
mongoose.Promise = Promise;
const db = config.has('MONGO_URL')
  ? config.get('MONGO_URL')
  : process.env.MONGO_URL;
mongoose.connect(db, err => {
  if (err) {
    logger.error(`Connection Error:${err}`);
  } else logger.info('Connected');
});

// setup firebase admin access
const details = JSON.parse(JSON.stringify(config.get('SERVICE_ACCOUNT'))); // hack to allow parsing process.env value
logger.info('details', details);
const { projectId, clientEmail, privateKey } = details;
const credential = admin.credential.cert({
  projectId,
  clientEmail,
  privateKey
});
admin.initializeApp({
  credential,
  databaseURL: config.get('DATABASE_URL')
});
