import Itinerary from '../models/Itinerary.js';

export const addItinerary = async (req, res) => {
  const item = new Itinerary({ ...req.body });
  await item.save();
  res.status(201).json(item);
};

export const getItineraries = async (req, res) => {
  const items = await Itinerary.find({ tripId: req.params.tripId });
  res.json(items);
};

export const updateItinerary = async (req, res) => {
  const item = await Itinerary.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
};

export const deleteItinerary = async (req, res) => {
  await Itinerary.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
};
