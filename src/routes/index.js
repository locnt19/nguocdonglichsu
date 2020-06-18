const router = require('express').Router();
const auth = require('../middleware/auth');
const userRoutes = require('./user');
const questionRoutes = require('./question');
const adminRoutes = require('./admin');

router.get('/', auth, (req, res) => {
  res.render('index.pug', { title: 'Trang chủ' })
});

router.get('/ready', auth, (req, res) => {
  res.render('ready.pug', { title: 'Chuẩn bị' })
});

router.get('/section-1', auth, (req, res) => {
  res.render('section-1.pug', { title: 'Phần 1: Ngược dòng thời gian' })
});

router.use('/admin', auth, adminRoutes);

router.use('/questions', auth, questionRoutes);

router.use('/users', userRoutes);

module.exports = router;