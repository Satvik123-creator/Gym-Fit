const TrialBooking = require('../models/TrialBooking');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const createBooking = catchAsync(async (req, res) => {
  const booking = await TrialBooking.create(req.body);
  res.status(201).json({ success: true, data: booking });
});

const getBookings = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const bookings = await TrialBooking.find(filter).sort('-preferredDate');
  res.status(200).json({ success: true, count: bookings.length, data: bookings });
});

const updateBookingStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
    return next(new AppError('Invalid status value', 400));
  }
  const booking = await TrialBooking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );
  if (!booking) return next(new AppError('Booking not found', 404));
  res.status(200).json({ success: true, data: booking });
});

module.exports = { createBooking, getBookings, updateBookingStatus };
