const ThoiGianThi = require('../models/ThoiGianThi');
// const moment = require('moment');

exports.templateReady = async (req, res) => {
  res.render('ready.pug', { title: 'Are you ready?' })
}

exports.templateComingSoon = async (req, res) => {
  // try {
  //   const data = await ThoiGianThi.findOne({ name: 'Đợt 1' });
  //   const formatStartTime = moment(`${data.startDate} ${data.startTime} ${data.timeZone}`, 'YYYY-MM-DD HH:mm ZZ');
  //   const currentTime = moment().format();
  //   const chenhLech = formatStartTime.diff(currentTime, 'seconds');
  //   if (chenhLech <= 0) {
  //     res.render('ready.pug', { title: 'Are you ready?' })
  //   }
  // } catch (error) { }
  const data = await ThoiGianThi.findOne({ name: 'Đợt 1' });
  res.render('coming-soon.pug', { title: 'Coming soon...', time: data })
}

exports.templateSection1 = (req, res) => {
  res.render('section-1.pug', { title: 'Phần 1: Ngược dòng lịch sử' })
}