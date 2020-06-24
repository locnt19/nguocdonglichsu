const mongoose = require('mongoose');

const deThiSchema = mongoose.Schema({
  name: {
    type: String
  },
  questions: [{
    stt: {
      type: String
    },
    question: {
      type: String
    },
    a: {
      type: String
    },
    b: {
      type: String
    },
    c: {
      type: String
    },
    d: {
      type: String
    },
    true: {
      type: Number
    },
  }
  ],
}, { timestamps: true });

module.exports = mongoose.model('DeThi', deThiSchema, 'DeThi');