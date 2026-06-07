const Testimonial = require('../models/Testimonial');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const fs = require('fs');
const path = require('path');

const getTestimonials = catchAsync(async (req, res) => {
  const testimonials = await Testimonial.find().sort('-createdAt');
  res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
});

const createTestimonial = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.memberImage = `/uploads/${req.file.filename}`;
  if (data.rating) data.rating = Number(data.rating);
  const testimonial = await Testimonial.create(data);
  res.status(201).json({ success: true, data: testimonial });
});

const updateTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) return next(new AppError('Testimonial not found', 404));

  const data = { ...req.body };
  if (req.file) {
    if (testimonial.memberImage) {
      const oldPath = path.join(__dirname, '..', testimonial.memberImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    data.memberImage = `/uploads/${req.file.filename}`;
  }
  if (data.rating) data.rating = Number(data.rating);

  const updated = await Testimonial.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updated });
});

const deleteTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) return next(new AppError('Testimonial not found', 404));

  if (testimonial.memberImage) {
    const filePath = path.join(__dirname, '..', testimonial.memberImage);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  await testimonial.deleteOne();
  res.status(200).json({ success: true, message: 'Testimonial deleted' });
});

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
