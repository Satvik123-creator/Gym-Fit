const express = require('express');
const router = express.Router();
const {
  getGallery,
  createGallery,
  deleteGallery,
} = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  galleryValidation,
  mongoIdParam,
  handleValidationErrors,
} = require('../middleware/validate');

router.get('/', getGallery);
router.post(
  '/',
  protect,
  upload.single('image'),
  galleryValidation,
  handleValidationErrors,
  createGallery
);
router.delete(
  '/:id',
  protect,
  mongoIdParam,
  handleValidationErrors,
  deleteGallery
);

module.exports = router;
