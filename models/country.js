// grab the mongoose module
const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
    timezone: { type: String, default: 'Africa/Lagos' }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

CountrySchema.virtual('events', {
  ref: 'Event', // The model to use
  localField: '_id', // Find event where `localField`
  foreignField: 'country' // is equal to `foreignField`
});

// define our country model
module.exports = mongoose.model('Country', CountrySchema);
