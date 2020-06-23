const ThoiGianThi = require('../models/ThoiGianThi');
const Exam = require('../models/Exam');

exports.templateReady = async (req, res) => {
  res.render('ready.pug', { title: 'Are you ready?' })
}

exports.templateComingSoon = async (req, res) => {
  const data = await ThoiGianThi.findOne({ name: 'Đợt 1' });
  res.render('coming-soon.pug', { title: 'Coming soon...', time: data })
}

exports.templateSection1 = async (req, res) => {
  const data = await Exam.findOne({ name: 'Phần 1' });
  res.render('section-1.pug', { title: 'Phần 1: Ngược dòng lịch sử', exams: data })
}

exports.templateSummary = async (req, res) => {
  const data = await Exam.findOne({ name: 'Phần 1' });
  res.render('summary.pug', { title: 'Kết quả thi Phần 1', exams: data })
}