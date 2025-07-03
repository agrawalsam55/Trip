import Trip from '../models/Trip.js';

export const createTrip = async (req, res) => {
  const trip = new Trip({ ...req.body, userId: req.userId });
  await trip.save();
  res.status(201).json(trip);
};

export const getTrips = async (req, res) => {
  const trips = await Trip.find({ userId: req.userId });
  res.json(trips);
};

export const updateTrip = async (req, res) => {
  const trip = await Trip.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
  res.json(trip);
};

export const deleteTrip = async (req, res) => {
  await Trip.deleteOne({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Trip deleted' });
};
