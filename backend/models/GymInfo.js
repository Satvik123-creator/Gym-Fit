const mongoose = require('mongoose');

const gymInfoSchema = new mongoose.Schema(
  {
    gymName: {
      type: String,
      required: [true, 'Gym name is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    openingHours: {
      monday: { type: String, default: '' },
      tuesday: { type: String, default: '' },
      wednesday: { type: String, default: '' },
      thursday: { type: String, default: '' },
      friday: { type: String, default: '' },
      saturday: { type: String, default: '' },
      sunday: { type: String, default: '' },
    },
    googleMapLink: {
      type: String,
      default: '',
    },
    whatsappNumber: {
      type: String,
      default: '',
    },
    heroImage: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GymInfo', gymInfoSchema);
