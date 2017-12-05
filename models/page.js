// grab the mongoose module
const mongoose = require('mongoose');

// store info on the different pages on the main site
const PageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// define our page model
module.exports = mongoose.model('Page', PageSchema);
