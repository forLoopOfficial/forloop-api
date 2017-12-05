const Joi = require('joi');

const create = Joi.object().keys({
  uid: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().min(1).max(245),
  display_name: Joi.string().min(1).max(245),
  github: Joi.string(),
  twitter: Joi.string(),
  job_role: Joi.string(),
  skills: Joi.array().items(Joi.string()),
  profile_image: Joi.string(),
  location: Joi.string(),
  country: Joi.string().required()
});

const update = Joi.object().keys({
  email: Joi.string().email(),
  name: Joi.string().min(1).max(245),
  display_name: Joi.string().min(1).max(245),
  github: Joi.string(),
  twitter: Joi.string(),
  job_role: Joi.string(),
  skills: Joi.array().items(Joi.string()),
  profile_image: Joi.string(),
  location: Joi.string(),
  country: Joi.string()
});

module.exports = {
  create,
  update
};
