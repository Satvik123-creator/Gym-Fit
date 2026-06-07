const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');
const {
  enquiryValidation,
  mongoIdParam,
  handleValidationErrors,
} = require('../middleware/validate');

router.post('/', enquiryValidation, handleValidationErrors, createEnquiry);
router.get('/', protect, getEnquiries);
router.put(
  '/:id/status',
  protect,
  mongoIdParam,
  handleValidationErrors,
  updateEnquiryStatus
);

module.exports = router;
