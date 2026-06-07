const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    memberName: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    memberImage: {
      type: String,
      default: '',
    },
    review: {
      type: String,
      required: [true, 'Review is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
