// grab the mongoose module
const mongoose = require('mongoose');

const SponsorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image_url: { type: String },
    website: { type: String },
    front_page: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// define our sponsor model
module.exports = mongoose.model('Sponsor', SponsorSchema);
