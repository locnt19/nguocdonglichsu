const ThoiGianThi = require('../models/ThoiGianThi')
const moment = require('moment')

const checkTime = async (req, res, next) => {
  const time = await ThoiGianThi.findOne({ name: 'Đợt 1' })
  const formatStartTime = moment(`${time.startDate} ${time.startTime} ${time.timeZone}`, 'YYYY-MM-DD HH:mm ZZ')
  const currentTime = moment().format()
  const chenhLech = formatStartTime.diff(currentTime, 'seconds')
  if (chenhLech > 0) {
    res.redirect('/exams/coming-soon')
  }
  next()
}

module.exports = checkTime