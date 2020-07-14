const mongoose = require('mongoose');

const deThiSchema = mongoose.Schema({
  name: { type: String },
  code: { type: String, unique: true },
  location: {
    type: Object()
  },
  questions: [{
    code: { type: String },
    question: { type: String },
    a: { type: String },
    b: { type: String },
    c: { type: String },
    d: { type: String },
    true: { type: String },
  }],
}, { timestamps: true });

module.exports = mongoose.model('DeThi', deThiSchema, 'DeThi');