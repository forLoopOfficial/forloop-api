const _ = require('lodash');
const Joi = require('joi');

const auth = require('../services').auth;
const response = require('../services').response;
const logger = require('../services').logger;

const { create, update } = require('../schema/adminUser');

const AdminUser = require('../models/adminUser');

module.exports = {
  authenticate(req, res) {
    const user = req.user;
    // check if uid exist
    const query = { uid: user.uid };
    return AdminUser.findOne(query)
      .then(admin => {
        if (_.isEmpty(admin)) {
          // send out if no admin account
          throw new Error('Please create an account');
        }

        const tokenPayload = _.omit(admin, 'events');
        const token = auth.issueToken(tokenPayload);
        return { user: admin, token };
      })
      .then(payload => response.sendSuccess(req, res, { data: payload }))
      .catch(err => response.sendError(req, res, { errors: err, status: 400 }));
  },

  create(req, res) {
    const data = req.body;
    const validationResult = Joi.validate(data, create);

    if (!_.isEmpty(validationResult.error)) {
      return response.sendError(req, res, {
        errors: validationResult.error,
        status: 422
      });
    }
    const values = validationResult.value.items;
    return AdminUser.create(values)
      .then(admins => response.sendSuccess(req, res, { data: admins }))
      .catch(err => response.sendError(req, res, { errors: err, status: 400 }));
  },

  getProfile(req, res) {
    const user = req.user;
    return AdminUser.findById(user.id)
      .then(admin => response.sendSuccess(req, res, { data: admin }))
      .catch(err => response.sendError(req, res, { errors: err, status: 500 }));
  },

  get(req, res) {
    const id = req.params.admin;
    return AdminUser.findById(id)
      .then(admin => response.sendSuccess(req, res, { data: admin }))
      .catch(err => response.sendError(req, res, { errors: err, status: 500 }));
  },

  list(req, res) {
    return AdminUser.find()
      .then(admins => response.sendSuccess(req, res, { data: admins }))
      .catch(err => response.sendError(req, res, { errors: err, status: 400 }));
  },

  updateProfile(req, res) {
    const user = req.user;
    const data = req.body;
    data.id = user.id;
    const validationResult = Joi.validate(data, update);

    if (!_.isEmpty(validationResult.error)) {
      return response.sendError(req, res, {
        errors: validationResult.error,
        status: 422
      });
    }
    const values = validationResult.value;
    const query = { _id: user.id };
    return AdminUser.update(query, values)
      .then(() => AdminUser.findById(user.id))
      .then(admin => response.sendSuccess(req, res, { data: admin }))
      .catch(err => response.sendError(req, res, { errors: err, status: 500 }));
  },

  update(req, res) {
    const id = req.params.admin;
    const data = req.body;
    const validationResult = Joi.validate(data, update);

    if (!_.isEmpty(validationResult.error)) {
      return response.sendError(req, res, {
        errors: validationResult.error,
        status: 422
      });
    }
    const values = validationResult.value;
    const query = { _id: id };
    return AdminUser.update(query, values)
      .then(() => AdminUser.findById(id))
      .then(admin => response.sendSuccess(req, res, { data: admin }))
      .catch(err => response.sendError(req, res, { errors: err, status: 500 }));
  },

  delete(req, res) {
    const id = req.params.admin;
    const query = { _id: id };
    return AdminUser.deleteOne(query)
      .then(() =>
        response.sendSuccess(req, res, {
          message: 'Admin user deleted successfully'
        })
      )
      .catch(err => response.sendError(req, res, { errors: err, status: 500 }));
  }
};
