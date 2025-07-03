import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { addItinerary, getItineraries, updateItinerary, deleteItinerary } from '../controllers/itineraryController.js';
const router = express.Router();

router.use(authenticate);
router.post('/', addItinerary);
router.get('/:tripId', getItineraries);
router.put('/:id', updateItinerary);
router.delete('/:id', deleteItinerary);

export default router;
