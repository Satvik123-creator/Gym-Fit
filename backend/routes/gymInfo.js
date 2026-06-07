const express = require('express');
const router = express.Router();
const { getGymInfo, updateGymInfo } = require('../controllers/gymInfoController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  gymInfoValidation,
  handleValidationErrors,
} = require('../middleware/validate');

router.get('/', getGymInfo);
router.put(
  '/',
  protect,
  upload.single('heroImage'),
  gymInfoValidation,
  handleValidationErrors,
  updateGymInfo
);

module.exports = router;
