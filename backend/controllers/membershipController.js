const MembershipPlan = require('../models/MembershipPlan');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const getPlans = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.active !== undefined) filter.active = req.query.active === 'true';
  const plans = await MembershipPlan.find(filter).sort('price');
  res.status(200).json({ success: true, count: plans.length, data: plans });
});

const createPlan = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (data.price) data.price = Number(data.price);
  if (data.features && typeof data.features === 'string') {
    data.features = data.features.split('\n').map((f) => f.trim()).filter(Boolean);
  }
  const plan = await MembershipPlan.create(data);
  res.status(201).json({ success: true, data: plan });
});

const updatePlan = catchAsync(async (req, res, next) => {
  const data = { ...req.body };
  if (data.price) data.price = Number(data.price);
  if (data.features && typeof data.features === 'string') {
    data.features = data.features.split('\n').map((f) => f.trim()).filter(Boolean);
  }
  const plan = await MembershipPlan.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  if (!plan) return next(new AppError('Plan not found', 404));
  res.status(200).json({ success: true, data: plan });
});

const deletePlan = catchAsync(async (req, res, next) => {
  const plan = await MembershipPlan.findByIdAndDelete(req.params.id);
  if (!plan) return next(new AppError('Plan not found', 404));
  res.status(200).json({ success: true, message: 'Plan deleted' });
});

module.exports = { getPlans, createPlan, updatePlan, deletePlan };
