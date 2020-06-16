const router = require('express').Router();
const userRoutes = require('./user');
const questionRoutes = require('./question');

router.get('/', (req, res) => {
  res.render('index.pug')
});

router.get('/ready', (req, res) => {
  res.render('ready.pug')
});

router.get('/section-1', (req, res) => {
  res.render('section-1.pug')
});

router.get('/admin', (req, res) => {
  res.render('admin/dashboard.pug')
});

router.use('/questions', questionRoutes);

router.use('/users', userRoutes);

module.exports = router;