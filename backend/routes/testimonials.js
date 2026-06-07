const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  testimonialValidation,
  mongoIdParam,
  handleValidationErrors,
} = require('../middleware/validate');

router.get('/', getTestimonials);
router.post(
  '/',
  protect,
  upload.single('memberImage'),
  testimonialValidation,
  handleValidationErrors,
  createTestimonial
);
router.put(
  '/:id',
  protect,
  upload.single('memberImage'),
  mongoIdParam,
  handleValidationErrors,
  updateTestimonial
);
router.delete(
  '/:id',
  protect,
  mongoIdParam,
  handleValidationErrors,
  deleteTestimonial
);

module.exports = router;
