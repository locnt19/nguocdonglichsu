const ThoiGianThi = require('../models/ThoiGianThi')
const DeThi = require('../models/DeThi')
const BaiThi = require('../models/BaiThi')
const { find } = require('../models/ThoiGianThi')

exports.templateReady = async (req, res) => {
  res.render('ready.pug', { title: 'Are you ready?' })
}

exports.templateComingSoon = async (req, res) => {
  const data = await ThoiGianThi.findOne({ name: 'Đợt 2' })
  res.render('coming-soon.pug', { title: 'Coming soon...', time: data })
}

exports.templateSection1 = async (req, res) => {
  const data = await DeThi.findOne({ code: 'P01' })
  res.render('section-1.pug', { title: 'Phần 1: Ngược dòng lịch sử', exams: data })
}

exports.templateSummary = async (req, res) => {
  res.render('summary.pug', { title: 'Kết quả thi' })
}

exports.nopBaiThi = async (req, res) => {
  try {
    // console.log('req.body', req.body)
    const baiThi = new BaiThi(req.body)
    // console.log('baiThi')
    // console.log(baiThi)
    await baiThi.save()
    // console.log('ok')
    const deThi = await DeThi.findOne({ code: req.body.exam })
    // console.log('deThi')
    // console.log(deThi)
    const questions = deThi.questions // array objects
    const userAnswers = baiThi.answers
    console.log(userAnswers)
    let dapAn = []
    let userTraLoi = []
    for (const iterator of questions) {
      dapAn.push({code: iterator.code, answer: iterator.true})
    }
    for (const iterator of userAnswers) {
      if(iterator.answer !== null){
        userTraLoi.push({code: iterator.code, answer: iterator.answer})
      }
    }
    console.log('dapAn')
    console.log(dapAn)
    console.log('userTraLoi')
    console.log(userTraLoi)
    res.render('summary.pug', { title: 'Đã chấm điểm' })
  } catch (error) {
    console.log(error)
    res.render('summary.pug', { title: 'Lỗi' })
  }
}