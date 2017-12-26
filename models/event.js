// grab the mongoose module
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    firebase_id: { type: String },
    title: { type: String, required: true },
    url_slug: { type: String, required: true },
    published: { type: Boolean, default: false },
    description: { type: String, required: true },
    background_image_url: { type: String, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
    when: {
      date: { type: Number, required: true },
      date_formatted: { type: String, required: true },
      to: {
        A: { type: String, required: true },
        h: { type: String, required: true },
        mm: { type: String, required: true }
      },
      from: {
        A: { type: String, required: true },
        h: { type: String, required: true },
        mm: { type: String, required: true }
      }
    },
    hosts: [
      {
        name: { type: String, required: true },
        description: { type: String },
        screen_name: { type: String, required: true },
        profile_image: { type: String },
        twitter_url: { type: String, required: true }
      }
    ],
    speakers: [
      {
        name: { type: String, required: true },
        topic: { type: String, required: true },
        description: { type: String },
        screen_name: { type: String, required: true },
        twitter_url: { type: String, required: true },
        profile_image: { type: String, required: true }
      }
    ],
    sponsors: [
      {
        image: { type: String }
      }
    ],
    location: {
      address: { type: String, required: true },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      name: { type: String, required: true }
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// define our event model
module.exports = mongoose.model('Event', EventSchema);
