const NotFoundError = require('../errors/notFoundError');
const Services = require('../services');

const response = Services.response;

// Throw 404 when reached
exports.throw404 = (req, res, next) =>
  next(new NotFoundError('Endpoint not found'));

// Error handling middlewares
exports.handle404 = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return response.sendError(req, res, { errors: err });
  }
  return next(err);
};

/* eslint-disable no-unused-vars */
exports.handleErrors = (err, req, res, next) =>
  response.sendError(req, res, { errors: err });
