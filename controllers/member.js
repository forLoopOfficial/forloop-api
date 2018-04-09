const _ = require('lodash');
const Joi = require('joi');
const Raven = require('raven');

const auth = require('../services').auth;
const logger = require('../services').logger;
const response = require('../services').response;

const { create, update } = require('../schema/member');

const Member = require('../models/member');

module.exports = {
  authenticate(req, res) {
    const user = req.user;
    // check if uid exist
    const query = { uid: user.uid };
    return Member.findOne(query)
      .then(member => {
        if (_.isEmpty(member)) {
          // create new member object
          const values = _.pick(user, ['uid', 'displayName', 'email']);
          values.name = values.displayName;
          return Member.create(values).then(newMember => {
            const token = auth.issueToken(newMember);
            return { user: newMember, token };
          });
        }

        const tokenPayload = _.omit(member, 'events');
        const token = auth.issueToken(tokenPayload);
        return { user: member, token };
      })
      .then(payload => response.sendSuccess(req, res, { data: payload }))
      .catch(err => {
        Raven.captureException(err);
        response.sendError(req, res, { error: err, status: 400 });
      });
  },

  create(req, res) {
    const data = req.body;
    const validationResult = Joi.validate(data, create);

    if (!_.isEmpty(validationResult.error)) {
      return response.sendError(req, res, {
        error: validationResult.error,
        status: 422
      });
    }
    const values = validationResult.value;
    return Member.create(values)
      .then(member => response.sendSuccess(req, res, { data: member }))
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  },

  getProfile(req, res) {
    logger.debug('user', req.user);
    const user = req.user;
    return Member.findById(user._id)
      .then(member => response.sendSuccess(req, res, { data: member }))
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  },

  list(req, res) {
    return Member.find()
      .then(members => response.sendSuccess(req, res, { data: members }))
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  },

  updateProfile(req, res) {
    const user = req.user;
    const data = req.body;
    const validationResult = Joi.validate(data, update);

    if (!_.isEmpty(validationResult.error)) {
      return response.sendError(req, res, {
        error: validationResult.error,
        status: 422
      });
    }
    const values = validationResult.value;
    const query = { _id: user._id };
    return Member.update(query, values)
      .then(() => Member.findById(user._id))
      .then(member => response.sendSuccess(req, res, { data: member }))
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  },

  delete(req, res) {
    const id = req.params.admin;
    const query = { _id: id };
    return Member.deleteOne(query)
      .then(() =>
        response.sendSuccess(req, res, {
          message: 'Member deleted successfully'
        })
      )
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  }
};
