const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
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
});

module.exports = mongoose.model('exam', examSchema);