const Trainer = require('../models/Trainer');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const fs = require('fs');
const path = require('path');

const getTrainers = catchAsync(async (req, res) => {
  const trainers = await Trainer.find().sort('-createdAt');
  res.status(200).json({ success: true, count: trainers.length, data: trainers });
});

const getTrainer = catchAsync(async (req, res, next) => {
  const trainer = await Trainer.findById(req.params.id);
  if (!trainer) return next(new AppError('Trainer not found', 404));
  res.status(200).json({ success: true, data: trainer });
});

const createTrainer = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;

  if (data.specialization && typeof data.specialization === 'string') {
    data.specialization = data.specialization.split(',').map((s) => s.trim());
  }
  if (data.socialLinks && typeof data.socialLinks === 'string') {
    data.socialLinks = JSON.parse(data.socialLinks);
  }
  if (data.experience) data.experience = Number(data.experience);

  const trainer = await Trainer.create(data);
  res.status(201).json({ success: true, data: trainer });
});

const updateTrainer = catchAsync(async (req, res, next) => {
  const trainer = await Trainer.findById(req.params.id);
  if (!trainer) return next(new AppError('Trainer not found', 404));

  const data = { ...req.body };
  if (req.file) {
    if (trainer.image) {
      const oldPath = path.join(__dirname, '..', trainer.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    data.image = `/uploads/${req.file.filename}`;
  }
  if (data.specialization && typeof data.specialization === 'string') {
    data.specialization = data.specialization.split(',').map((s) => s.trim());
  }
  if (data.socialLinks && typeof data.socialLinks === 'string') {
    data.socialLinks = JSON.parse(data.socialLinks);
  }
  if (data.experience) data.experience = Number(data.experience);

  const updated = await Trainer.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updated });
});

const deleteTrainer = catchAsync(async (req, res, next) => {
  const trainer = await Trainer.findById(req.params.id);
  if (!trainer) return next(new AppError('Trainer not found', 404));

  if (trainer.image) {
    const filePath = path.join(__dirname, '..', trainer.image);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  await trainer.deleteOne();
  res.status(200).json({ success: true, message: 'Trainer deleted' });
});

module.exports = {
  getTrainers,
  getTrainer,
  createTrainer,
  updateTrainer,
  deleteTrainer,
};
