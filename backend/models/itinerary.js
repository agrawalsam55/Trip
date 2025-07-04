const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  day: String,
  time: String,
  description: String,
  location: String
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
