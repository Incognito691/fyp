import express from 'express';
import { registerUser, loginUser, googleLogin, completeOnboarding } from '../controllers/authController.js';
import protect from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin); // <--- New Google Route
router.put('/onboarding', protect, completeOnboarding);

export default router;