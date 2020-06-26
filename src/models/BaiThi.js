const mongoose = require('mongoose');

const baiThiSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  exam: { type: String },
  time: { type: Number, default: 0 },
  scope: { type: Number, default: 0 },
  answers: [{
    code: { type: String, default: null },
    answer: { type: String, default: null },
    isTrue: {type: Boolean, default: false }
  }]
}, { timestamps: true });

module.exports = mongoose.model('BaiThi', baiThiSchema, 'BaiThi');