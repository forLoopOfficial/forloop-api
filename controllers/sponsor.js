const _ = require('lodash');
const Joi = require('joi');

const response = require('../services').response;
const logger = require('../services').logger;

const { bulkDelete, bulkUpdate, create, update } = require('../schema/sponsor');

const Sponsor = require('../models/sponsor');

module.exports = {
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
    return Sponsor.create(values)
      .then(sponsors =>
        response.sendSuccess(req, res, {
          data: sponsors,
          message: 'Sponsor(s) created successfully'
        })
      )
      .catch(err => response.sendError(req, res, { errors: err, status: 400 }));
  },

  get(req, res) {
    const id = req.params.sponsor;
    return Sponsor.findById(id)
      .then(sponsor => response.sendSuccess(req, res, { data: sponsor }))
      .catch(err => response.sendError(req, res, { errors: err, status: 500 }));
  },

  list(req, res) {
    return Sponsor.find()
      .then(countries => response.sendSuccess(req, res, { data: countries }))
      .catch(err => response.sendError(req, res, { errors: err, status: 400 }));
  },

  update(req, res) {
    const id = req.params.sponsor;
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
    return Sponsor.update(query, values)
      .then(() => Sponsor.findById(id))
      .then(sponsor => response.sendSuccess(req, res, { data: sponsor }))
      .catch(err => response.sendError(req, res, { errors: err, status: 500 }));
  },

  bulkUpdate(req, res) {
    const data = req.body;
    const validationResult = Joi.validate(data, bulkUpdate);

    if (!_.isEmpty(validationResult.error)) {
      return response.sendError(req, res, {
        errors: validationResult.error,
        status: 422
      });
    }
    const values = validationResult.value.items;
    const updates = values.map(sponsor => {
      const _id = sponsor.id;
      const body = _.omit(sponsor, 'id');
      return {
        updateOne: {
          filter: { _id },
          update: body
        }
      };
    });
    return Sponsor.bulkWrite(updates)
      .then(() =>
        response.sendSuccess(req, res, {
          message: 'Sponsor(s) updated successfully'
        })
      )
      .catch(err => response.sendError(req, res, { errors: err, status: 500 }));
  },

  delete(req, res) {
    const id = req.params.sponsor;
    const query = { _id: id };
    return Sponsor.deleteOne(query)
      .then(() =>
        response.sendSuccess(req, res, {
          message: 'Sponsor deleted successfully'
        })
      )
      .catch(err => response.sendError(req, res, { errors: err, status: 500 }));
  },

  bulkDelete(req, res) {
    const data = req.body;
    const validationResult = Joi.validate(data, bulkDelete);

    if (!_.isEmpty(validationResult.error)) {
      return response.sendError(req, res, {
        errors: validationResult.error,
        status: 422
      });
    }
    const values = validationResult.value.items;
    const deletes = values.map(countryId => ({
      deleteOne: {
        filter: { _id: countryId }
      }
    }));
    return Sponsor.bulkWrite(deletes)
      .then(() =>
        response.sendSuccess(req, res, {
          message: 'Sponsor(s) deleted successfully'
        })
      )
      .catch(err => response.sendError(req, res, { errors: err, status: 500 }));
  }
};
