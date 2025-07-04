const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { addItinerary, getItineraries, updateItinerary, deleteItinerary } = require('../controllers/itineraryController');

const router = express.Router();
router.use(authenticate);

router.post('/', addItinerary);
router.get('/:tripId', getItineraries);
router.put('/:id', updateItinerary);
router.delete('/:id', deleteItinerary);

module.exports = router;
