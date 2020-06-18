const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect('/users/login');
  }
  const token = req.cookies.token;
  try {
    const data = jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findOne({
      _id: data._id,
      'tokens.token': token
    });
    if (!user) {
      console.log('run error');
      throw new Error()
    };
    res.locals.user = {
      _id: user._id,
      name: user.name,
      birthday: user.birthday,
      sex: user.sex,
      province: user.province,
      district: user.district,
      school: user.school,
      nameSchool: user.nameSchool,
      grade: user.grade,
      classRoom: user.classRoom,
      email: user.email
    };
    next();
  } catch (error) {
    res.render('403.pug', { title: 'Forbidden' })
  }
};

module.exports = auth;