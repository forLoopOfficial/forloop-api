// grab the mongoose module
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profile_image: { type: String },
    twitter_handle: { type: String }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// define our team model
module.exports = mongoose.model('Team', TeamSchema);
