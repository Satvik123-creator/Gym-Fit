const express = require('express');
const router = express.Router();
const {
  getTrainers,
  getTrainer,
  createTrainer,
  updateTrainer,
  deleteTrainer,
} = require('../controllers/trainerController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  trainerValidation,
  mongoIdParam,
  handleValidationErrors,
} = require('../middleware/validate');

router.get('/', getTrainers);
router.get('/:id', mongoIdParam, handleValidationErrors, getTrainer);
router.post(
  '/',
  protect,
  upload.single('image'),
  trainerValidation,
  handleValidationErrors,
  createTrainer
);
router.put(
  '/:id',
  protect,
  upload.single('image'),
  mongoIdParam,
  handleValidationErrors,
  updateTrainer
);
router.delete(
  '/:id',
  protect,
  mongoIdParam,
  handleValidationErrors,
  deleteTrainer
);

module.exports = router;
