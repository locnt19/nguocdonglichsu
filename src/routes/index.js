const router = require('express').Router();
const userRoutes = require('./user');
const questionRoutes = require('./question');
const adminRoutes = require('./admin');

router.get('/', (req, res) => {
  res.render('index.pug')
});

router.get('/ready', (req, res) => {
  res.render('ready.pug')
});

router.get('/section-1', (req, res) => {
  res.render('section-1.pug')
});


router.get('/test', (req, res) => {
  req.flash('success', 'You are successfully using req-flash');
  req.flash('error', 'No errors, you\'re doing fine');
  res.redirect('/hi');
})

router.get('/hi', (req, res) => {
  res.send(req.flash());
})

router.use('/admin', adminRoutes);

router.use('/questions', questionRoutes);

router.use('/users', userRoutes);

module.exports = router;