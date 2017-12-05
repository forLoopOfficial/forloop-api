const Joi = require('joi');

const create = Joi.object().keys({
  items: Joi.array().items({
    email: Joi.string().email().required(),
    username: Joi.string().min(1).max(245),
    first_name: Joi.string().min(1).max(245),
    last_name: Joi.string().min(1).max(245),
    role: Joi.string().required(),
    twitter_handle: Joi.string(),
    profile_image: Joi.string(),
    country: Joi.string().required()
  })
});

const update = Joi.object().keys({
  id: Joi.number().min(1).required(),
  email: Joi.string().email().strip(),
  username: Joi.string().min(1).max(245),
  first_name: Joi.string().min(1).max(245),
  last_name: Joi.string().min(1).max(245),
  role: Joi.string(),
  active: Joi.string(),
  twitter_handle: Joi.string(),
  country: Joi.string()
});

module.exports = {
  create,
  update
};
