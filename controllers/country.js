const _ = require('lodash');
const Joi = require('joi');

const response = require('../services').response;
const logger = require('../services').logger;

const { bulkDelete, bulkUpdate, create, update } = require('../schema/country');

const Country = require('../models/country');

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
    return Country.create(values)
      .then(countries => response.sendSuccess(req, res, { data: countries }))
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  },

  get(req, res) {
    const id = req.params.country;
    return Country.findById(id)
      .then(country => response.sendSuccess(req, res, { data: country }))
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  },

  list(req, res) {
    return Country.find()
      .then(countries => response.sendSuccess(req, res, { data: countries }))
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  },

  update(req, res) {
    const id = req.params.country;
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
    return Country.update(query, values)
      .then(() => Country.findById(id))
      .then(country => response.sendSuccess(req, res, { data: country }))
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  },

  bulkUpdate(req, res) {
    const data = req.body;
    const validationResult = Joi.validate(data, bulkUpdate);

    if (!_.isEmpty(validationResult.error)) {
      return response.sendError(req, res, {
        error: validationResult.error,
        status: 422
      });
    }
    const values = validationResult.value.items;
    const updates = values.map(country => {
      const _id = country.id;
      const body = _.omit(country, 'id');
      return {
        updateOne: {
          filter: { _id },
          update: body
        }
      };
    });
    return Country.bulkWrite(updates)
      .then(() =>
        response.sendSuccess(req, res, {
          message: 'Countries updated successfully'
        })
      )
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  },

  delete(req, res) {
    const id = req.params.country;
    const query = { _id: id };
    return Country.deleteOne(query)
      .then(() =>
        response.sendSuccess(req, res, {
          message: 'Country deleted successfully'
        })
      )
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  },

  bulkDelete(req, res) {
    const data = req.body;
    const validationResult = Joi.validate(data, bulkDelete);

    if (!_.isEmpty(validationResult.error)) {
      return response.sendError(req, res, {
        error: validationResult.error,
        status: 422
      });
    }
    const values = validationResult.value.items;
    const deletes = values.map(countryId => ({
      deleteOne: {
        filter: { _id: countryId }
      }
    }));
    return Country.bulkWrite(deletes)
      .then(() =>
        response.sendSuccess(req, res, {
          message: 'Countries deleted successfully'
        })
      )
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  }
};
