const admin = require('firebase-admin');
const Raven = require('raven');

const response = require('../services/response');
const logger = require('../services/logger');
const auth = require('../services/auth');

exports.verifyIdToken = (req, res, next) => {
  const token = req.body.token;
  return admin
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      Raven.setContext({
        user: decodedToken
      });
      req.user = decodedToken;
      next();
    })
    .catch(error => {
      // Handle error
      Raven.captureException(error);
      response.sendError(req, res, { error });
    });
};

exports.authenticated = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        let decoded;
        try {
          const token = credentials;
          decoded = auth.verifyToken(token);
        } catch (err) {
          return res.json(401, { response: { message: 'jwt expired' } });
        }
        req.user = decoded;
        return next();
      }

      return res.json(401, {
        response: { message: 'Format is Authorization: Bearer [token]' }
      });
    }
    return res.json(401, {
      response: { message: 'Format is Authorization: Bearer [token]' }
    });
  }
  return res.json(401, {
    response: { message: 'No Authorization header was found' }
  });
};

exports.checkAuth = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        let decoded;
        try {
          const token = credentials;
          decoded = auth.verifyToken(token);
        } catch (err) {
          logger.debug('req not authenticated');
        }
        req.user = decoded;
      }
    }
  }
  return next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role === 'superadmin' || req.user.role === 'admin') {
    return next();
  }
  return res.json(403, {
    response: { message: 'You are not permitted to perform this action' }
  });
};
