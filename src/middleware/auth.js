const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization.replace('Bearer ', '');
    const data = jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findOne({
      _id: data._id,
      'tokens.token': token
    });
    if (!user) throw new Error();
    // req.user = {
    //   _id: user._id,
    //   name: user.name,
    //   role: user.role
    // };
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({
      error: 'Not authorized to access this resource.'
    })
  }
};

module.exports = auth;