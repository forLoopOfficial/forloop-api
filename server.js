const express = require('express');
const cors = require('cors');
const body = require('body-parser');
const Raven = require('raven');

const requestMiddleware = require('./middlewares/request');
const swaggerSpec = require('./services/swagger');

const app = express();

require('./services/setup'); // required for side effect - e.g promisifying

app.use(Raven.requestHandler());
app.use(cors());
app.use(body.json());
app.use(body.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// protected routes ==================================================
app.use('/api/events', require('./routes/event'));
app.use('/api/members', require('./routes/member'));
app.use('/api/team', require('./routes/team'));
app.use('/api/pages', require('./routes/page'));
app.use('/api/countries', require('./routes/country'));
app.use('/api/sponsors', require('./routes/sponsor'));
app.use('/api/stats', require('./routes/stat'));
app.use('/api/admins', require('./routes/admin'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/miscs', require('./routes/misc'));

app.use(requestMiddleware.throw404);

// Error handling middlewares
app.use(Raven.errorHandler());
app.use(requestMiddleware.handle404);
app.use(requestMiddleware.handleErrors);

module.exports = app;
