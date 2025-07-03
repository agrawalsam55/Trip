import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  day: String,
  time: String,
  description: String,
  location: String
});

export default mongoose.model('Itinerary', itinerarySchema);
