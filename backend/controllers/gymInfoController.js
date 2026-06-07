const GymInfo = require('../models/GymInfo');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const fs = require('fs');
const path = require('path');

const getGymInfo = catchAsync(async (req, res) => {
  let info = await GymInfo.findOne();
  if (!info) {
    info = await GymInfo.create({
      gymName: 'Your Gym Name',
      address: 'Your Gym Address',
      phone: '0000000000',
      email: 'info@gym.com',
    });
  }
  res.status(200).json({ success: true, data: info });
});

const updateGymInfo = catchAsync(async (req, res, next) => {
  let info = await GymInfo.findOne();
  if (!info) return next(new AppError('Gym info not found. Create it first.', 404));

  const data = { ...req.body };

  if (req.file) {
    if (info.heroImage) {
      const oldPath = path.join(__dirname, '..', info.heroImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    data.heroImage = `/uploads/${req.file.filename}`;
  }

  if (data.openingHours && typeof data.openingHours === 'string') {
    data.openingHours = JSON.parse(data.openingHours);
  }

  const updated = await GymInfo.findByIdAndUpdate(info._id, data, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updated });
});

module.exports = { getGymInfo, updateGymInfo };
