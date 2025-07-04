const Itinerary = require('../models/Itinerary');

const addItinerary = async (req, res) => {
  const itinerary = new Itinerary(req.body);
  await itinerary.save();
  res.status(201).json(itinerary);
};

const getItineraries = async (req, res) => {
  const items = await Itinerary.find({ tripId: req.params.tripId });
  res.status(200).json(items);
};

const updateItinerary = async (req, res) => {
  const item = await Itinerary.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Itinerary not found' });
  res.status(200).json(item);
};

const deleteItinerary = async (req, res) => {
  const item = await Itinerary.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'Itinerary not found' });
  res.status(200).json({ message: 'Itinerary deleted' });
};

module.exports = { addItinerary, getItineraries, updateItinerary, deleteItinerary };
