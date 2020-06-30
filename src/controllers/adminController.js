const ThoiGianThi = require('../models/ThoiGianThi')
const QuanTri = require('../models/QuanTri')
const jwt = require('jsonwebtoken')



exports.templateDashboard = (req, res) => {
  res.render('admin/dashboard.pug')
}

exports.templateXepHang = (req, res) => {
  res.render('admin/xep-hang.pug', { title: 'Xếp hạng' })
}

exports.templateLogin = (req, res) => {
  res.render('admin/login.pug', { title: 'Quản trị đăng nhập' })
}

exports.templateQuanTri = async (req, res) => {
  try {
    const danhSachQuanTri = await QuanTri.find({})
    res.render('admin/quan-tri.pug', { title: 'Quản trị', danhSachQuanTri: danhSachQuanTri })
  } catch (error) {
    console.log(error)
    req.flash('message', error)
    res.render('admin/quan-tri.pug', { title: 'Quản trị' })
  }
}

exports.getThoiGianThi = (req, res) => {
  ThoiGianThi.find({})
    .then(t => {
      res.render('admin/thoi-gian-thi.pug', {
        title: 'Thời gian thi',
        ThoiGianThi: t,
      })
    })
    .catch(error => {
      console.log(error)
      req.flash('message', error)
    })
}

exports.setThoiGianThi = async (req, res) => {
  try {
    const thoiGianThiMoi = new ThoiGianThi(req.body)
    await thoiGianThiMoi.save()
    req.flash('message', 'Tạo thành công')
    res.redirect('/admin/thoi-gian-thi')
  } catch (error) {
    console.log(error)
    req.flash('message', error)
    res.render('admin/thoi-gian-thi.pug', {
      message: req.flash()
    })
  }
}

exports.updateThoiGianThi = async (req, res) => {
  try {
    await ThoiGianThi.findOneAndUpdate({ name: req.body.name }, req.body)
    req.flash('message', 'Cập nhật thành công')
    res.redirect('/admin/thoi-gian-thi')
  } catch (error) {
    console.log(error)
    req.flash('message', error)
    res.render('admin/thoi-gian-thi.pug', {
      message: req.flash()
    })
  }
}

exports.createQuanTri = async (req, res) => {
  try {
    const quanTri = new QuanTri(req.body)
    const quanTriExists = await QuanTri.findOne({ username: req.body.username })
    if (quanTriExists) throw new Error('Username đã tồn tại.')
    await quanTri.save()
    console.log('ok')
    req.flash('message', 'Tạo thành công')
    res.redirect('/admin/quan-tri')
  } catch (error) {
    console.log(error)
    req.flash('message', error)
    res.render('admin/quan-tri.pug', {
      message: req.flash(),
      values: req.body
    })
  }
}
exports.loginQuanTri = async (req, res) => {
  try {
    const { username, password } = req.body
    const quanTri = await QuanTri.findByCredentials(username, password)
    const token = await quanTri.generateToken()
    res.cookie('isAdmin', token, {
      httpOnly: true
    })
    req.flash('message', `Chào mừng ${quanTri.name} đã trở lại!`)
    res.redirect('/admin')
  } catch (error) {
    req.flash('message', error)
    res.render('admin/login.pug', { message: req.flash() })
  }
}

exports.logoutQuanTri = async (req, res) => {
  try {
    const token = req.cookies.isAdmin;
    const data = jwt.verify(token, process.env.SECRETKEY);
    const quanTriVien = await QuanTri.findOne({
      _id: data._id,
      'tokens.token': token
    });
    quanTriVien.tokens = quanTriVien.tokens.filter(t => {
      return t.token !== token
    })
    await quanTriVien.save();
    res.clearCookie('isAdmin');
    res.redirect('/admin/login');
  } catch (error) {
    console.log(error)
    res.render('500.pug', { title: 'Logout Error' })
  }
};