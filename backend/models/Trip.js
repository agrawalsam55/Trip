const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  destination: String,
  startDate: Date,
  endDate: Date
});

module.exports = mongoose.model('Trip', tripSchema);
