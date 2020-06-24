const router = require('express').Router();
const auth = require('../middleware/auth');
const userRoutes = require('./user');
const questionRoutes = require('./question');
const adminRoutes = require('./admin');
const examRoutes = require('./exam');

router.get('/', auth, (req, res) => {
  res.render('index.pug', { title: 'Trang chủ' })
});

router.use('/admin', auth, adminRoutes);

router.use('/questions', auth, questionRoutes);

router.use('/users', userRoutes);

router.use('/exams', auth, examRoutes);

router.post('/api/test', (req, res) => {
  console.log(JSON.stringify(req.body))
  res.json(req.body)
});

module.exports = router;