const express = require('express');
const router = express.Router();
const {
  getTransformations,
  createTransformation,
  updateTransformation,
  deleteTransformation,
} = require('../controllers/transformationController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  transformationValidation,
  mongoIdParam,
  handleValidationErrors,
} = require('../middleware/validate');

router.get('/', getTransformations);
router.post(
  '/',
  protect,
  upload.fields([
    { name: 'beforeImage', maxCount: 1 },
    { name: 'afterImage', maxCount: 1 },
  ]),
  transformationValidation,
  handleValidationErrors,
  createTransformation
);
router.put(
  '/:id',
  protect,
  upload.fields([
    { name: 'beforeImage', maxCount: 1 },
    { name: 'afterImage', maxCount: 1 },
  ]),
  mongoIdParam,
  handleValidationErrors,
  updateTransformation
);
router.delete(
  '/:id',
  protect,
  mongoIdParam,
  handleValidationErrors,
  deleteTransformation
);

module.exports = router;
