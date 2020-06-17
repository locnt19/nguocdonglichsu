const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      res.redirect('/users/login');
    }
    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findOne({
      _id: data._id,
      'tokens.token': token
    });
    if (!user) throw new Error();
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
    // res.status(401).send({ error: 'Not authorized to access this resource.' }) // api
    res.render('403.pug');
  }
};

module.exports = auth;