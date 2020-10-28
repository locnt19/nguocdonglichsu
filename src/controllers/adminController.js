const ThoiGianThi = require('../models/ThoiGianThi');
const QuanTri = require('../models/QuanTri');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const TuanHienTai = require('../models/TuanHienTai');
const User = require('../models/User');
const BaiThi = require('../models/BaiThi');

exports.templateDashboard = (req, res) => {
  res.render('admin/dashboard.pug', { title: 'Dashboard' });
};

exports.templateXepHang = async (req, res) => {
  const listBaiThi = await BaiThi.find({ bestest: true, scope: { $gt: 0 } });
  // const listUser = await User.find({ "lanThi.luotThi": { $lt: 2 } }); // https://stackjava.com/mongodb/truy-van-du-lieu-document-find-select-where-trong-mongodb.html
  const listUser = await User.find({ 'lanThi.luotThi': { $lt: 2 } });
  let newArr = [];
  for (const iUser of listUser) {
    const temp = {
      _id: iUser._id,
      name: iUser.name,
      nameSchool: iUser.nameSchool,
      classRoom: iUser.classRoom,
      birthday: iUser.birthday,
      email: iUser.email,
      summaryScore: 0,
      summaryTime: 0,
    };
    for (const iBaiThi of listBaiThi) {
      if (iUser._id.toString() === iBaiThi.user) {
        temp.summaryScore += iBaiThi.scope;
        temp.summaryTime += iBaiThi.time;
      }
    }
    newArr.push(temp);
  }
  res.render('admin/xep-hang.pug', {
    title: 'Xếp hạng',
    listUser: newArr,
  });
};

exports.templateLogin = (req, res) => {
  res.render('admin/login.pug', { title: 'Quản trị | Login' });
};

exports.templateQuanTri = async (req, res) => {
  try {
    const danhSachQuanTri = await QuanTri.find({});
    res.render('admin/quan-tri.pug', {
      title: 'Quản trị',
      danhSachQuanTri: danhSachQuanTri,
    });
  } catch (error) {
    console.log(error);
    req.flash('message', error);
    res.render('admin/quan-tri.pug', { title: 'Quản trị' });
  }
};

exports.getThoiGianThi = async (req, res) => {
  try {
    const tuanHienTai = await TuanHienTai.find({});
    const thoiGianThi = await ThoiGianThi.find({});
    res.render('admin/thoi-gian-thi.pug', {
      title: 'Thời gian thi',
      ThoiGianThi: thoiGianThi,
      tuanHienTai: tuanHienTai,
    });
  } catch {
    res.render('admin/thoi-gian-thi.pug', {
      title: 'Thời gian thi',
    });
    req.flash('message', error);
  }
};

exports.setThoiGianThi = async (req, res) => {
  try {
    const thoiGianThiMoi = new ThoiGianThi(req.body);
    await thoiGianThiMoi.save();
    req.flash('message', 'Tạo thành công');
    res.redirect('/admin/thoi-gian-thi');
  } catch (error) {
    console.log(error);
    req.flash('message', error);
    res.render('admin/thoi-gian-thi.pug', {
      message: req.flash(),
    });
  }
};

exports.updateThoiGianThi = async (req, res) => {
  try {
    await ThoiGianThi.findOneAndUpdate({ name: req.body.name }, req.body);
    req.flash('message', 'Cập nhật thành công');
    res.redirect('/admin/thoi-gian-thi');
  } catch (error) {
    console.log(error);
    req.flash('message', error);
    res.render('admin/thoi-gian-thi.pug', {
      message: req.flash(),
    });
  }
};

exports.createQuanTri = async (req, res) => {
  try {
    const quanTri = new QuanTri(req.body);
    const quanTriExists = await QuanTri.findOne({
      username: req.body.username,
    });
    if (quanTriExists) throw new Error('Username đã tồn tại.');
    await quanTri.save();
    console.log('ok');
    req.flash('message', 'Tạo thành công');
    res.redirect('/admin/quan-tri');
  } catch (error) {
    console.log(error);
    req.flash('message', error);
    res.render('admin/quan-tri.pug', {
      message: req.flash(),
      values: req.body,
    });
  }
};
exports.loginQuanTri = async (req, res) => {
  try {
    const { username, password } = req.body;
    const quanTri = await QuanTri.findByCredentials(username, password);
    const token = await quanTri.generateToken();
    res.cookie('isAdmin', token, {
      httpOnly: true,
    });
    req.flash('message', `Welcome back, ${quanTri.name}!`);
    res.redirect('/admin');
  } catch (error) {
    req.flash('message', error);
    res.render('admin/login.pug', { message: req.flash() });
  }
};

exports.logoutQuanTri = async (req, res) => {
  try {
    const token = req.cookies.isAdmin;
    const data = jwt.verify(token, process.env.SECRETKEY);
    const quanTriVien = await QuanTri.findOne({
      _id: data._id,
      'tokens.token': token,
    });
    quanTriVien.tokens = quanTriVien.tokens.filter(t => {
      return t.token !== token;
    });
    await quanTriVien.save();
    res.clearCookie('isAdmin');
    res.redirect('/admin/login');
  } catch (error) {
    console.log(error);
    res.render('500.pug', { title: 'Logout Error' });
  }
};

exports.createTuanHienTai = async (req, res) => {
  try {
    const tuanHienTai = new TuanHienTai(req.body);
    await tuanHienTai.save();
    req.flash('message', 'Tạo Tuần hiện tại thành công');
    res.redirect('/admin/thoi-gian-thi');
  } catch (error) {
    console.log(error);
    req.flash('message', error);
    res.render('admin/thoi-gian-thi.pug', {
      message: req.flash(),
    });
  }
};
exports.updateTuanHienTai = async (req, res) => {
  try {
    await ThoiGianThi.findOneAndUpdate({ _id: req.body._id }, req.body);
    req.flash('message', 'Update Tuần hiện tại thành công');
    res.redirect('/admin/thoi-gian-thi');
  } catch (error) {
    console.log(error);
    req.flash('message', error);
    res.render('admin/thoi-gian-thi.pug', {
      message: req.flash(),
    });
  }
};

exports.templateUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('admin/users.pug', { title: 'Thí sinh', usersList: users });
  } catch (error) {
    req.flash('message', error);
    res.redirect('/admin');
  }
};

exports.templateBaiThi = async (req, res) => {
  try {
    const listBaiThi = await BaiThi.find();
    const listUser = await User.find({ 'lanThi.luotThi': { $lt: 2 } });
    let newArr = [];
    for (const iUser of listUser) {
      for (const iBaiThi of listBaiThi) {
        if (iUser._id.toString() === iBaiThi.user) {
          iBaiThi.name = iUser.name;
          iBaiThi.nameSchool = iUser.nameSchool;
          iBaiThi.classRoom = iUser.classRoom;
          iBaiThi.birthday = iUser.birthday;
          iBaiThi.email = iUser.email;
          newArr.push(iBaiThi);
        }
      }
    }
    // console.log(newArr);
    res.render('admin/bai-thi.pug', { title: 'Bài thi', listBaiThi: newArr });
  } catch (error) {
    console.log(error);
    req.flash('message', error);
    res.redirect('/admin');
  }
};

exports.templateXepHangDonVi = async (req, res) => {
  res.render('404.pug', { title: 'Xếp hạng theo đơn vị' });
};
