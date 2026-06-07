const express = require('express');
const router = express.Router();
const { login, refresh } = require('../controllers/authController');
const { loginValidation, handleValidationErrors } = require('../middleware/validate');

router.post('/login', loginValidation, handleValidationErrors, login);
router.post('/refresh', refresh);

module.exports = router;
