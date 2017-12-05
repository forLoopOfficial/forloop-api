const config = require('config');
const winston = require('winston');
require('winston-mongodb');

winston.configure({
  level: 'info'
});

winston.add(winston.transports.Console);
const db = config.has('MONGO_URL')
  ? config.get('MONGO_URL')
  : process.env.MONGO_URL;
const options = {
  db
};
winston.add(winston.transports.MongoDB, options);

module.exports = winston;
