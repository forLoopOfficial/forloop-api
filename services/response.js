// const logger = require('./logger');
const utils = require('./utils');

exports.sendError = (
  req,
  res,
  { error = {}, message = 'An Error occurred', status = 404 }
) => {
  if (error instanceof Error) {
    message = error.message;
    status = error.status || status;
    error = {};
  }
  if (error.isJoi) {
    error = parseJoiError(error);
  }

  const response = {
    status: false,
    message,
    error
  };
  const update = {
    finished: new Date(),
    response
  };
  return res.status(status).json(response).end();
};

exports.sendSuccess = (
  req,
  res,
  {
    data = {},
    message = 'Resource successfully retrieved',
    status = 200,
    meta = undefined
  }
) => {
  const response = {
    status: true,
    message,
    data,
    meta
  };
  const update = {
    finished: new Date(),
    response
  };
  return res.status(status).json(response).end();
};

const parseJoiError = error =>
  error.details.map(err => ({
    message: err.message,
    path: err.path,
    type: err.type
  }));
