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
  const data = await DeThi.findOne({ code: 'P01' })
  res.render('section-1.pug', { title: 'Phần 1: Ngược dòng lịch sử', exams: data })
}

exports.templateSummary = async (req, res) => {
  res.render('summary.pug', { title: 'Kết quả thi' })
}

exports.nopBaiThi = async (req, res) => {
  try {
    const baiThi = new BaiThi(req.body)
    const deThi = await DeThi.findOne({ code: req.body.exam })
    const questions = deThi.questions // array objects
    const userAnswers = baiThi.answers
    const questionsFilltered = []
    const anwsersFiltered = []
    for (const i of questions) {
      questionsFilltered.push({ code: i.code, answer: i.true })
    }
    for (const i of userAnswers) {
      if (i.answer !== null) {
        anwsersFiltered.push({ code: i.code, answer: i.answer })
      }
    }
    const result = compareArray(anwsersFiltered, questionsFilltered)
    baiThi.scope = result.length * 20
    baiThi.answersTrue = result
    await baiThi.save()
    res.render('summary.pug', { title: 'Đã chấm điểm', examName: deThi.name, time: baiThi.time, scope: baiThi.scope })
  } catch (error) {
    console.log(error)
    res.render('summary.pug', { title: 'Lỗi' })
  }
}


function compareArray(array1, array2) {
  let result = []
  array1.forEach(e1 => array2.forEach(e2 => {
    if (e1.code === e2.code) {
      if (e1.answer === e2.answer) {
        result.push(e1)
      }
    }
  }))
  return result
}