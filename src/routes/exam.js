const router = require('express').Router();
const examController = require('../controllers/examController');
const checkTime = require('../middleware/checkTime');

router.route('/')
  .get(checkTime, examController.templateReady);


router.route('/coming-soon')
  .get(examController.templateComingSoon);


router.route('/section-1')
  .get(checkTime, examController.templateSection1);

module.exports = router;