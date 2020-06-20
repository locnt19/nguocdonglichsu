const mongoose = require('mongoose');

const thoiGianThiSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now(),
    required: true
  },
  finishDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  finishTime: {
    type: Date,
    default: Date.now(),
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ThoiGianThi', thoiGianThiSchema);