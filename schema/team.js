const Joi = require('joi');

const create = Joi.object().keys({
  items: Joi.array().items({
    name: Joi.string().min(1).max(245).required(),
    profile_image: Joi.string().required(),
    twitter_handle: Joi.string()
  })
});

const bulkUpdate = Joi.object().keys({
  items: Joi.array().items({
    id: Joi.string().min(1).required(),
    name: Joi.string().min(1).max(245),
    profile_image: Joi.string(),
    twitter_handle: Joi.string()
  })
});

const bulkDelete = Joi.object().keys({
  items: Joi.array().items(Joi.string().min(1).required())
});

module.exports = {
  bulkUpdate,
  bulkDelete,
  create
};
