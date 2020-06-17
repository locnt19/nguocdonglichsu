const router = require('express').Router();
const auth = require('../middleware/auth');
const userRoutes = require('./user');
const questionRoutes = require('./question');
const adminRoutes = require('./admin');

router.get('/', auth, (req, res) => {
  res.render('index.pug')
});

router.get('/ready', auth, (req, res) => {
  res.render('ready.pug')
});

router.get('/section-1', auth, (req, res) => {
  res.render('section-1.pug')
});

router.use('/admin', auth, adminRoutes);

router.use('/questions', auth, questionRoutes);

router.use('/users', userRoutes);

module.exports = router;