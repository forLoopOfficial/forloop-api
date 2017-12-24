const _ = require('lodash');
const Joi = require('joi');

const logger = require('../services').logger;
const response = require('../services').response;

const { create } = require('../schema/team');

const Team = require('../models/team');

module.exports = {
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
    return Team.create(values)
      .then(team => response.sendSuccess(req, res, { data: team }))
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  },

  get(req, res) {
    const id = req.params.member;
    return Team.findById(id)
      .then(member => response.sendSuccess(req, res, { data: member }))
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  },

  list(req, res) {
    return Team.find()
      .then(team => response.sendSuccess(req, res, { data: team }))
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  },

  delete(req, res) {
    const id = req.params.member;
    const query = { _id: id };
    return Team.deleteOne(query)
      .then(() =>
        response.sendSuccess(req, res, {
          message: 'Team Member deleted successfully'
        })
      )
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  }
};
