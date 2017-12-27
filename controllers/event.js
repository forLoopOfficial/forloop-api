const _ = require('lodash');
const Joi = require('joi');

const response = require('../services').response;
const logger = require('../services').logger;

const { create, update } = require('../schema/event');

const Event = require('../models/event');

module.exports = {
  create(req, res) {
    const user = req.user;
    const data = req.body;
    const validationResult = Joi.validate(data, create);

    if (!_.isEmpty(validationResult.error)) {
      return response.sendError(req, res, {
        error: validationResult.error,
        status: 422
      });
    }
    const values = validationResult.value;
    values.created_by = user._id;
    return Event.create(values)
      .then(event => response.sendSuccess(req, res, { data: event }))
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  },

  get(req, res) {
    const id = req.params.event;
    return Event.findById(id)
      .then(event => response.sendSuccess(req, res, { data: event }))
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  },

  getBySlug(req, res) {
    const slug = req.params.slug;
    return Event.findOne({ url_slug: slug })
      .populate('attendees')
      .then(event => {
        if (_.isEmpty(event)) {
          throw new Error('Event not found');
        }
        response.sendSuccess(req, res, { data: event });
      })
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  },

  list(req, res) {
    const query = {};
    query.published = true; // by default fetch only published events

    // check if an admin is trying to filter based on publised status
    if (!_.isEmpty(req.query.published) && _.has(req, 'user.role')) {
      if (req.query.published !== 'all') query.published = req.query.published;
      else delete query.published;
    }
    return Event.find(query)
      .populate('country')
      .sort({ created_at: -1 })
      .then(events => response.sendSuccess(req, res, { data: events }))
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  },

  update(req, res) {
    const id = req.params.event;
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
    return Event.update(query, values)
      .then(() => Event.findById(id))
      .then(event => response.sendSuccess(req, res, { data: event }))
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  },

  delete(req, res) {
    const id = req.params.page;
    const query = { _id: id };
    return Event.deleteOne(query)
      .then(() =>
        response.sendSuccess(req, res, {
          message: 'Event deleted successfully'
        })
      )
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  },

  attend(req, res) {
    const user = req.user; // member object
    const id = req.params.event;
    return Event.findById(id)
      .then(event => {
        // push member id into attendees property of event
        event.attendees.push(user.id);
        return event.save();
      })
      .then(event => response.sendSuccess(req, res, { data: event }))
      .catch(err => response.sendError(req, res, { error: err, status: 500 }));
  }
};
