import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { createTrip, getTrips, updateTrip, deleteTrip } from '../controllers/tripController.js';
const router = express.Router();

router.use(authenticate);
router.post('/', createTrip);
router.get('/', getTrips);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

export default router;
