const Joi = require('joi');

const create = Joi.object().keys({
  items: Joi.array().items({
    name: Joi.string().min(1).max(245).required(),
    image_url: Joi.string().min(1).required(),
    website: Joi.string().min(1).max(245),
    front_page: Joi.boolean()
  })
});

const update = Joi.object().keys({
  id: Joi.string().min(1).required(),
  name: Joi.string().min(1).max(245),
  image_url: Joi.string().min(1),
  website: Joi.string().min(1).max(245),
  front_page: Joi.boolean()
});

const bulkUpdate = Joi.object().keys({
  items: Joi.array().items({
    id: Joi.string().min(1).required(),
    name: Joi.string().min(1).max(245),
    image_url: Joi.string().min(1),
    website: Joi.string().min(1).max(245),
    front_page: Joi.boolean()
  })
});

const bulkDelete = Joi.object().keys({
  items: Joi.array().items(Joi.string().min(1).required())
});

module.exports = {
  bulkUpdate,
  bulkDelete,
  create,
  update
};
