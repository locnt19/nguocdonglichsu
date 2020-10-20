const ThoiGianThi = require('../models/ThoiGianThi')
const moment = require('moment')
const User = require('../models/User')

exports.templateTrangChu = async (req, res) => {
  const thoiGianThi = await ThoiGianThi.findOne({ name: 'Đợt 1' })
  thoiGianThi.startDate = moment(thoiGianThi.startDate).format('DD-MM-YYYY')
  thoiGianThi.finishDate = moment(thoiGianThi.finishDate).format('DD-MM-YYYY')
  res.render('index.pug', {
    title: 'Home - STEPPING BACK IN HISTORY',
    thoiGianThi: thoiGianThi
  })
}
