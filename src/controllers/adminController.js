const ThoiGianThi = require('../models/ThoiGianThi');

exports.templateDashboard = (req, res) => {
  res.render('admin/dashboard.pug')
};

exports.templateXepHang = (req, res) => {
  res.render('admin/xep-hang.pug', { title: 'Xếp hạng' })
};

exports.getThoiGianThi = (req, res) => {
  ThoiGianThi.find({})
    .then(t => {
      // console.log(t);
      res.render('admin/thoi-gian-thi.pug', {
        title: 'Thời gian thi',
        ThoiGianThi: t,
      })
    })
    .catch(error => {
      req.flash('message', error)
    })
};

exports.setThoiGianThi = async (req, res) => {
  try {
    console.log(req.body);
    const thoiGianThiMoi = new ThoiGianThi(req.body);
    await thoiGianThiMoi.save();
    req.flash('message', 'Tạo thành công')
    res.redirect('/admin/thoi-gian-thi')
  } catch (error) {
    req.flash('message', error)
    res.render('admin/thoi-gian-thi.pug', {
      message: req.flash()
    })
  }
};

exports.updateThoiGianThi = async (req, res) => {
  try {
    await ThoiGianThi.findOneAndUpdate({ name: req.body.name }, req.body)
    req.flash('message', 'Cập nhật thành công')
    res.redirect('/admin/thoi-gian-thi')
  } catch (error) {
    req.flash('message', error)
    res.render('admin/thoi-gian-thi.pug', {
      message: req.flash()
    })
  }
};
