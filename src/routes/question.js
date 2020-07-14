const router = require('express').Router()
const questionController = require('../controllers/questionController')
const auth = require('../middleware/auth')

router.route('/section-1')
  .get(questionController.templateSection1)

router.route('/section-1/create')
  .get(questionController.templateSection1Create)
  .post(questionController.createSection1)

module.exports = router