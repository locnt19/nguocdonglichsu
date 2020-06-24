const mongoose = require('mongoose');

const baiThiSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId
  },
  exam: {
    type: mongoose.Types.ObjectId
  },
  time: {
    type: String
  },
  scope: {
    type: String
  },
  answers: [{
    stt: {
      type: String
    },
    answer: {
      type: String
    }
  }
  ]
}, { timestamp: true });

module.exports = mongoose.model('BaiThi', baiThiSchema, 'BaiThi');