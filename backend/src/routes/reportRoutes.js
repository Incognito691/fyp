import express from 'express';
import { 
  submitReport, 
  getReportsForNumber, 
  getMyReports,
  getMyReportStats,
  deleteReport
} from '../controllers/reportController.js';
import protect from '../middlewares/authMiddlewares.js';

const router = express.Router();

// Submit a new report
router.post('/', protect, submitReport);

// Get user's own reports
router.get('/my', protect, getMyReports);

// Get user's report statistics
router.get('/my/stats', protect, getMyReportStats);

// Delete a report
router.delete('/:id', protect, deleteReport);

// Get reports for a specific number (must be last to avoid route conflicts)
router.get('/:number', protect, getReportsForNumber);

export default router;
