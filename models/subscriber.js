// grab the mongoose module
const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// define our subscriber model
module.exports = mongoose.model('Subscriber', SubscriberSchema);
