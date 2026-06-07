const { body, query, param } = require('express-validator');

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const trainerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('designation').trim().notEmpty().withMessage('Designation is required'),
  body('specialization')
    .isArray({ min: 1 })
    .withMessage('At least one specialization is required'),
  body('experience')
    .isNumeric()
    .withMessage('Experience must be a number')
    .custom((v) => v >= 0)
    .withMessage('Experience cannot be negative'),
];

const planValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('duration').trim().notEmpty().withMessage('Duration is required'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((v) => v >= 0)
    .withMessage('Price cannot be negative'),
];

const galleryValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('category')
    .isIn(['gym', 'equipment', 'transformation', 'event'])
    .withMessage('Invalid category'),
];

const testimonialValidation = [
  body('memberName').trim().notEmpty().withMessage('Member name is required'),
  body('review').trim().notEmpty().withMessage('Review is required'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
];

const transformationValidation = [
  body('memberName').trim().notEmpty().withMessage('Member name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
];

const enquiryValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

const trialBookingValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('preferredDate')
    .isISO8601()
    .withMessage('Valid date is required'),
  body('preferredTime').trim().notEmpty().withMessage('Time is required'),
];

const gymInfoValidation = [
  body('gymName').trim().notEmpty().withMessage('Gym name is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('email').isEmail().withMessage('Valid email is required'),
];

const mongoIdParam = [
  param('id').isMongoId().withMessage('Invalid ID format'),
];

const handleValidationErrors = (req, res, next) => {
  const { validationResult } = require('express-validator');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors
        .array()
        .map((e) => e.msg)
        .join('. '),
    });
  }
  next();
};

module.exports = {
  loginValidation,
  trainerValidation,
  planValidation,
  galleryValidation,
  testimonialValidation,
  transformationValidation,
  enquiryValidation,
  trialBookingValidation,
  gymInfoValidation,
  mongoIdParam,
  handleValidationErrors,
};
