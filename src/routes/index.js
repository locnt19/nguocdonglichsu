const router = require('express').Router()
const auth = require('../middleware/auth')
const userRoutes = require('./user')
const questionRoutes = require('./question')
const adminRoutes = require('./admin')
const examRoutes = require('./exam')

const indexController = require('../controllers/indexController');

router.get('/', auth.isLogged, indexController.templateTrangChu)

router.use('/admin', adminRoutes)

router.use('/questions', auth.isAdmin, questionRoutes)

router.use('/users', userRoutes)

router.use('/exams', auth.isLogged, examRoutes)

router.post('/api', (req, res) => {
  console.log(JSON.stringify(req.body))
  res.json(req.body)
})

router.get('/403', (req, res) => {
  res.render('403.pug', { title: 'Forbidden' })
})
router.get('/404', (req, res) => {
  res.render('404.pug', { title: 'Page not found' })
})
router.get('/500', (req, res) => {
  res.render('500.pug', { title: 'Internal server error' })
})

module.exports = router