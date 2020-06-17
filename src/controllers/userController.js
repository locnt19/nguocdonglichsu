const User = require('../models/User');

exports.templateLogin = (req, res) => {
  res.render('login.pug');
}

exports.templateRegister = (req, res) => {
  res.render('register.pug');
}

exports.getAllUsers = (req, res) => {
  User.find({})
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error))
};

exports.getUser = (req, res) => {
  res.send(req.user);
};

exports.create = async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(user);
    await user.save();
    const token = await user.generateToken();
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      res.status(401).send({
        error: 'Login failed! Check authentication credentials'
      })
    }
    const token = await user.generateToken();
    res.cookie('token', token, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      httpOnly: true
    });
    res.status(200).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  };
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(t => {
      return t.token !== req.token
    })
    await req.user.save();
    res.clearCookie('token');
    res.send();
  } catch (error) {
    res.status(500).send(error)
  }
};

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
};