const Joi = require('joi');

const create = Joi.object().keys({
  title: Joi.string().required(),
  published: Joi.boolean(),
  description: Joi.string(),
  background_image_url: Joi.string(),
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
  hosts: [
    {
      name: Joi.string().required(),
      description: Joi.string(),
      screen_name: Joi.string().required(),
      profile_image: Joi.string(),
      twitter_url: Joi.string().required()
    }
  ],
  speakers: [
    {
      name: Joi.string().required(),
      topic: Joi.string().required(),
      description: Joi.string(),
      screen_name: Joi.string().required(),
      twitter_url: Joi.string().required(),
      profile_image: Joi.string().required()
    }
  ],
  sponsors: [
    {
      image: Joi.string()
    }
  ],
  location: {
    address: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    name: Joi.string().required()
  },
  country: Joi.string().required()
});

const update = Joi.object().keys({
  title: Joi.string(),
  published: Joi.boolean(),
  description: Joi.string(),
  background_image_url: Joi.string(),
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
  hosts: [
    {
      name: Joi.string(),
      description: Joi.string(),
      screen_name: Joi.string(),
      profile_image: Joi.string(),
      twitter_url: Joi.string()
    }
  ],
  speakers: [
    {
      name: Joi.string().required(),
      topic: Joi.string().required(),
      description: Joi.string(),
      screen_name: Joi.string().required(),
      twitter_url: Joi.string().required(),
      profile_image: Joi.string().required()
    }
  ],
  sponsors: [
    {
      image: Joi.string()
    }
  ],
  location: {
    address: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    name: Joi.string().required()
  },
  country: Joi.string()
});

module.exports = {
  create,
  update
};
