const ThoiGianThi = require('../models/ThoiGianThi')
const DeThi = require('../models/DeThi')
const BaiThi = require('../models/BaiThi')

exports.templateReady = async (req, res) => {
  res.render('ready.pug', { title: 'Are you ready?' })
}

exports.templateComingSoon = async (req, res) => {
  const data = await ThoiGianThi.findOne({ name: 'Đợt 2' })
  res.render('coming-soon.pug', { title: 'Coming soon...', time: data })
}

exports.templateSection1 = async (req, res) => {
  const data = await DeThi.findOne({ name: 'Phần 1' })
  res.render('section-1.pug', { title: 'Phần 1: Ngược dòng lịch sử', exams: data })
}

exports.templateSummary = async (req, res) => {
  const data = await DeThi.findOne({ name: 'Phần 1' })
  console.log(data)
  res.render('summary.pug', { title: 'Kết quả thi Phần 1', exams: data })
}

exports.nopBaiThi = async (req, res) => {
  console.log(req.body)
  res.render('summary.pug', { title: 'Kết quả thi Phần 1', exams: data })
}