const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.templateLogin = (req, res) => {
  if (req.cookies.token) {
    res.redirect('/');
  };
  res.render('login.pug', { title: 'Đăng nhập', message: req.flash() });
}

exports.templateRegister = (req, res) => {
  if (req.cookies.token) {
    res.redirect('/');
  };
  res.render('register.pug', { title: 'Đăng ký', message: req.flash() });
}

exports.getAllUsers = (req, res) => {
  User.find({})
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error))
};

exports.getUser = (req, res) => {
  res.render('me.pug', { title: 'Hồ sơ cá nhân' })
  // User.findById(req.params.id)
  //   .then(user => res.send(user))
  //   .catch(error => {
  //     res.send(error)
  //   })
};

exports.create = async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(user);
    const userExists = await User.findOne({ email: req.body.email });
    console.log(userExists);

    if (userExists) throw new Error('Email đã tồn tại.');
    await user.save();
    // const token = await user.generateToken(); // api
    // res.status(201).send({ user, token }) // api
    req.flash('message', 'Đăng ký thành công!');
    res.redirect('/users/login');
  } catch (error) {
    req.flash('message', error);
    res.render('register.pug', {
      message: req.flash(),
      values: req.body
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findByCredentials(email, password);
    if (!user) {
      // res.status(401).send({ error: 'Login failed! Check authentication credentials' }) // api
      throw new Error('Người dùng không tồn tại.')
    }
    const token = await user.generateToken();
    res.cookie('token', token, {
      // expires: new Date(Date.now() + 60 * 60 * 1000),
      httpOnly: true
    });

    // res.status(200).send({ user, token }) // api
    req.flash('message', `Chào mừng ${user.name} đã trở lại!`);
    res.redirect('/');
  } catch (error) {
    // res.status(400).send(error) // api
    req.flash('message', error);
    res.render('login.pug', {
      message: req.flash(),
      values: req.body
    });
  };
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findOne({
      _id: data._id,
      'tokens.token': token
    });
    user.tokens = user.tokens.filter(t => {
      return t.token !== token
    })
    await user.save();
    res.clearCookie('token');
    res.redirect('/users/login');
  } catch (error) {
    res.status(500).send(error)
  }
};

exports.logoutAll = async (req, res) => {
  try {
    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findOne({
      _id: data._id,
      'tokens.token': token
    });
    user.tokens.splice(0, user.tokens.length);
    await user.save();
    res.clearCookie('token');
    res.redirect('/users/login');
  } catch (error) {
    res.status(500).send(error)
  }
};