const mongoose = require('mongoose');

const transformationStorySchema = new mongoose.Schema(
  {
    memberName: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    beforeImage: {
      type: String,
      required: [true, 'Before image is required'],
    },
    afterImage: {
      type: String,
      required: [true, 'After image is required'],
    },
    description: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  'TransformationStory',
  transformationStorySchema
);
