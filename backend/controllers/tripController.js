const Trip = require('../models/Trip');

const createTrip = async (req, res) => {
  const trip = new Trip({ ...req.body, userId: req.userId });
  await trip.save();
  res.status(201).json(trip);
};

const getTrips = async (req, res) => {
  const trips = await Trip.find({ userId: req.userId });
  res.status(200).json(trips);
};

const updateTrip = async (req, res) => {
  const trip = await Trip.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  res.status(200).json(trip);
};

const deleteTrip = async (req, res) => {
  const result = await Trip.deleteOne({ _id: req.params.id, userId: req.userId });
  if (!result.deletedCount) return res.status(404).json({ error: 'Trip not found' });
  res.status(200).json({ message: 'Trip deleted' });
};

module.exports = { createTrip, getTrips, updateTrip, deleteTrip };
