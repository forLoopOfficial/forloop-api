// grab the mongoose module
const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema(
  {
    uid: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    display_name: { type: String, required: true },
    email: { type: String },
    github: { type: String },
    twitter: { type: String },
    job_role: { type: String },
    skills: [{ type: String }],
    active: { type: Boolean, default: true },
    profile_image: { type: String },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    location: { type: String },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// define our member model
module.exports = mongoose.model('Member', MemberSchema);
