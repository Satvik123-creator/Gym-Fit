const Enquiry = require('../models/Enquiry');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const createEnquiry = catchAsync(async (req, res) => {
  const enquiry = await Enquiry.create(req.body);
  res.status(201).json({ success: true, data: enquiry });
});

const getEnquiries = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const enquiries = await Enquiry.find(filter).sort('-createdAt');
  res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
});

const updateEnquiryStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  if (!['pending', 'contacted', 'resolved'].includes(status)) {
    return next(new AppError('Invalid status value', 400));
  }
  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );
  if (!enquiry) return next(new AppError('Enquiry not found', 404));
  res.status(200).json({ success: true, data: enquiry });
});

module.exports = { createEnquiry, getEnquiries, updateEnquiryStatus };
