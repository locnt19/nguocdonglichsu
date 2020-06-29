const mongoose = require('mongoose');

const baiThiSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  exam: { type: String },
  time: { type: Number, default: 0 },
  scope: { type: Number, default: 0 },
  answers: [{
    code: { type: String, default: null },
    answer: { type: String, default: null }
  }],
  answersTrue: [{
    code: { type: String },
    answer: { type: String }
  }
  ]
}, { timestamps: true });

module.exports = mongoose.model('BaiThi', baiThiSchema, 'BaiThi');