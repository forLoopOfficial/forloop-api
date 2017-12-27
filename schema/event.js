const Joi = require('joi');

const create = Joi.object().keys({
  title: Joi.string().required(),
  url_slug: Joi.any(),
  published: Joi.boolean(),
  description: Joi.string(),
  background_image_url: Joi.string(),
  resource_url: Joi.string(),
  github: Joi.string(),
  when: {
    date: Joi.number().required(),
    date_formatted: Joi.string(),
    to: {
      A: Joi.string().required(),
      h: Joi.string().required(),
      mm: Joi.string().required()
    },
    from: {
      A: Joi.string().required(),
      h: Joi.string().required(),
      mm: Joi.string()
    }
  },
  hosts: Joi.array().items({
    name: Joi.string(),
    description: Joi.string(),
    screen_name: Joi.string(),
    profile_image: Joi.string(),
    twitter_url: Joi.string()
  }),
  speakers: Joi.array().items({
    name: Joi.string().required(),
    topic: Joi.string().required(),
    description: Joi.string(),
    screen_name: Joi.string().required(),
    twitter_url: Joi.string().required(),
    profile_image: Joi.string().required()
  }),
  sponsors: Joi.array().items({
    image: Joi.string()
  }),
  location: {
    address: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    name: Joi.string().required()
  },
  country: Joi.string().required(),
  attendees: Joi.any()
});

const update = Joi.object().keys({
  __v: Joi.any(),
  _id: Joi.string(),
  title: Joi.string(),
  published: Joi.boolean(),
  description: Joi.string(),
  background_image_url: Joi.string(),
  resource_url: Joi.string(),
  github: Joi.string(),
  when: {
    date: Joi.number(),
    date_formatted: Joi.string(),
    to: {
      A: Joi.string(),
      h: Joi.string(),
      mm: Joi.string()
    },
    from: {
      A: Joi.string(),
      h: Joi.string(),
      mm: Joi.string()
    }
  },
  hosts: Joi.array().items({
    _id: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    screen_name: Joi.string(),
    profile_image: Joi.string(),
    twitter_url: Joi.string()
  }),
  speakers: Joi.array().items({
    _id: Joi.string(),
    name: Joi.string().required(),
    topic: Joi.string().required(),
    description: Joi.string(),
    screen_name: Joi.string().required(),
    twitter_url: Joi.string().required(),
    profile_image: Joi.string().required()
  }),
  sponsors: Joi.array().items({
    _id: Joi.string(),
    image: Joi.string()
  }),
  location: {
    address: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    name: Joi.string().required()
  },
  country: Joi.string(),
  attendees: Joi.any()
});

module.exports = {
  create,
  update
};
