const TransformationStory = require('../models/TransformationStory');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const fs = require('fs');
const path = require('path');

const getTransformations = catchAsync(async (req, res) => {
  const stories = await TransformationStory.find().sort('-createdAt');
  res.status(200).json({ success: true, count: stories.length, data: stories });
});

const createTransformation = catchAsync(async (req, res, next) => {
  if (!req.files || !req.files.beforeImage || !req.files.afterImage) {
    return next(new AppError('Both before and after images are required', 400));
  }

  const data = {
    memberName: req.body.memberName,
    description: req.body.description,
    duration: req.body.duration || '',
    beforeImage: `/uploads/${req.files.beforeImage[0].filename}`,
    afterImage: `/uploads/${req.files.afterImage[0].filename}`,
  };

  const story = await TransformationStory.create(data);
  res.status(201).json({ success: true, data: story });
});

const updateTransformation = catchAsync(async (req, res, next) => {
  const story = await TransformationStory.findById(req.params.id);
  if (!story) return next(new AppError('Transformation story not found', 404));

  const data = { ...req.body };

  if (req.files) {
    if (req.files.beforeImage) {
      if (story.beforeImage) {
        const p = path.join(__dirname, '..', story.beforeImage);
        if (fs.existsSync(p)) fs.unlinkSync(p);
      }
      data.beforeImage = `/uploads/${req.files.beforeImage[0].filename}`;
    }
    if (req.files.afterImage) {
      if (story.afterImage) {
        const p = path.join(__dirname, '..', story.afterImage);
        if (fs.existsSync(p)) fs.unlinkSync(p);
      }
      data.afterImage = `/uploads/${req.files.afterImage[0].filename}`;
    }
  }

  const updated = await TransformationStory.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true, runValidators: true }
  );
  res.status(200).json({ success: true, data: updated });
});

const deleteTransformation = catchAsync(async (req, res, next) => {
  const story = await TransformationStory.findById(req.params.id);
  if (!story) return next(new AppError('Transformation story not found', 404));

  [story.beforeImage, story.afterImage].forEach((img) => {
    if (img) {
      const p = path.join(__dirname, '..', img);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
  });

  await story.deleteOne();
  res.status(200).json({ success: true, message: 'Story deleted' });
});

module.exports = {
  getTransformations,
  createTransformation,
  updateTransformation,
  deleteTransformation,
};
