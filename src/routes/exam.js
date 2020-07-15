const router = require('express').Router()
const examController = require('../controllers/examController')
const checkTime = require('../middleware/checkTime')

router.route('/')
  .get(checkTime, examController.templateReady)

router.route('/ready-2')
  .get(checkTime, examController.templateReady2)

router.route('/ready-3')
  .get(checkTime, examController.templateReady3)


router.route('/coming-soon')
  .get(examController.templateComingSoon)


router.route('/section-1')
  .get(checkTime, examController.templateSection1)
// .post(checkTime, examController.nopBaiThi)

router.route('/section-2')
  .get(checkTime, examController.templateSection2)
// .post(checkTime, examController.nopBaiThi)

router.route('/section-3')
  .get(checkTime, examController.templateSection3)
// .post(checkTime, examController.nopBaiThi)

router.route('/section-4')
  .get(checkTime, examController.templateSection4)
// .post(checkTime, examController.nopBaiThi)

router.route('/summary')
  .get(checkTime, examController.templateSummary)
// .post(checkTime, examController.nopBaiThi)

router.route('/het-luot')
  .get((req, res) => {
    res.render('het-luot.pug', { title: 'Hết lượt thi' })
  })

module.exports = router