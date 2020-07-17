const ThoiGianThi = require('../models/ThoiGianThi')
const DeThi = require('../models/DeThi')
const BaiThi = require('../models/BaiThi')
const User = require('../models/User')

exports.templateReady = async (req, res) => {
  res.render('ready.pug', { title: 'Phần 1: Ngược dòng thời gian' })
}

exports.templateReady2 = async (req, res) => {
  res.render('ready-2.pug', { title: 'Phần 2: Giải mã lịch sử' })
}

exports.templateReady3 = async (req, res) => {
  res.render('ready-3.pug', { title: 'Phần 3: Khám phá' })
}

exports.templateReady4 = async (req, res) => {
  res.render('ready-4.pug', { title: 'Phần 4: Kết nối' })
}

exports.templateComingSoon = async (req, res) => {
  const data = await ThoiGianThi.findOne({ name: 'Đợt 1' })
  res.render('coming-soon.pug', { title: 'Coming soon...', time: data })
}

exports.templateSection1 = async (req, res) => {
  const data = await DeThi.findOne({ code: 'P01' })
  res.render('section-1.pug', { title: 'Phần 1: Ngược dòng lịch sử', exams: data })
}

exports.templateSection2 = async (req, res) => {
  const data = await DeThi.findOne({ code: 'P02' })
  res.render('section-2.pug', { title: 'Phần 2: Giải mã lịch sử', exams: data })
}

exports.templateSection3 = async (req, res) => {
  const data = await DeThi.findOne({ code: 'P03' })
  const datdo = { name: 'Đất Đỏ', code: 'datdo' }
  const longdien = { name: 'Long Điền', code: 'longdien' }
  const baria = { name: 'Bà Rịa', code: 'baria' }
  const vungtau = { name: 'Vũng Tàu', code: 'vungtau' }
  const condao = { name: 'Côn Đảo', code: 'condao' }
  const tanthanh = { name: 'Tân Thành', code: 'tanthanh' }
  const chauduc = { name: 'Châu Đức', code: 'chauduc' }
  const xuyenmoc = { name: 'Xuyên Mộc', code: 'xuyenmoc' }

  datdo.questions = data.questions.filter(i => i.location === 'datdo')
  longdien.questions = data.questions.filter(i => i.location === 'longdien')
  baria.questions = data.questions.filter(i => i.location === 'baria')
  vungtau.questions = data.questions.filter(i => i.location === 'vungtau')
  condao.questions = data.questions.filter(i => i.location === 'condao')
  tanthanh.questions = data.questions.filter(i => i.location === 'tanthanh')
  chauduc.questions = data.questions.filter(i => i.location === 'chauduc')
  xuyenmoc.questions = data.questions.filter(i => i.location === 'xuyenmoc')


  const arrayData = [datdo, longdien, baria, vungtau, condao, tanthanh, chauduc, xuyenmoc]

  res.render('section-3.pug', {
    title: 'Phần 3: Khám phá',
    examName: data.name,
    examCode: data.code,
    arrayData: arrayData
  })
}

exports.templateSection4 = async (req, res) => {
  const data = await DeThi.findOne({ code: 'P01' })
  res.render('section-4.pug', { title: 'Phần 4: Kết nối', exams: data })
}

exports.templateSummary = async (req, res) => {
  res.render('summary.pug', { title: 'Kết quả thi' })
}

exports.truLuotThi = async (req, res, next) => {
  try {
    // trừ lượt thi
    const user = await User.findOne({ _id: res.locals.user._id })
    user.luotThiConLai -= 1
    await user.save()
    next()
  } catch (error) {
    console.log(error)
    res.render('500.pug', 'Server internal')
  }
}

exports.nopBaiThi1 = async (req, res) => {
  try {
    // trừ lượt thi
    const user = await User.findOne({ _id: req.body.user })
    const data = req.body
    console.log(data.lanThi)
    res.locals.user.luotThiConLai.section1--
    // if (user.luotThiConLai === 1) {
    //   data.lanThi = 1
    // }
    // if (user.luotThiConLai === 0) {
    //   data.lanThi = 2
    // }
    await user.save()
    // lưu bài thi
    const baiThi = new BaiThi(data)
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
    baiThi.scope = result.correct.length * 20
    baiThi.answersTrue = result.correct
    await baiThi.save()
    res.render('summary.pug', {
      title: 'Đã chấm điểm',
      examName: deThi.name,
      time: baiThi.time,
      scope: baiThi.scope,
      next: 'ready-3'
    })
  } catch (error) {
    console.log(error)
    res.render('500.pug', { title: 'Lỗi chấm điểm thi phần 1' })
  }
}

exports.nopBaiThi3 = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.user })
    const data = req.body
    console.log(data.lanThi)
    res.locals.user.luotThiConLai.section3--

    // if (user.luotThiConLai === 1) {
    //   data.lanThi = 1
    // }
    // if (user.luotThiConLai === 0) {
    //   data.lanThi = 2
    // }
    data.answers = removeNestedArray(req.body.answers)

    user.luotThiConLai--

    await user.save()

    // lưu bài thi
    const baiThi = new BaiThi(data)
    const deThi = await DeThi.findOne({ code: req.body.exam })
    const questions = deThi.questions // array objects
    const userAnswers = baiThi.answers
    const questionsFilltered = []
    for (const i of questions) {
      questionsFilltered.push({ code: i.code, answer: i.true })
    }
    const result = compareArray(userAnswers, questionsFilltered)
    var correctPoint = 0
    var wrongPoint = 0
    for (const item of result.correct) {
      if (item.star !== null) {
        correctPoint += 20
      } else {
        correctPoint += 10
      }
    }
    for (const item of result.wrong) {
      if (item.star !== null) {
        wrongPoint -= 10
      } else {
        wrongPoint -= 5
      }
    }

    baiThi.scope = correctPoint + wrongPoint
    baiThi.answersTrue = result.correct
    await baiThi.save()
    res.render('summary.pug', {
      title: 'Đã chấm điểm',
      examName: deThi.name,
      time: baiThi.time,
      scope: baiThi.scope,
      next: 'ready-4'
    })
  } catch (error) {
    console.log(error)
    res.render('500.pug', { title: 'Lỗi chấm điểm thi phần 3' })
  }
}

//#region functions
function compareArray(array1, array2) {
  let result = {
    correct: [],
    wrong: []
  }
  array1.forEach(e1 => array2.forEach(e2 => {
    if (e1.code === e2.code) {
      if (e1.answer === e2.answer) {
        result.correct.push(e1)
      } else {
        result.wrong.push(e1)
      }
    }
  }))
  return result
}

function removeNestedArray(array) {
  var merged = []

  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (item.length > 0) {
      for (const iterator of item) {
        merged.push(iterator)
      }
    }
  }
  return merged
}
//#endregion