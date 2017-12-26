const app = require('./server');
const logger = require('./services/logger');

const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV || 'development';

app.listen(port, () => {
  logger.debug(`Forloop-API-${env} running on port: ${port}`);
});

exports = module.exports.app;
