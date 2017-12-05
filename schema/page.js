const Joi = require('joi');

const create = Joi.object().keys({
  items: Joi.array().items({
    name: Joi.string().min(1).max(245).required(),
    metadata: Joi.any()
  })
});

const update = Joi.object().keys({
  id: Joi.string().min(1).required(),
  name: Joi.string().min(1).max(245),
  metadata: Joi.any()
});

const bulkUpdate = Joi.object().keys({
  items: Joi.array().items({
    id: Joi.string().min(1).required(),
    name: Joi.string().min(1).max(245),
    metadata: Joi.any()
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
