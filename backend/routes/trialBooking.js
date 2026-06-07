const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  updateBookingStatus,
} = require('../controllers/trialBookingController');
const { protect } = require('../middleware/auth');
const {
  trialBookingValidation,
  mongoIdParam,
  handleValidationErrors,
} = require('../middleware/validate');

router.post(
  '/',
  trialBookingValidation,
  handleValidationErrors,
  createBooking
);
router.get('/', protect, getBookings);
router.put(
  '/:id/status',
  protect,
  mongoIdParam,
  handleValidationErrors,
  updateBookingStatus
);

module.exports = router;
