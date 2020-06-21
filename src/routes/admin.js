const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.route('/')
  .get(adminController.templateDashboard);

router.route('/xep-hang')
  .get(adminController.templateXepHang)

router.route('/thoi-gian-thi')
  .get(adminController.getThoiGianThi)
  .post(adminController.setThoiGianThi)

router.route('/update-thoi-gian-thi/:id')
  .post(adminController.updateThoiGianThi)

module.exports = router;