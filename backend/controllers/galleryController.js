const Gallery = require('../models/Gallery');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const fs = require('fs');
const path = require('path');

const getGallery = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  const images = await Gallery.find(filter).sort('-uploadDate');
  res.status(200).json({ success: true, count: images.length, data: images });
});

const createGallery = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError('Image is required', 400));
  const data = {
    title: req.body.title,
    category: req.body.category,
    imageUrl: `/uploads/${req.file.filename}`,
  };
  const gallery = await Gallery.create(data);
  res.status(201).json({ success: true, data: gallery });
});

const deleteGallery = catchAsync(async (req, res, next) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) return next(new AppError('Image not found', 404));

  if (item.imageUrl) {
    const filePath = path.join(__dirname, '..', item.imageUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  await item.deleteOne();
  res.status(200).json({ success: true, message: 'Image deleted' });
});

module.exports = { getGallery, createGallery, deleteGallery };
