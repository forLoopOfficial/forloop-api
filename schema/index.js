const merchant = require('./merchant');
const customer = require('./customer');
const rental = require('./rental');
const locker = require('./locker');
const kiosk = require('./kiosk');
const state = require('./state');
const user = require('./user');

module.exports = {
  merchant,
  customer,
  rental,
  locker,
  kiosk,
  state,
  user
};
