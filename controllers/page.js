const _ = require('lodash');
const Joi = require('joi');
const mongoose = require('mongoose');

const response = require('../services').response;
const logger = require('../services').logger;

const { create, update } = require('../schema/page');

const Page = require('../models/page');

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
    const values = validationResult.value.items;
    return Page.create(values)
      .then(pages => response.sendSuccess(req, res, { data: pages }))
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  },

  get(req, res) {
    const identifier = req.params.page;
    const query = {};
    logger.debug('identifier', identifier);
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      query._id = identifier;
    } else {
      query.name = identifier;
    }
    return Page.findOne(query)
      .catch(err => {
        logger.error('issue', err);
        throw err;
      })
      .then(page => response.sendSuccess(req, res, { data: page }))
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  },

  list(req, res) {
    return Page.find()
      .then(pages => response.sendSuccess(req, res, { data: pages }))
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  },

  update(req, res) {
    const id = req.params.page;
    const data = req.body;
    const validationResult = Joi.validate(data, update);

    if (!_.isEmpty(validationResult.error)) {
      return response.sendError(req, res, {
        error: validationResult.error,
        status: 422
      });
    }
    const values = validationResult.value;
    const query = { _id: id };
    return Page.update(query, values)
      .then(() => Page.findById(id))
      .then(page => response.sendSuccess(req, res, { data: page }))
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  },

  delete(req, res) {
    const id = req.params.page;
    const query = { _id: id };
    return Page.deleteOne(query)
      .then(() =>
        response.sendSuccess(req, res, {
          message: 'Page deleted successfully'
        })
      )
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  }
};
