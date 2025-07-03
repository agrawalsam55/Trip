import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  destination: String,
  startDate: Date,
  endDate: Date
});

export default mongoose.model('Trip', tripSchema);
