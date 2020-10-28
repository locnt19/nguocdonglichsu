const router = require('express').Router();
const auth = require('../middleware/auth');
const userRoutes = require('./user');
const questionRoutes = require('./question');
const adminRoutes = require('./admin');
const examRoutes = require('./exam');
const User = require('../models/User');
const BaiThi = require('../models/BaiThi');

const indexController = require('../controllers/indexController');

router.get('/', auth.isLogged, indexController.templateTrangChu);

router.use('/admin', adminRoutes);

router.use('/questions', auth.isAdmin, questionRoutes);

router.use('/users', userRoutes);

router.use('/exams', auth.isLogged, examRoutes);

router.post('/api', (req, res) => {
  console.log(JSON.stringify(req.body));
  res.json(req.body);
});

router.get('/super-api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.put('/super-api/users/reset-lan-thi/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      lanThi: {
        luotThi: 2,
        phan1: false,
        phan2: false,
        phan3: false,
        phan4: false,
      },
    });
    res.json({ responsiveCode: 200 });
  } catch (error) {
    res.json(error);
  }
});

router.get('/super-api/users/:id', async (req, res) => {
  const users = await User.find({ _id: req.params.id });
  res.json(users);
});

router.get('/super-api/bai-thi', async (req, res) => {
  const baiThi = await BaiThi.find({ bestest: true });
  res.json(baiThi);
});

router.get('/super-api/bai-thi/:id', async (req, res) => {
  const baiThi = await BaiThi.find({ user: req.params.id });
  res.json(baiThi);
});

router.delete('/super-api/bai-thi/:id', async (req, res) => {
  await BaiThi.findByIdAndDelete(req.params.id);
  res.json({ responsiveCode: 200 });
});

router.delete('/super-api/bai-thi/user/:user', async (req, res) => {
  await BaiThi.findOneAndDelete({ user: req.params.user });
  res.json({ responsiveCode: 200 });
});

router.get('/403', (req, res) => {
  res.render('403.pug', { title: 'Forbidden' });
});
router.get('/404', (req, res) => {
  res.render('404.pug', { title: 'Page not found' });
});
router.get('/500', (req, res) => {
  res.render('500.pug', { title: 'Internal server error' });
});

module.exports = router;
