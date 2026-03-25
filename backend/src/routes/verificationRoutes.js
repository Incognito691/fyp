import express from 'express';
import { 
  verifyPhoneNumber, 
  getNumberDetails,
  getRecentScams,
  getStats
} from '../controllers/verificationController.js';
import protect from '../middlewares/authMiddlewares.js';

const router = express.Router();

// Verify a phone number
router.post('/', protect, verifyPhoneNumber);

// Get recent scam numbers
router.get('/recent', protect, getRecentScams);

// Get statistics
router.get('/stats', protect, getStats);

// Get details of a specific number (must be last to avoid conflicts)
router.get('/:number', protect, getNumberDetails);

export default router;
