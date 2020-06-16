const router = require('express').Router();
const questionController = require('../controllers/questionController');
const auth = require('../middleware/auth');

router.route('/create')
  .get(questionController.templateCreate);

router.route('/question-1')
  .get(questionController.templateQuestion1);

module.exports = router;