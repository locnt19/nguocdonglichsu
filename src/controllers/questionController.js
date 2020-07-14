const DeThi = require('../models/DeThi');


//#region Phần 1
exports.templateSection1 = (req, res) => {
  res.render('admin/section-1.pug')
}

exports.templateSection1Create = (req, res) => {
  res.render('admin/section-1-create.pug')
}

exports.createSection1 = async (req, res) => {
  try {
    const deThiDaTonTai = await DeThi.findOne({ code: req.body.code })
    // lưu nếu chưa tồn tại section-1
    if (deThiDaTonTai === null) {
      const deThiMoi = new DeThi(req.body)
      await deThiMoi.save()
      req.flash('message', 'Tạo thành công 1')
      res.render('admin/section-1-create.pug')
    }
    // nếu tồn tại section-1 thì bổ sung câu hỏi
    const cauHoiMoi = new DeThi({ questions: req.body.questions })
    // const hj = await DeThi.findOne({ code: req.body.code })
    console.log('cauHoiMoi')
    console.log(cauHoiMoi)
    const hj = await DeThi.findOneAndUpdate({ code: req.body.code }, cauHoiMoi.questions, { new: true })
    console.log('hj');
    console.log(hj);
    
    // console.log(req.body.questions)
    // thông báo tạo thành công
    // req.flash('message', 'Tạo thành công 2')
    res.render('admin/section-1-create.pug')
  } catch (error) {
    req.flash('message', error)
    res.render('admin/section-1-create.pug')
  }
}

//#endregion