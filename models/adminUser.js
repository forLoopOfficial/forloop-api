// grab the mongoose module
const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String },
    role: { type: String, required: true, enum: ['admin', 'superadmin'] },
    email: { type: String, required: true },
    active: { type: Boolean, default: true },
    twitter_handle: { type: String },
    profile_image: { type: String },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

AdminUserSchema.virtual('events', {
  ref: 'Event', // The model to use
  localField: '_id', // Find event where `localField`
  foreignField: 'created_by' // is equal to `foreignField`
});

// define our admin user model
module.exports = mongoose.model('AdminUser', AdminUserSchema);
