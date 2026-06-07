const express = require('express');
const router = express.Router();
const {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
} = require('../controllers/membershipController');
const { protect } = require('../middleware/auth');
const {
  planValidation,
  mongoIdParam,
  handleValidationErrors,
} = require('../middleware/validate');

router.get('/', getPlans);
router.post('/', protect, planValidation, handleValidationErrors, createPlan);
router.put(
  '/:id',
  protect,
  mongoIdParam,
  handleValidationErrors,
  updatePlan
);
router.delete(
  '/:id',
  protect,
  mongoIdParam,
  handleValidationErrors,
  deletePlan
);

module.exports = router;
